import axios from "axios"; 
import { createContext, useContext, useState } from "react";

const { VITE_API_URL } = import.meta.env;

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    // Recupera i dati utente memorizzati nella localStorage
    const oldData = localStorage.getItem('data');

    // State per i dati utente
    const [data, setData] = useState(oldData ? JSON.parse(oldData) : null);

    // Funzione per aggiornare i dati utente
    const changeData = (newData) => {
        setData(newData);
        localStorage.setItem('data', JSON.stringify(newData))
    }

    // State per gestire gli errori
    const [error, setError] = useState(null);

    // State per gestire lo stato di caricamento
    const [loading, setLoading] = useState(false);

    // Funzione per la registrazione di un nuovo utente
    const signUp = async (email, password) => {

        // Se è in corso un'altra operazione, interrompi l'esecuzione
        if (loading) return;

        setError(null); // Resetta gli errori
        setLoading(true); // Imposta lo stato di caricamento su true

        try {
            const body = { email, password }; // Crea il corpo della richiesta
            const { data } = await axios.post(`${VITE_API_URL}/auth/signup`, body); // Effettua la richiesta di registrazione
            changeData(data); // Aggiorna i dati utente con quelli ricevuti dalla risposta
        } catch (error) {
            console.error(error); // Gestisce gli errori
            setError(error.response.data); // Imposta l'errore nel caso ci sia una risposta dal server
        } finally {
            setLoading(false); // Imposta lo stato di caricamento su false alla fine dell'operazione
        }

    }

    // Funzione per l'accesso di un utente
    const logIn = async (email, password) => {

        // Se è in corso un'altra operazione, interrompi l'esecuzione
        if (loading) return;

        setError(null); // Resetta gli errori
        setLoading(true); // Imposta lo stato di caricamento su true

        try {
            const body = { email, password }; // Crea il corpo della richiesta
            const { data } = await axios.post(`${VITE_API_URL}/auth/login`, body); // Effettua la richiesta di accesso
            changeData(data); // Aggiorna i dati utente con quelli ricevuti dalla risposta
        } catch (error) {
            console.error(error); // Gestisce gli errori
            setError(error.response.data); // Imposta l'errore nel caso ci sia una risposta dal server
        } finally {
            setLoading(false); // Imposta lo stato di caricamento su false alla fine dell'operazione
        }

    }

    // Funzione per il logout di un utente
    const logOut = () => {
        setData(null); // Resetta i dati utente
        localStorage.removeItem('data'); // Rimuove i dati utente dalla localStorage
    }

    // Valore del contesto utente
    const value = {
        ...data,
        signUp,
        logIn,
        logOut,
        error,
        loading
    }

    // Restituisce il provider con il contesto utente e i suoi figli
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

// Hook personalizzato per utilizzare il contesto utente
export const useUser = () => {
    const context = useContext(UserContext); // Ottiene il contesto utente
    if (context === undefined) {
        throw new Error(`useUser deve essere utilizzato all'interno di un UserProvider.`) // Gestisce il caso in cui il contesto sia indefinito
    }
    return context;
}
