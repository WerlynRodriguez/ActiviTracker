import { createContext, useContext, useEffect, useState } from "react";
import { verifyTokenReq } from "../api";

interface AuthContextProps {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

const AuthContext = createContext({} as AuthContextProps);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth cant be used outside AuthProvider');

    return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        checkAuth();
    }, []);
    
    async function checkAuth(){
        const username = localStorage.getItem('username');
        if (!username) return;
        
        await verifyTokenReq()
            .then(() => {
                setIsAuth(true);
            })
            .catch((err) => {
                setIsAuth(false);
                localStorage.removeItem('username');
                localStorage.removeItem('id');
            });
    }

    return (
        <AuthContext.Provider 
            value={{
                isAuth,
                setIsAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}