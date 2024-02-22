import React, { useState, useEffect } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import 'dayjs/locale/it'; // Importazione della localizzazione italiana per dayjs
import "./CounterParticipants.scss";


const CounterParticipants = ({ eventId }) => {

    const [count, setCount] = useState(() => {
        const savedCount = localStorage.getItem(`count_${eventId}`); // Inizializzazione del conteggio recuperando il valore salvato nella localStorage
        return savedCount ? parseInt(savedCount) : 0;  // Se il valore è presente, lo converte in un numero intero, altrimenti lo imposta a 0
    });

    // Effetto collaterale per salvare il conteggio nella localStorage ogni volta che cambia
    useEffect(() => {
        localStorage.setItem(`count_${eventId}`, count.toString());
    }, [count, eventId]);

    // Funzione per incrementare il conteggio dei partecipanti
    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    // Funzione per decrementare il conteggio dei partecipanti, con controllo per non andare sotto lo zero
    const decrement = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
        }
    };


    return (

        <div className='btn-container'>

            <div>
                <button className="participate-button" onClick={increment}>Partecipa</button>
                <button className="not-button" onClick={decrement}>Annulla</button>
            </div>

            <div className='participants'>
                <h5>{count} <IoPersonSharp size={10} /></h5>
            </div>
        </div>

    );

};

export default CounterParticipants;
