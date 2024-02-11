import { createContext, useContext, useState } from "react";
import axios from 'axios';
const { VITE_API_URL } = import.meta.env;


const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const oldData = localStorage.getItem('data');

    const [data, setData] = useState(oldData ? JSON.parse(oldData) : null);
    const changeData = (newData) => {
        setData(newData);
        localStorage.setItem('data', JSON.stringify(newData))
    }

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUp = async (email, password) => {

        if (loading) return;

        setError(null);
        setLoading(true);

        try {
            const body = { email, password };
            const { data } = await axios.post(`${VITE_API_URL}/auth/signup`, body);
            changeData(data);
        } catch (error) {
            console.error(error);
            setError(error.response.data);
        } finally {
            setLoading(false);
        }

    }

    const logIn = async (email, password) => {

        if (loading) return;

        setError(null);
        setLoading(true);

        try {
            const body = { email, password };
            const { data } = await axios.post(`${VITE_API_URL}/auth/login`, body);
            changeData(data);
        } catch (error) {
            console.error(error);
            setError(error.response.data);
        } finally {
            setLoading(false);
        }

    }

    const logOut = () => {
        setData(null);
        localStorage.removeItem('data');
    }

    const value = {
        ...data,
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
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider.')
    }
    return context;
} 