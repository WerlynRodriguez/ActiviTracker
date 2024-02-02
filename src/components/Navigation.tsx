import { Link } from "react-router-dom";
import { logoutReq } from "../api";
import { useAuth } from "../context/Auth";

interface NavigationProps {
    closeMenu?: () => void;
}

export default function (props: NavigationProps) {
    const { setIsAuth } = useAuth();
    const { closeMenu } = props;

    const close = () => closeMenu && closeMenu();

    const logout = async () => {
        await logoutReq()
            .finally(() => {
                close();
                setIsAuth(false);
                localStorage.removeItem("username");
                localStorage.removeItem("id");
            });
    }

    return (
    <>
        <li onClick={close}>
            <Link to="/home">
                Home
            </Link>
        </li>

        <li>
            <a onClick={logout}>
                Cerrar Sesión
            </a>
        </li>
    </>
    )
}