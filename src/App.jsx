import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Events from './Pages/Events';
import NotFound from './Pages/NotFound';

function App() {
  
  return (
    (
      <>
        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/" element={<Events />} />
          <Route path="*" element={<NotFound />} />

        </Routes>

      </>
    )
  );
}

export default App;
