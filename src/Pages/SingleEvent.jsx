import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { IoLocationSharp } from "react-icons/io5";
import { useUser } from "../context/UserContext.jsx";
import { axiosOptions } from "../lib/utilities.js";
import { useParams } from 'react-router-dom';
import NotFound from "./NotFound";
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
        <p className="day">{dayjs(event.date).format('DD-MM-YYYY')}</p>
        <div className="location">
          <IoLocationSharp className="location-icon" />
          <p>{event.location}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
