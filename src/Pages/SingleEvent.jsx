import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotFound from "./NotFound";
import { useParams } from 'react-router-dom';
import "./SingleEvent.scss";

const { VITE_API_URL } = import.meta.env;

const SingleEvent = () => {

  const { token } = useUser();

  const { id } = useParams();

  const [event, setEvent] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`${VITE_API_URL}/events/${id}`, axiosOptions(token))
      .then(res => setEvent(res.data))
      .catch(err => {
        console.error(err);
        setError(true);
      });
  }, [id]);

  if (error || !event) {
    return <NotFound />;
  }

  return (

    <div className="single-event-container">

      <h1>{event.title}</h1>

      <div className="single-event-content">

        <p>{event.description}</p>
        <p>Data: {event.date}</p>

      </div>

    </div>

  );

};

export default SingleEvent;
