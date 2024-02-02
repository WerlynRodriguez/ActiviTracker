import { useForm } from "react-hook-form";
import { loginReq } from "../api";
import { useState } from "react";
import Alert from "../components/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

export function Component(){
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { setIsAuth } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = handleSubmit((data) => {
        if (loading) return;
        setLoading(true);
        setError("");

        loginReq(data.username, data.password)
            .then((res) => {
                const { username, id } = res.data;
                
                setIsAuth(true);
                localStorage.setItem("username", username);
                localStorage.setItem("id", id);
                
                navigate("/home");
            })
            .catch((err) => { setError(err.response.data.message || err.message) })
            .finally(() => { setLoading(false); });
    });

    return (
        <div className="hero min-h-screen bg-base-200 mx-auto">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">
                    Inicia sesión
                </h1>
                <div className="py-6">
                    <Alert text={error} type="error" show={error !== ""} />
                </div>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={onSubmit}>
                        <div className="form-control">

                            <label className="label">
                                <span className="label-text"> Nombre de usuario </span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="ej: Osiris04" 
                                className="input input-bordered" 
                                {...register("username", { required: true })} 
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"> Contraseña </span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="ej: M4st3AndKias" 
                                className="input input-bordered"
                                {...register("password", { required: true })} 
                            />

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">
                                Inicio de sesión
                                {loading ? 
                                    <span className="loading loading-spinner loading-sm"></span> 
                                : 
                                    <svg className="w-6 h-6 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                                }
                            </button>
                            <Link to="/">
                                <button className="text-center block mt-4 text-sm text-blue-500 btn btn-ghost">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
                                    Regresar
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}