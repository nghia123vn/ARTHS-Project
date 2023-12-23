import { createContext, useState, ReactNode } from "react";
import { typeAuth } from "@/types/typeAuth"; 
const AuthContext = createContext({});

type AuthProviderProps = {
    children: ReactNode | ReactNode[];
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const storedAuth = localStorage.getItem('auth');
    const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};
    const [auth, setAuth] = useState<typeAuth>(initialAuth);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
