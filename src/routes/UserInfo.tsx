import { useLoaderData, useSearchParams } from "react-router-dom";
import { TSesionDay, IUser } from "../api/types";
import { useEffect, useRef, useState } from "react";
import { getSesionsDayReq } from "../api";
import Modal from "../components/Modal";
import SesionDay from "../components/SesionDay";
import Sesion from "../components/Sesion";

export function Component() {
    const [searchParams, setSearchParams] = useSearchParams();
    let data = useLoaderData() as IUser;
    const { username, active, id } = data;

    const [SesionsDays, setSesionsDays] = useState<TSesionDay[]>([]);
    const [loading, setLoading] = useState(true);

    const dateNow = new Date();
    const [month, setMonth] = useState(searchParams.get("month")?.padStart(2, "0") || (dateNow.getMonth() + 1).toString().padStart(2, "0"));
    const [year, setYear] = useState(searchParams.get("year") || dateNow.getFullYear().toString());

    const dialogRef = useRef<HTMLDialogElement>(null);
    const [selectedSesion, setSelectedSesion] = useState<number | null>(null);

    useEffect(() => {
        getSesionsByMonth();
    }, []);

    const getSesionsByMonth = async () => {
        await getSesionsDayReq(Number(month), Number(year), id)
            .catch((err) => {console.error(err)})
            .then((res) => {
                if (!res) {
                    setSesionsDays([]);
                    return 
                }

                setSesionsDays(res.data);
            })
            .finally(() => setLoading(false));
    }

    const onSearch = () => {
        if (loading) return;
        setLoading(true);

        setSearchParams({month, year});
        getSesionsByMonth();
    }

    return (
    <>
        <div className="card shadow-lg compact grid place-items-center py-8 bg-base-300">
            <div className="avatar opacity-90">
                <div 
                    className={`mb-8 rounded-full w-32 h-32 ring ring-offset-base-100 ring-offset-2 ${active ? "ring-success" : "ring-error"}`}
                >
                    <img src="https://picsum.photos/200/300" alt="Profile Image"/>
                </div>
                <div className={`badge badge-lg absolute ${active ? "badge-success" : "badge-error"}`}></div>
            </div>

            <div className="text-center mx-auto px-8">
                <h5 className="font-bold text-2xl">
                    <span className="text-base-content opacity-70">
                        {username}
                    </span>
                </h5>
                <div className="mt-3 text-base-content text-opacity-60 font-mono">
                    📇 Puedes filtrar por fecha, las sesiones de actividad de {username} 📆
                </div>
            </div>
            <div className="join py-8">
                <input 
                    type="month"
                    value={`${year}-${month}`}
                    onChange={(e) => {
                        const [year, month] = e.target.value.split("-");
                        setMonth(month.padStart(2, "0"));
                        setYear(year);
                    }}
                    className="input input-bordered join-item"
                />
                <button 
                    className="btn join-item rounded-r-full btn-primary" 
                    onClick={onSearch}
                >
                    Buscar
                    {loading ? <span className="loading loading-spinner loading-sm"></span> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>}
                </button>
            </div>
        </div>

        {/* Grid auto columns */}
        <div className="grid grid-cols-3 gap-4 p-8">
            {loading ? <span className="loading loading-spinner loading-sm"></span> 
            :
            SesionsDays.length === 0 ? 
            <div className="card bg-base-200 shadow-xl select-none">
                <div className="card-body">
                    <h2 className="card-title">
                        No hay sesiones
                    </h2>
                    <p>
                        No se encontraron sesiones
                    </p>
                </div>
            </div>
            :
            SesionsDays.map((sesion, index) => (
                <SesionDay
                    key={sesion.id}
                    index={index}
                    {...sesion}
                    onClick={(index) => {
                        dialogRef.current?.showModal();
                        setSelectedSesion(index);
                    }}
                />
            ))}
        </div>

        <Modal title="Sesiones" ref={dialogRef}>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th></th>
                        <th>Inicio</th>
                        <th>Tiempo</th>
                        <th>Fin</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedSesion !== null && SesionsDays[selectedSesion] && 
                        SesionsDays[selectedSesion].sesions.map((sesion, index) => (
                            <Sesion key={sesion.id} index={index} {...sesion} />
                        ))
                    }
                </tbody>
            </table>
        </Modal>
    </>        
    )
}