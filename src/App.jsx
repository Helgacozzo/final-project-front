import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import AnimatedCursor from "react-animated-cursor"
import Navbar from './Components/Navbar';
import Sidebar from './Components/SideBar';
import Home from './Pages/Home';
import Events from './Pages/Events';
import SingleEvent from './Pages/SingleEvent';
import NotFound from './Pages/NotFound';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import SignUser from './Components/SignUser';
import "./App.scss";


const App = () => {

    // Ottiene lo stato dell'utente dal contesto
    const { user } = useUser();
    // Verifica se l'applicazione è in modalità mobile
    const isMobile = window.innerWidth <= 768;

    return (
        <>
            {/* Visualizza il cursore animato solo se non è in modalità mobile */}
            {!isMobile && <AnimatedCursor color='207, 60, 114' />}
            <Navbar />
            <Sidebar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<SingleEvent />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signup" element={!user ? <SignUser type='signup' /> : <Navigate to="/" />} />
                <Route path="/login" element={!user ? <SignUser type='login' /> : <Navigate to="/" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
