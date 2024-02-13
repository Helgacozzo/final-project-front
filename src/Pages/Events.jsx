import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { Link } from 'react-router-dom';
import { IoLocationSharp } from "react-icons/io5";
import { useUser } from "../context/UserContext.jsx";
import { axiosOptions } from "../lib/utilities.js";
import OrganizerPopUp from "../Components/OrganizerPopUp.jsx";
import CounterParticipants from "../Components/CounterParticipants.jsx";
import "./Events.scss";

const { VITE_API_URL } = import.meta.env;

const Events = () => {
    const { token } = useUser();
    dayjs.locale('it');

    const [events, setEvents] = useState([]);
    const [error, setError] = useState();
    const [showOrganizerPopUp, setShowOrganizerPopUp] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
    });

    useEffect(() => {
        axios.get(`${VITE_API_URL}/events`, axiosOptions(token))
            .then(res => setEvents(res.data))
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    }, []);

    const handleSubmit = () => {
        axios.post(`${VITE_API_URL}/events`, formData, axiosOptions(token))
            .then(response => {
                console.log(`Evento creato:`, response.data);
                setEvents(prevEvents => [...prevEvents, response.data]);
                setShowOrganizerPopUp(false);
                setFormData({
                    title: '',
                    description: '',
                    date: '',
                    time: '',
                    location: '',
                });
            })
            .catch(error => {
                console.error(`La creazione dell'evento non è andata a buon fine:`, error.response.data.message);
                setError(error.response.data.message);
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="Background-Container">
            <div className="events-container">
                <h1>Eventi</h1>
                <div className="center-button">
                    <button className="organize-button"
                        onClick={() =>
                            setShowOrganizerPopUp(true)}>Organizza Evento</button>
                </div>
                <OrganizerPopUp
                    showPopup={showOrganizerPopUp}
                    onClose={() => setShowOrganizerPopUp(false)}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    formData={formData} />
                <div className="event-grid">
                    {events.map(event => (
                        <Link key={event._id} to={`/events/${event._id}`} className="event-card-link">
                            <div className="event-card">
                                <div className="info-container">
                                    <div className="event-date">
                                        <p className="day">{dayjs(event.date).format('DD')}</p>
                                        <div className="month-year">
                                            <p className="month">{dayjs(event.date).format('MMMM')}</p>
                                            <p className="year">{dayjs(event.date).format('YYYY')}</p>
                                        </div>
                                        <p className="event-time">{event.time}</p>
                                    </div>
                                </div>
                                <div className="event-details">
                                    <h2>{event.title}</h2>
                                    <p>{event.description}</p>
                                    <div className="location">
                                        <IoLocationSharp className="location-icon" />
                                        <p>{event.location}</p>
                                    </div>
                                    <CounterParticipants eventId={event._id} />
                                </div>
                                <p>Vedi di più</p>
                            </div>
                        </Link>
                    ))}
                </div>
                {error && <p className="error">Si è verificato un errore: {error}</p>}
            </div>
        </div>
    );
}

export default Events;
