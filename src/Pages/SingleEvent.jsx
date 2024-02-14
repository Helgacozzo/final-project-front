import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { IoLocationSharp } from 'react-icons/io5';
import { useUser } from '../context/UserContext.jsx';
import { axiosOptions } from '../lib/utilities.js';
import NotFound from './NotFound';
import Organizer from '../Components/Organizer.jsx';
import DeleteEventPopUp from '../Components/DeleteEventPopUp.jsx';
import './SingleEvent.scss'

const { VITE_API_URL } = import.meta.env;

const SingleEvent = () => {
  const { token } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState(false);
  const [editPopUpOpen, setEditPopUpOpen] = useState(false);
  const [deletePopUpOpen, setDeletePopUpOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/events/${id}`, axiosOptions(token))
      .then(res => setEvent(res.data))
      .catch(err => {
        console.error(err);
        setError(true);
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

  if (error || event === null) {
    return <NotFound />;
  }

  return (
    <div className='Back-Container'>
    
        <div className="single-event-content">
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p className="day">{dayjs(event.date).format('DD-MM-YYYY')}</p>
          <div className="location">
            <IoLocationSharp className="location-icon" />
            <p>{event.location}</p>
          </div>
          {!event.organizer ?
            <div className="error">Non sei il creatore di questo evento</div>
            :
            <div>Organizzatore: <Link to={`/organizers/${event.organizer.id}`}>{organizer_name(event.organizer)}</Link></div>
          }
          <div>
            <button onClick={() => setEditPopUpOpen(true)}>Modifica</button>
            <button onClick={() => setDeletePopUpOpen(true)}>Cancella evento</button>
          </div>
          
          <Organizer
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
        </div>
      </div>
  );
};

export default SingleEvent;
