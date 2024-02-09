import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { IoLocationSharp } from "react-icons/io5";
import OrganizerPopUp from "../Components/OrganizerPopUp.jsx";
import ParticipantPopUp from "../Components/PartecipantPopUp.jsx";
import "./Events.scss";

const { VITE_API_URL } = import.meta.env;

const Events = () => {

    dayjs.locale('it');

    const [events, setEvents] = useState([]);
    const [error, setError] = useState();

    const [showOrganizerPopUp, setShowOrganizerPopUp] = useState(false);
    const [showParticipantPopUp, setShowParticipantPopUp] = useState(false);

    const [selectedEventId, setSelectedEventId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
    });

    useEffect(() => {
        axios.get(`${VITE_API_URL}/events`)
            .then(res => setEvents(res.data))
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    }, []);

    const handleSubmit = () => {
        axios.post(`${VITE_API_URL}/events`, formData)
            .then(response => {
                console.log('Event created:', response.data);
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
                console.error('Event creation failed:', error.response.data.message);
                setError(error.response.data.message);
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: 
            e.target.value
        });
    };

    const handleParticipate = (eventId) => {
        setSelectedEventId(eventId);
        setShowParticipantPopUp(true);
    };

    return (

        <div className="BkContainer">

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
                        <div key={event._id} className="event-card">
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

                                <button className="participate-button"
                                    onClick={() =>
                                        handleParticipate(event._id)}>Partecipa</button>
                            </div>

                        </div>
                    ))}

                </div>
                {error && <p className="error-message">Si è verificato un errore: {error}</p>}
            </div>

            {showParticipantPopUp && selectedEventId && (
                <ParticipantPopUp
                    key={selectedEventId}
                    showParticipantPopUp={showParticipantPopUp}
                    onClose={() => setShowParticipantPopUp(false)}
                />
            )}

        </div>
    );
}

export default Events;
