import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotFound from "./NotFound";
import { useParams } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;

const SingleEvent = () => {

  const { id } = useParams();
  const [event, setEvent] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    axios.get(`${VITE_API_URL}/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => {
        console.error(err);
        setError(true);
      })
  }, [id]);

  if (error || event === null) {
    return <NotFound />;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Data: {event.date}</p>
    </div>
  );
};

export default SingleEvent;
