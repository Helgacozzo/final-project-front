import React from 'react';
import './Services.scss';
import meditazioneImg from '../assets/meditazione.jpg'; 
import coachingImg from '../assets/coaching.jpg'; 
import tarocchiImg from '../assets/tarocchi.jpg';
export default function() {
    return (
        <div className="services-container">
            <h1 className="title">I Nostri Servizi</h1>
            <hr className="divider" />
            <div className="service-row">
                <div className="service">
                    <img src={meditazioneImg} alt="Meditazione" />
                    <h2>Meditazione Online</h2>
                    <p>Sessioni di meditazione guidate da esperti per la consapevolezza e il benessere.</p>
                </div>
                <div className="service">
                    <img src={tarocchiImg} alt="Lettura dei Tarocchi" />
                    <h2>Lettura dei Tarocchi</h2>
                    <p>Letture online dei tarocchi per risposte immediate e ispirazione personale.</p>
                </div>
                <div className="service">
                    <img src={coachingImg} alt="Coaching Spirituale" />
                    <h2>Coaching Spirituale</h2>
                    <p>Supporto per affrontare sfide personali e sviluppare una pratica spirituale.</p>
                </div>
            </div>
        </div>
    );
}
