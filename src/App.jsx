import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Events from './Pages/Events';
import SingleEvent from './Pages/SingleEvent';
import NotFound from './Pages/NotFound';


const App = () => {
    
    return (
        <>
            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/events/*" element={<Events />} />
                <Route path="/events/:id" element={<SingleEvent />} />
                <Route path="*" element={<NotFound />} />

            </Routes>

        </>
    );

};

export default App;
