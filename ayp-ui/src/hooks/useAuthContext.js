import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("Context must be in a scope of AuthContext.Provider")
    }
    return context;
}