import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate import karein
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // --- SEARCH FUNCTION ---
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // User ko Menu page par bhejo aur sath mein 'search' data le jao
      navigate('/menu', { state: { search: searchTerm } });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO SECTION */}
      <div className="bg-black text-white py-20 px-6 text-center relative overflow-hidden">
        {/* Background Pattern (Optional) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://source.unsplash.com/1600x900/?restaurant,food')] bg-cover bg-center"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Taste the <span className="text-orange-500">Extraordinary</span>
          </h1>
          <p className="text-gray-300 mb-8 text-lg">
            Fresh ingredients, authentic recipes, and a dining experience you'll never forget.
          </p>

          {/* --- SEARCH BAR (UPDATED) --- */}
          <form onSubmit={handleSearch} className="bg-white p-2 rounded-full shadow-2xl flex flex-col md:flex-row items-center max-w-2xl mx-auto">
            
            {/* Location (Static/Dummy rakhein kyunki ek hi city hai) */}
            <div className="flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 w-full md:w-1/3">
              <FaMapMarkerAlt className="text-orange-500 mr-2" />
              <select className="bg-transparent outline-none text-gray-700 font-bold w-full cursor-pointer">
                <option>Indore, M.P.</option>
                <option>Vijay Nagar</option>
                <option>Bhawarkua</option>
              </select>
            </div>

            {/* Search Input (Functional) */}
            <div className="flex items-center px-4 py-2 w-full md:flex-grow">
              <FaSearch className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search for Pizza, Burger..." 
                className="bg-transparent outline-none text-gray-800 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Search Button */}
            <button type="submit" className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition w-full md:w-auto mt-2 md:mt-0">
              Search
            </button>
          </form>
          {/* --- END SEARCH BAR --- */}
          
        </div>
      </div>

      {/* ... (Baaki poora Home page content same rahega categories, popular items etc.) ... */}
      
      <div className="py-16 text-center">
         <h2 className="text-3xl font-bold mb-4">Why OmniFood?</h2>
         <p className="text-gray-500">We serve passion on every plate.</p>
         {/* ... baaki sections ... */}
      </div>

    </div>
  );
};

export default Home;