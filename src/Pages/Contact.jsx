import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './Contact.scss';

export default function() {
    return (
        <div className="page-container">
            <div className="contact-container">
                <h1 className="title">Contatti</h1>
                <div className="contact-info">
                    <div className="info-item">
                    <IoLocationSharp className="contact-icon" size={30}/>
                        <h2>Indirizzo</h2>
                        <p>Via dei Servizi, 123</p>
                    </div>
                    <div className="info-item">
                    <FaPhoneAlt className="contact-icon" size={30}/>
                        <h2>Telefono</h2>
                        <p>+39 123 456789</p>
                    </div>
                    <div className="info-item">
                    <MdEmail className="contact-icon" size={30}/>
                        <h2>Email</h2>
                        <p>info@ethereal.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
