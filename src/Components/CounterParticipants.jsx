import React, { useState, useEffect } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import 'dayjs/locale/it';
import "./CounterParticipants.scss";


const CounterParticipants = ({ eventId }) => {

    const [count, setCount] = useState(() => {
        const savedCount = localStorage.getItem(`count_${eventId}`);
        return savedCount ? parseInt(savedCount) : 0;
    });

    useEffect(() => {
        localStorage.setItem(`count_${eventId}`, count.toString());
    }, [count, eventId]);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

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

            <div>
                <h5>{count} <IoPersonSharp size={10} /></h5>
            </div>

        </div>

    );

};

export default CounterParticipants;
