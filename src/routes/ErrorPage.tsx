import { Link, useRouteError } from "react-router-dom";

export default function (){
    const error: any = useRouteError();
    console.error(error);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold"> ¡Oops! </h1>
                    <p className="py-6">
                        Un error ha ocurrido, por favor intenta más tarde.
                    </p>
                    <p className="py-6">
                        <i>{error?.statusText || error?.message}</i>
                    </p>
                    <Link to="/">
                        <button className="btn btn-primary">
                            Volver al inicio
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}