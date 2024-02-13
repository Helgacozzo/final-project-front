import React, { useState, useEffect } from 'react';
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
        <div>
            <h5>Partecipanti: {count}</h5>
            <div className='btn-container'>
                <button className="participate-button" onClick={increment}>Partecipa</button>
                <button className="not-button" onClick={decrement}>Annulla</button>
            </div>
        </div>
    );

};

export default CounterParticipants;
