import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./Organizer.scss";

const Organizer = ({ showPopup, onClose, handleSubmit, handleChange, formData }) => {

  const { user } = useUser();

  return (
    showPopup && (
      <div className="popup-container">
        <div className="popup-content">
          <span className="close" onClick={onClose}>X</span>
          <h2>{user ? "Crea un nuovo evento" : "Vuoi creare un nuovo evento?"}</h2>
          {user ? (
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
          ) : (
            <p className="paragraph">Per creare un evento, effettua il
              <Link className="link" to="/login"> login</Link> o
              <Link className="link" to="/signup"> registrati</Link>
              .</p>
          )}
        </div>
      </div>
    )
  );
};

export default Organizer;