import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import BookTable from './pages/BookTable';
import About from './pages/About';
import Footer from './components/Footer'; // IMPORT THIS

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-800 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/book" element={<BookTable />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer /> {/* ADD THIS AT THE BOTTOM */}
      </div>
    </Router>
  );
}

export default App;