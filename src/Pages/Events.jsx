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

export default function Events() {

    dayjs.locale('it');

    const { token } = useUser();

    const [events, setEvents] = useState([]);
    const [error, setError] = useState();
    const [showOrganizerPopUp, setShowOrganizerPopUp] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        more_info: '',
        organizer_name: '',
        date: '',
        time: '',
        location: ''
    });

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

    const handleSubmit = () => {
        axios.post(`${VITE_API_URL}/events`, formData, axiosOptions(token))
            .then(response => {
                console.log(`Evento creato:`, response.data);
                setEvents(prevEvents => [...prevEvents, response.data]);
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (

        <>
            {loading && <Preloader />}

            <div className="Background-Container">
                <div className="events-container">
                    <h1>Events</h1>
                    <div className="center-button">
                        <button className="organize-button"
                            onClick={() =>
                                setShowOrganizerPopUp(true)}>Organizza Evento</button>
                    </div>

                    <OrganizerPopUp
                        isOpen={showOrganizerPopUp}
                        onClose={() => setShowOrganizerPopUp(false)}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        formData={formData} />

                    <div className="event-grid">

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

                                        <div>
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
                            <p className="not-events">Non ci sono eventi disponibili al momento.</p>
                        )}
                    </div>
                    {error && <p className="error">Si è verificato un errore: {error}</p>}
                </div>

            </div>

        </>

    );

}
