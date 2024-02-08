import React, { useState } from 'react';
import axios from 'axios';
import './PopUp.scss'

const PartecipantPopUp = ({ showParticipantPopUp, onClose }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]:
       e.target.value 
    });
  };

  const handleSubmit = () => {
    axios.post('/participants', formData)
      .then(() => {
        alert('Partecipante registrato con successo!');
        setFormData({ name: '', email: '', age: '' });
        onClose();
      })
      .catch((error) => {
        console.error('Errore durante la registrazione del partecipante', error);
      });
  };

  return (

    <div className={showParticipantPopUp ? "popup-container" : "hidden-popup"}>

      <div className="popup-content">

        <span className="close"
          onClick={onClose}>X</span>

        <h2>Vuoi partecipare?</h2>

        <form>

          <div>
            <label>Nome:</label>
            <span>*</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required />
          </div>

          <div>
            <label>Email:</label>
            <span>*</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required />
          </div>

          <div>
            <label>Età:</label>
            <span>*</span>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required />
          </div>

          <button
            type="button"
            onClick={handleSubmit}>Partecipa</button>

        </form>

      </div>

    </div>

  );

};

export default PartecipantPopUp;
