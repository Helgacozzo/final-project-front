import React from 'react';
import './Services.scss';

export default function() {
    return (
        <div className="services-container">
            <h1 className="title">I Nostri Servizi</h1>
            <div className="service-row">
                <div className="service">
                    <h2>Servizio 1</h2>
                    <p>Descrizione del servizio 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae aliquam lorem. </p>
                </div>
                <div className="service">
                    <h2>Servizio 2</h2>
                    <p>Descrizione del servizio 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae aliquam lorem. </p>
                </div>
                <div className="service">
                    <h2>Servizio 3</h2>
                    <p>Descrizione del servizio 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae aliquam lorem. </p>
                </div>
            </div>
        </div>
    );
}
