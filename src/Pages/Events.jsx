import React, { useEffect, useState } from "react";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;

export default function EventsPage() {

    const [events, setEvents] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        axios.get(`${VITE_API_URL}/events`)
            .then(res => setEvents(res.data))
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    }, []);

    return (
        <div>
            <h1>Eventi</h1>
            {error ? (
                <p>Si è verificato un errore durante il recupero degli eventi: {error}</p>
            ) : (
                <ul>
                    {events.map(event => (
                        <li key={event._id}>
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <p>Data: {event.date}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
