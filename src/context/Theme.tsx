import { createContext, useContext, useEffect, useState } from "react";

type TTheme = "night" | "lofi";

interface ThemeContextProps {
    theme: TTheme;
    setTheme: (theme: TTheme) => void;
}

const defaultTheme = "lofi";
const ThemeContext = createContext({} as ThemeContextProps);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme cant be used outside ThemeProvider');

    return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, _setTheme] = useState<TTheme>(localStorage.getItem("DaisyTheme") as TTheme || defaultTheme);
    document.documentElement.setAttribute("data-theme", localStorage.getItem("DaisyTheme") as TTheme || defaultTheme);

    const setTheme = (theme: TTheme) => {
        if (typeof theme !== "string") return;

        _setTheme(theme);
        localStorage.setItem("DaisyTheme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }

    return (
        <ThemeContext.Provider 
            value={{
                theme,
                setTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}