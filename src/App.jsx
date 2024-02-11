import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Events from './Pages/Events';
import SingleEvent from './Pages/SingleEvent';
import NotFound from './Pages/NotFound';
import { useUser } from './context/UserContext'
import Sidebar from './Components/SideBar';
import SignUser from './Components/SignUser';


const App = () => {

    const { user } = useUser();

    return (
        <>
            <Navbar />
            <Sidebar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={!user ? <SignUser type='signup' /> : <Navigate to="/" />} />
                <Route path="/login" element={!user ? <SignUser type='login' /> : <Navigate to="/" />} />
                <Route path="/events/*" element={<Events />} />
                <Route path="/events/:id" element={<SingleEvent />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

        </>
    );

};

export default App;
