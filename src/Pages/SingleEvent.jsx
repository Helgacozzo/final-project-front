import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { useUser } from '../context/UserContext.jsx';
import { axiosOptions } from '../lib/utilities.js';
import EditEventPopUp from '../Components/EditEventPopUp.jsx';
import DeleteEventPopUp from '../Components/DeleteEventPopUp.jsx';
import NotFound from './/NotFound.jsx';
import Preloader from '../Components/Preloader.jsx';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import './SingleEvent.scss';

const { VITE_API_URL } = import.meta.env;

export default function () {
  const { token } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editPopUpOpen, setEditPopUpOpen] = useState(false);
  const [deletePopUpOpen, setDeletePopUpOpen] = useState(false);

  useEffect(() => {
    axios.get(`${VITE_API_URL}/events/${id}`, axiosOptions(token))
      .then(res => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [id, token]);

  const handleDelete = () => {
    axios
      .delete(`${VITE_API_URL}/events/${id}`, axiosOptions(token))
      .then(() => {
        navigate('/events');
      })
      .catch(err => {
        console.error(err);
        setError(true);
      });
  };

  return (

    <div className='Back-Container'>
      <div className="single-event-content">

        {loading && <Preloader />}
        {error && <NotFound />}

        {event && (
          <>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.more_info}</p>
            <p>{event.organizer_name}</p>
            <p className="day">{dayjs(event.date).format('DD-MM-YYYY')}</p>
            <div className="location">
              <IoLocationSharp className="location-icon" />
              <p>{event.location}</p>
            </div>
            <div>
              <button className="organizer-button" onClick={() => setEditPopUpOpen(true)}>Modifica</button>
              <button className="organizer-button" onClick={() => setDeletePopUpOpen(true)}>Elimina</button>
            </div>

            <EditEventPopUp
              isOpen={editPopUpOpen}
              setIsOpen={(v) => { setEditPopUpOpen(v) }}
              onSave={(newEvent) => {
                if (newEvent.id !== event.id) {
                  navigate(`/events/${newEvent.id}`);
                  return;
                }
                setEvent(newEvent);
              }}
              eventData={event}
            />

            <DeleteEventPopUp
              isOpen={deletePopUpOpen}
              onClose={() => setDeletePopUpOpen(false)}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>

  );

};
