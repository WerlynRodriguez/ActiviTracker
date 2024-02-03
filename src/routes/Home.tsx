import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { setStatusReq } from "../api";
import { TTimeData, type TDashboardData, IUser } from "../api/types";
import { useEffect, useRef, useState } from "react";
import LargeCount from "../components/LargeCount";
import { CheckIcon, UserIcon } from "../components/Icons";
import UserTable from "../components/UserTable";

import { addOne } from "../utils";

export function Component(){
    const navigate = useNavigate();
    const [_, setSearchParams] = useSearchParams();
    const limit = 10;
    let data = useLoaderData() as TDashboardData;

    const { greeting, me, maxTimeUser } = data;
    const username = localStorage.getItem("username") || "Usuario";

    const [time, setTime] = useState<TTimeData>(me.time);
    const [active, setActive] = useState<boolean>(me.active);
    const [totalActiveUsers, setTotalActiveUsers] = useState<number>(data.activeUsers);
    const [users] = useState<IUser[]>(data.users)

    const [loading, setLoading] = useState<boolean>(false);

    // Update the time every second (interval variable)
    let intervalRef = useRef<number | null>(null);

    /**
     * On mount effect
     */
    useEffect(() => {
        if (active) startTimer();

        return stopTimer;
    }, []);

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setTime(addOne);
        }, 1000);
    }

    const stopTimer = () => {
        if(intervalRef.current != null) clearInterval(intervalRef.current);
    }

    /**
     * Handle the toogle of the active state
     */
    const onToogle = () => {
        if (loading) return;
        setLoading(true);

        const iWasActive = active;
        
        setStatusReq()
            .then((res) => {
                const { active: newActive, time } = res.data;
                setActive(newActive);

                if (time) setTime(time);
                if (newActive) startTimer();
                else stopTimer();

                // Update the active users
                if (iWasActive && !newActive) setTotalActiveUsers((prev) => prev - 1);
                else if (!iWasActive && newActive) setTotalActiveUsers((prev) => prev + 1);

            })
            .catch((err) => {console.error(err);})
            .finally(() => setLoading(false));
    }

    const onCickTableRow = (id: string) => {
        // Get the month and year from now
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        setSearchParams({ month: month.toString(), year: year.toString()});
        navigate(`/user/${id}?month=${month}&year=${year}`);
    }

    return(
    <>
        {/* -------------- Greeting -------------- */}
        <div className="hero">
            <div className="text-center hero-content">
                <div className="max-w-md">
                    <h2 className='text-3xl' >
                        {greeting.g}
                    </h2>
                    <h1
                        onClick={() => navigate("/user")} 
                        className="mb-5 text-5xl font-bold select-none cursor-pointer"
                    >
                        {username}
                    </h1>
                </div>
            </div>
        </div>

        {/* -------------- Stats -------------- */}
        <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6 bg-base-100 p-4">
            
            <div className="stat">
                <div className="stat-figure text-primary">
                    <CheckIcon />
                </div>
                <div className="stat-title">Usuarios Activos</div>
                <div className="stat-value text-success">
                    {
                        totalActiveUsers > 0 ? totalActiveUsers : "Nadie"
                    }
                </div>
                <div className="stat-desc">De todos los usuarios existentes</div>
            </div>

            <div className={`card shadow-xl bg-base-200 border-solid border-2 ${active ? "border-success" : "border-base-200"} transition-colors duration-200`}>
                <div className="card-body">
                    <h2 className="card-title">Tiempo activo hoy</h2>
                    <LargeCount time={time} />
                    <div className="card-actions justify-end">
                        {loading && <span className="loading loading-spinner loading-xs"></span>}
                        <input 
                            type="checkbox" 
                            className="toggle toggle-success" 
                            checked={active}
                            onChange={() => onToogle()} 
                        />                                
                    </div>
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure text-primary">
                    <UserIcon />
                </div>
                <div className="stat-title">Usuario con más horas</div>
                <div className="stat-value text-yellow-600">
                    {maxTimeUser !== "" ? maxTimeUser : "Nadie"}
                </div>
                <div className="stat-desc">De estos {users.length + 1} usuarios, hoy</div>
            </div>
        </div>

        <div className="hero p-4">
            <UserTable users={users} onCickTableRow={onCickTableRow} />
        </div>
    </>
    )
}