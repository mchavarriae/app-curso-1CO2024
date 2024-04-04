import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        if(errors.length > 0){
            const timer = setTimeout(()=>{
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors])

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);    
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
            setUser(null);
            setIsAuthenticated(false);
        }
    }

    const signin = async (user) =>{
        try {
            const res = await loginRequest(user);
            console.log(res);    
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
            setUser(null);
            setIsAuthenticated(false);
            console.error(error);
        }
    }

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}