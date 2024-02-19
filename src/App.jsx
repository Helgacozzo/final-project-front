import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Sidebar from './Components/SideBar';
import Home from './Pages/Home';
import Events from './Pages/Events';
import SingleEvent from './Pages/SingleEvent';
import NotFound from './Pages/NotFound';
import SignUser from './Components/SignUser';
import { useUser } from './context/UserContext';
import "./App.scss";

const App = () => {
    const { user } = useUser();

    return (
        <>
            <Navbar />
            <Sidebar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<SingleEvent />} />
                <Route path="/signup" element={!user ? <SignUser type='signup' /> : <Navigate to="/" />} />
                <Route path="/login" element={!user ? <SignUser type='login' /> : <Navigate to="/" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
