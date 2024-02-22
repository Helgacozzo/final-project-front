import React from 'react';
import "./PopUp.scss";


const DeleteEventPopUp = ({ isOpen, onClose, onDelete, error }) => {

  return (

    isOpen && (

      <div className="popup-container">

        <div className="popup-content">
          <span className="close" onClick={onClose}>X</span>
          <h3>Sei sicuro di voler cancellare l'evento?</h3>

          {error && <div className="error">{error}</div>}

          <div className="popup-buttons">
            <button onClick={onClose}>Annulla</button>
            <button className="delete-button" onClick={onDelete}>Cancella</button>
          </div>
        </div>

      </div>

    )

  );

};

export default DeleteEventPopUp;
