import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// We will create these components in the next step
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import BookTable from './pages/BookTable';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/book" element={<BookTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;