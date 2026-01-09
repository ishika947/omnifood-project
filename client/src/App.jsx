import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Context Import

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import BookTable from './pages/BookTable';
import About from './pages/About';
import Admin from './pages/Admin';
import Login from './pages/Login'; // Staff Login
import Cart from './pages/Cart';   // Customer Cart
import Auth from './pages/Auth';   // Customer Login/Signup

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white text-gray-800 font-sans">
          <Navbar />
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/book" element={<BookTable />} />
            <Route path="/about" element={<About />} />
            
            {/* Customer Pages */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Admin/Staff Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;