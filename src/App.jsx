import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Events from './Pages/Events';
import SingleEvent from './Pages/SingleEvent';
import NotFound from './Pages/NotFound';
import Sidebar from './Components/SideBar';
import SignUser from './Components/SignUser';


const App = () => {

    return (
        <>
            <Navbar />
            <Sidebar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUser type='signup' />} />
                <Route path="/login" element={<SignUser type='login' />} />
                <Route path="/events/*" element={<Events />} />
                <Route path="/events/:id" element={<SingleEvent />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

        </>
    );

};

export default App;
