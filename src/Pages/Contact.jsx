import React from 'react';
import './Contact.scss';

export default function() {
    return (
        <div className="page-container">
            <div className="contact-container">
                <h1 className="title">Contatti</h1>
                <div className="contact-info">
                    <div className="info-item">
                        <h2>Indirizzo</h2>
                        <p>Via dei Servizi, 123</p>
                    </div>
                    <div className="info-item">
                        <h2>Telefono</h2>
                        <p>+39 123 456789</p>
                    </div>
                    <div className="info-item">
                        <h2>Email</h2>
                        <p>info@ethereal.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
