import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";

export default function (){
    const { isAuth } = useAuth();

    if (!isAuth) return <Navigate to="/login" />;

    return <Outlet />;
}