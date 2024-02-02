import Navigation from "../components/Navigation";
import { BurgerBtn } from "../components/Icons";
import { Outlet } from "react-router-dom";
import { useRef } from "react";

export default function () {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" ref={inputRef} />
            <div className="drawer-content flex flex-col bg-base-100">
                {/* -------------- Navbar -------------- */}
                <div className="w-full navbar bg-base-300 shadow-lg">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <BurgerBtn />
                        </label>
                    </div> 
                    <div className="flex-1 px-2 mx-2">
                        <h2 className="text-2xl font-bold">
                            ActiviTracker
                        </h2>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            <Navigation />
                        </ul>
                    </div>
                </div>

                {/* Container of the rest of the content */}
                <div className="grid grid-cols-1 gap-6 p-4">
                    {/* -------------- Children -------------- */}
                    <Outlet />
                </div>

            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    <Navigation closeMenu={() => inputRef.current?.click()} />
                </ul>
            </div>
        </div>
    );
}