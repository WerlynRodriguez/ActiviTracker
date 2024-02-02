import { Link } from "react-router-dom";

export default function () {
    return (
        <main>
            
            <div 
                className="hero min-h-screen" 
                style={{
                    backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/02/01/18/32/pocket-watch-2031021_1280.jpg)'
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            <strong>ActiviTracker</strong>
                        </h1>
                        <p className="mb-5">
                            Una aplicación para llevar un registro de tus cronometros diarios.
                        </p>
                        <Link to="/home">
                            <button className="btn btn-primary">Comenzar</button>
                        </Link>
                    </div>
                </div>
            </div>

            
            
            <footer className="footer items-center p-4 bg-neutral text-neutral-content">
                <aside className="items-center grid-flow-col">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd" className="fill-current">
                        <path d="M12 3.65a9 9 0 01.265 17.996L12 21.65l-.265-.004A9 9 0 0112 3.65zm1 4.7h-2v3H8v2h3v3h2v-3h3v-2h-3v-3zm-7.8-6l1.414 1.414-3.5 3.5L1.7 5.85l3.5-3.5zm13.604 0l3.5 3.5-1.414 1.414-3.5-3.5 1.414-1.414z"></path>
                    </svg>
                    <p> Made with ❤️ by Werlyn Rodriguez</p>
                </aside> 
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    <a href="https://github.com/WerlynRodriguez/" target="_blank" rel="noreferrer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 30 30"
                            className="fill-current"
                        >
                            <path d="M15 3C8.373 3 3 8.373 3 15c0 5.623 3.872 10.328 9.092 11.63a1.751 1.751 0 01-.092-.583v-2.051h-1.508c-.821 0-1.551-.353-1.905-1.009-.393-.729-.461-1.844-1.435-2.526-.289-.227-.069-.486.264-.451.615.174 1.125.596 1.605 1.222.478.627.703.769 1.596.769.433 0 1.081-.025 1.691-.121.328-.833.895-1.6 1.588-1.962-3.996-.411-5.903-2.399-5.903-5.098 0-1.162.495-2.286 1.336-3.233-.276-.94-.623-2.857.106-3.587 1.798 0 2.885 1.166 3.146 1.481A8.993 8.993 0 0115.495 9c1.036 0 2.024.174 2.922.483C18.675 9.17 19.763 8 21.565 8c.732.731.381 2.656.102 3.594.836.945 1.328 2.066 1.328 3.226 0 2.697-1.904 4.684-5.894 5.097C18.199 20.49 19 22.1 19 23.313v2.734c0 .104-.023.179-.035.268C23.641 24.676 27 20.236 27 15c0-6.627-5.373-12-12-12z"></path>
                        </svg>
                    </a>
                </nav>
            </footer>

        </main>
    )
}