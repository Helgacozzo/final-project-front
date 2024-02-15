import React from 'react';
import "./PopUp.scss";


const DeleteEventPopUp = ({ isOpen, onClose, onDelete }) => {

  return (

    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <span className="close" onClick={onClose}>X</span>
          <h2>Sei sicuro di voler eliminare questo evento?</h2>
          <div className="popup-buttons">
            <button onClick={onClose}>Annulla</button>
            <button onClick={onDelete}>Cancella</button>
          </div>
        </div>
      </div>
    )

  );

};

export default DeleteEventPopUp;
