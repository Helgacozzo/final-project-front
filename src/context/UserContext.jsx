import { createContext, useContext, useState } from "react";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUp = async (email, password) => {

        if(loading) return;

        setError(null);
        setLoading(true);

        try{
            const body = {email, password};
            const { data: user } = await axios.post(`${VITE_API_URL}/signup`, body);
            setUser(user);
        }catch(error){
            console.error(error);
            setError(error.response.user);
        }finally{
            setLoading(false);
        }

    }

    const logIn = async (email, password) => {

        if(loading) return;

        setError(null);
        setLoading(true);

        try{
            const body = {email, password};
            const { data: user } = await axios.post(`${VITE_API_URL}/login`, body);
            setUser(user);
        }catch(error){
            console.error(error);
            setError(error.response.user);
        }finally{
            setLoading(false);
        }

    }

    const logOut = () => {
        setUser(null);
    }

    const value = {
        user,
        signUp,
        logIn,
        logOut,
        error,
        loading
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(context === undefined){
        throw new Error(`useUser deve essere utilizzato all'interno di un UserProvider.`)
    }
    return context;
} 