import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // 1. Import for Home Page Search
import { useCart } from '../context/CartContext';
import { FaSearch, FaStar, FaShoppingCart, FaLeaf, FaFire } from 'react-icons/fa';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { addToCart } = useCart();
  const location = useLocation(); // 2. Catch data coming from Home

  // --- EFFECT 1: CHECK FOR SEARCH FROM HOME PAGE ---
  useEffect(() => {
    if (location.state && location.state.search) {
      setSearchTerm(location.state.search);
      // Optional: Clear history state so refresh doesn't keep searching
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // --- EFFECT 2: FETCH FOODS ---
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/foods');
        setFoods(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  // --- FILTER LOGIC ---
  const filteredFoods = foods.filter((food) => {
    const matchesCategory = category === "All" || food.category === category;
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Pizza", "Burger", "Drinks", "Dessert", "Indian"];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-10 animate-fade-in-down">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Our Menu</h1>
        <p className="text-gray-500">Delicious dishes crafted with love.</p>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
        
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                category === cat 
                  ? "bg-orange-600 text-white shadow-md transform scale-105" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search food..." 
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* MENU GRID */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading Menu...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <div key={food._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 group flex flex-col h-full">
                
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={food.image} 
                    alt={food.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {food.isVeg ? (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                        <FaLeaf size={10}/> Veg
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                        <FaFire size={10}/> Non-Veg
                      </span>
                    )}
                    {food.rating >= 4.5 && (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                        <FaStar size={10}/> Bestseller
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{food.name}</h3>
                    <div className="flex items-center gap-1 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
                      <span>{food.rating}</span> <FaStar size={8} />
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{food.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-extrabold text-gray-900">₹{food.price}</span>
                    <button 
                      onClick={() => {
                        addToCart(food);
                        // Optional: Alert hata kar toast laga sakte hain baad mein
                        // alert("Added to cart!"); 
                      }}
                      className="bg-black text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 active:scale-95 transition"
                    >
                      <FaShoppingCart /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-gray-300 font-bold">No food found!</p>
              <p className="text-gray-400">Try searching for something else.</p>
              <button 
                onClick={() => {setSearchTerm(""); setCategory("All");}} 
                className="mt-4 text-orange-600 underline font-bold"
              >
                Show All Menu
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;