import React from "react";
import './PopUp.scss';

const OrganizerPopUp = ({ showPopup, onClose, handleSubmit, handleChange, formData }) => {

  return (

    showPopup && (

      <div className="popup-container">

        <div className="popup-content">

          <span className="close" onClick={onClose}>X</span>

          <h2>Crea un nuovo evento</h2>

          <form onSubmit={handleSubmit}>
            
            <label>Titolo:</label>
            <span>*</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label>Descrizione:</label>
            <span>*</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <label>Data:</label>
            <span>*</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label>Ora:</label>
            <span>*</span>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />

            <label>Luogo:</label>
            <span>*</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <button type="submit">Crea Evento</button>

          </form>

        </div>

      </div>
    )
  );
};

export default OrganizerPopUp;
