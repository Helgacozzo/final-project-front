import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Events.scss";

const { VITE_API_URL } = import.meta.env;

const EventsPage = () => {

    const [events, setEvents] = useState([]);
    const [error, setError] = useState();

    const [showEventForm, setShowEventForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        axios.get(`${VITE_API_URL}/events`)
            .then(res => setEvents(res.data))
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    }, []);


    const handleSubmit = (e) => {
        axios.post(`${VITE_API_URL}/events`, formData)
            .then(response => {
                console.log('Event created:', response.data);
                setEvents(prevEvents => [...prevEvents, response.data]);
                setShowEventForm(false);
                setFormData({
                    title: '',
                    description: '',
                    date: '',
                    time: '',
                    location: ''
                });
            })
            .catch(error => {
                console.error('Event creation failed:', error.response.data.message);
                setError(error.response.data.message);
            });
    };
    



    return (
        <div className="BkContainer">
            <div className="events-container">

                <h1>Eventi</h1>

                <div className="center-button">
                    <button className="organize-button"
                        onClick={() =>
                            setShowEventForm(true)}>Organizza Evento</button>
                </div>


                {showEventForm && (

                    <div className="popup">

                        <div className="popup-content">

                            <span className="close" onClick={() =>
                                setShowEventForm(false)}>X</span>

                            <h2>Crea un nuovo evento</h2>

                            <form onSubmit={handleSubmit}>

                                <label>Titolo:<span>*</span></label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required />

                                <label>Descrizione:<span>*</span></label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required />

                                <label>Data:<span>*</span></label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required />

                                <label>Ora:<span>*</span></label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required />

                                <label>Luogo:<span>*</span></label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required />


                                <button className="organize-button" type="submit">Crea Evento</button>

                            </form>
                        </div>
                    </div>
                )}

                {error && <p className="error-message">Si è verificato un errore: {error}</p>}

                <div className="event-grid">

                    {events.map(event => (
                        <div key={event._id} className="event-card">
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <p>Data: {event.date}</p>
                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
}

export default EventsPage;
