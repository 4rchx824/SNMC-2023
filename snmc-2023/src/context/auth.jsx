import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedAuth = localStorage.getItem("auth");

        if (storedAuth) return { accessToken: storedAuth };
        else return {};
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
