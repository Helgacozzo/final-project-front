import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './PopUp.scss';

const PartecipantPopUp = ({ showParticipantPopUp, onClose }) => {

  const { token, user } = useUser();

  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    axios.post(`/participants`, formData, axiosOptions(token))
      .then(() => {
        alert(`Partecipante registrato con successo!`);
        setFormData({ name: '', last_name: '', email: '' });
        onClose();
      })
      .catch((error) => {
        console.error(`Errore durante la registrazione del partecipante`, error);
      });
  };

  return (
    <div className={showParticipantPopUp ? "popup-container" : "hidden-popup"}>
      <div className="popup-content">
        <span className="close" onClick={onClose}>X</span>
        <h2>Vuoi partecipare?</h2>
        {user ? (
          <form>
            <div>
              <label>Nome:</label>
              <span>*</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Cognome:</label>
              <span>*</span>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <span>*</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" onClick={handleSubmit}>Partecipa</button>
          </form>
        ) : (
          <p className='paragraph' >Per partecipare, effettua il
            <Link className='link' to="/login"> login</Link> o
            <Link className='link' to="/signup"> registrati</Link>
            .</p>
        )}
      </div>
    </div>
  );
};

export default PartecipantPopUp;
