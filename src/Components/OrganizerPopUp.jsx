import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./PopUp.scss";


const OrganizerPopUp = ({ isOpen, onClose, handleSubmit, handleChange, formData, error }) => {

  const { user } = useUser();

  return (

    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <span className="close" onClick={onClose}>X</span>
          <h2>{user ? "Crea un nuovo evento" : "Vuoi creare un nuovo evento?"}</h2>
          {error && <div className="error">{error}</div>}
          {user ? (
            <form onSubmit={(e) => {
              e.preventDefault(); // Evita il comportamento predefinito del submit del form
              handleSubmit(); // Chiama la funzione handleSubmit
            }}>
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

              <label>Altre Informazioni:</label>
              <textarea
                name="more_info"
                value={formData.more_info}
                onChange={handleChange}
              />

              <label>Nome dell'organizzatore:</label>
              <input
                type="text"
                name="organizer_name"
                value={formData.organizer_name}
                onChange={handleChange}
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

export default OrganizerPopUp;
