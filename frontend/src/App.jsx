import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // ← ADD THIS
import Home from './components/Home';
import CameraSearch from './components/CameraSearch';
import TextSearch from './components/TextSearch';
import AnimalDetails from './components/AnimalDetails';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camera" element={<CameraSearch />} />
            <Route path="/search" element={<TextSearch />} />
            <Route path="/animal/:name" element={<AnimalDetails />} />
          </Routes>
        </main>
        <Footer />  {/* ← ADD THIS */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;