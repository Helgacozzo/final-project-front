import React, { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { useUser } from "../context/UserContext.jsx";
import { Link } from "react-router-dom";
import OrganizerPopUp from "../Components/OrganizerPopUp.jsx";
import CounterParticipants from "../Components/CounterParticipants.jsx";
import Preloader from '../Components/Preloader.jsx';
import axios from "axios";
import { axiosOptions } from '../lib/utilities.js'
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import "./Events.scss";

const { VITE_API_URL } = import.meta.env;


export default function () {

    // Imposta la localizzazione su italiano per dayjs
    dayjs.locale('it');

    // Ottieni il token dall'UserContext
    const { token } = useUser();

    // Stati per gestire gli eventi, eventuali errori, la visualizzazione del popup organizzatore e lo stato di caricamento
    const [events, setEvents] = useState([]);
    const [error, setError] = useState();
    const [showOrganizerPopUp, setShowOrganizerPopUp] = useState(false);
    const [loading, setLoading] = useState(true);

    // Stato per memorizzare i dati del form per la creazione di un nuovo evento
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        more_info: '',
        organizer_name: '',
        date: '',
        time: '',
        location: ''
    });

    // Effetto per caricare gli eventi al caricamento della pagina
    useEffect(() => {
        axios.get(`${VITE_API_URL}/events`, axiosOptions(token))
            .then(res => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Funzione per gestire la sottomissione del form per la creazione di un nuovo evento
    const handleSubmit = () => {
        axios.post(`${VITE_API_URL}/events`, formData, axiosOptions(token))
            .then(response => {
                console.log(`Evento creato:`, response.data);
                // Aggiungi il nuovo evento alla lista degli eventi
                setEvents(prevEvents => [...prevEvents, response.data]);
                // Chiudi il popup dell'organizzatore e resetta i dati del form
                setShowOrganizerPopUp(false);
                setFormData({
                    title: '',
                    description: '',
                    more_info: '',
                    organizer_name: '',
                    date: '',
                    time: '',
                    location: ''
                });
            })
            .catch(error => {
                console.error(`La creazione dell'evento non è andata a buon fine:`, error.response.data.message);
                setError(error.response.data.message);
            });
    };

    // Funzione per gestire il cambiamento dei valori del form
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            {/* Visualizza un preloader durante il caricamento */}
            {loading && <Preloader />}

            <div className="Background-Container">
                <div className="events-container">
                    <h1>Events</h1>
                    <div className="center-button">
                        <button className="organize-button" onClick={() => setShowOrganizerPopUp(true)}>Organizza Evento</button>
                    </div>

                    <OrganizerPopUp
                        isOpen={showOrganizerPopUp}
                        onClose={() => setShowOrganizerPopUp(false)}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        formData={formData} />

                    <div className="event-grid">
                        {/* Mostra gli eventi se ce ne sono, altrimenti mostra un messaggio */}
                        {Array.isArray(events) && events.length > 0 ? (
                            events.map(event => (
                                <div key={event._id} className="event-card">
                                    <div className="event-date">
                                        <div>
                                            <p className="day">{dayjs(event.date).format('DD')}</p>
                                            <p className="month">{dayjs(event.date).format('MMMM')}</p>
                                            <p className="year">{dayjs(event.date).format('YYYY')}</p>
                                        </div>
                                        <p className="event-time">{event.time}</p>
                                    </div>
                                    <div className="event-details">
                                        <div className="title-wrapper">
                                            <h4>{event.title}</h4>
                                            <Link key={event._id} to={`/events/${event._id}`} >
                                                <HiDotsHorizontal size={20} className="dots" />
                                            </Link>
                                        </div>
                                        <p>{event.description}</p>
                                        <div className="location">
                                            <IoLocationSharp className="location-icon" />
                                            <p>{event.location}</p>
                                        </div>
                                        <CounterParticipants eventId={event._id} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="not-events-container">
                                <p className="not-events">Non ci sono eventi disponibili al momento.</p>
                            </div>
                        )}
                    </div>
                    {error && <p className="error">Si è verificato un errore: {error}</p>}
                </div>
            </div>
        </>
    );
}
