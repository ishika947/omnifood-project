import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// --- PAGES ---
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Login from './pages/Login'; // Staff/Admin Login
import Auth from './pages/Auth';   // Customer Signup/Login
import MyOrders from './pages/MyOrders'; // Customer Order History
import BookTable from './pages/BookTable'; // Table Booking Page

// --- COMPONENTS ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot'; // 🤖 NEW: AI Assistant

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans">
          
          {/* 1. Navigation Bar (Always Top) */}
          <Navbar />

          {/* 2. Main Content Area (Changes based on Route) */}
          <div className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/book" element={<BookTable />} />
              
              {/* Authentication Routes */}
              <Route path="/auth" element={<Auth />} />   {/* For Customers */}
              <Route path="/login" element={<Login />} /> {/* For Staff */}
              
              {/* Private/Protected Routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
          </div>

          {/* 3. Floating AI ChatBot (Visible on all pages) */}
          <ChatBot />

          {/* 4. Footer (Always Bottom) */}
          <Footer />
          
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;