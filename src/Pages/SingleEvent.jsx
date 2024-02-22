import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { useUser } from '../context/UserContext.jsx';
import { axiosOptions } from '../lib/utilities.js';
import EditEventPopUp from '../Components/EditEventPopUp.jsx';
import DeleteEventPopUp from '../Components/DeleteEventPopUp.jsx';
import NotFound from './NotFound.jsx';
import Preloader from '../Components/Preloader.jsx';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import './SingleEvent.scss';

const { VITE_API_URL } = import.meta.env;


export default function () {

  // Estrae user e token dal contesto dell'utente
  const { user, token } = useUser();
  // Estrae l'ID dell'evento dai parametri della route
  const { id } = useParams();
  // Ottiene la funzione di navigazione per la gestione delle route
  const navigate = useNavigate();

  // Stati per i dettagli dell'evento, il caricamento, e gli errori
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Stati per controllare l'apertura dei popup di modifica ed eliminazione dell'evento
  const [editPopUpOpen, setEditPopUpOpen] = useState(false);
  const [deletePopUpOpen, setDeletePopUpOpen] = useState(false);

  // Effetto per ottenere i dettagli dell'evento quando l'id del percorso cambia o il token dell'utente cambia
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

  // Funzione per gestire l'eliminazione dell'evento
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

  // Funzione per gestire il salvataggio delle modifiche all'evento
  const handleSave = (newEvent) => {
    axios
      .patch(`${VITE_API_URL}/events/${id}`, newEvent, axiosOptions(token))
      .then(() => {
        setEvent(newEvent);
      })
      .catch(err => {
        console.error(err);
        setError(true);
      });
  };

  return (

    <div className='Back-Container'>

      <div className="single-event-content">
        {/* Visualizza un preloader durante il caricamento */}
        {loading && <Preloader />}
        {/* Visualizza una pagina 404 se si verifica un errore */}
        {error && <NotFound />}
        {event && (
          <>
            <div className="title-wrapper">
              <div className='event-date-b'>
                <span className="day">{dayjs(event.date).format('DD')}</span>
                <span className="month">{dayjs(event.date).format('MMMM')}</span>
              </div>
            </div>
            <hr className='hr-event' />
            <h1>{event.title}</h1>
            <div className='description'>
              <p>{event.description}</p>
              <br />
              <p>{event.more_info}</p>
            </div>
            <p>{event.organizer_name}</p>
            <div className="location">
              <IoLocationSharp className="location-icon" />
              <p>{event.location}</p>
            </div>
            {/* Se l'utente è autenticato, visualizza i pulsanti per modificare ed eliminare l'evento */}
            {user && (
              <div className="button-container">
                <button className="organizer-button" onClick={() => setEditPopUpOpen(true)}>Modifica</button>
                <button className="organizer-button" onClick={() => setDeletePopUpOpen(true)}>Elimina</button>
              </div>
            )}

            <EditEventPopUp
              isOpen={editPopUpOpen}
              setIsOpen={(v) => { setEditPopUpOpen(v) }}
              onSave={handleSave}
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
}
