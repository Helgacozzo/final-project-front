import React from 'react';

const DeleteEventPopUp = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Sei sicuro di voler eliminare questo evento?</h2>
        <div className="popup-buttons">
          <button onClick={onClose}>Annulla</button>
          <button onClick={onDelete}>Cancella</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventPopUp;
