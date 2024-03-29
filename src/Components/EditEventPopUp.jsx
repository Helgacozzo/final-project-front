import React, { useState } from 'react';
import "./PopUp.scss";


const EditEventPopUp = ({ isOpen, setIsOpen, onSave, eventData, error }) => {

    // Definizione dello stato per i dati del modulo di modifica
    const [formData, setFormData] = useState({
        title: eventData.title,
        description: eventData.description,
        organizer_name: eventData.organizer_name,
        more_info: eventData.more_info,
        date: eventData.date,
        time: eventData.time,
        location: eventData.location
    });

    // Funzione per gestire il cambio dei valori nei campi del modulo di modifica
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Funzione per gestire l'invio del modulo di modifica
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...eventData,
            ...formData
        });
        setIsOpen(false);
    };

    // Rendering del componente solo se isOpen è true
    return (

        isOpen && (

            <div className="popup-container">
                <div className="popup-content">
                    <span className="close" onClick={() => setIsOpen(false)}>X</span>
                    <h2>Modifica Evento</h2>

                    {error && <div className="error">{error}</div>}

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
                        <button type="submit">Salva Modifiche</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default EditEventPopUp;
