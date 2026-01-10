// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

// const About = () => {
//   return (
//     <div className="min-h-screen bg-white py-12 px-4">
      
//       {/* 1. Header Section */}
//       <div className="text-center mb-16">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">Experience <span className="text-orange-600">OmniFood Prime</span></h1>
//         <p className="text-gray-500 max-w-2xl mx-auto">
//           Located in the heart of the city, we offer a serene dining experience with a blend of modern architecture and nature.
//         </p>
//       </div>

//       {/* 2. Photo Gallery (Ambiance/Space) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-6xl mx-auto">
//         {/* Large Image */}
//         <motion.div 
//           whileHover={{ scale: 1.02 }}
//           className="md:col-span-2 row-span-2 overflow-hidden rounded-2xl shadow-lg"
//         >
//           <img 
//             src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" 
//             alt="Restaurant Interior" 
//             className="w-full h-full object-cover"
//           />
//         </motion.div>
        
//         {/* Smaller Side Images */}
//         <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-2xl shadow-lg h-64">
//           <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" alt="Outdoor View" className="w-full h-full object-cover"/>
//         </motion.div>
//         <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-2xl shadow-lg h-64">
//           <img src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&w=800&q=80" alt="Private Dining" className="w-full h-full object-cover"/>
//         </motion.div>
//       </div>

//       {/* 3. Location & Contact Info */}
//       <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center shadow-2xl">
        
//         {/* Details */}
//         <div className="flex-1 space-y-6">
//           <h2 className="text-3xl font-bold text-orange-500">Visit Us</h2>
          
//           <div className="flex items-start gap-4">
//             <FaMapMarkerAlt className="text-2xl text-orange-500 mt-1" />
//             <div>
//               <p className="font-bold text-lg">Indore, Madhya Pradesh</p>
//               <p className="text-gray-400">101, Vijay Nagar Square, Near C21 Mall.</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <FaClock className="text-2xl text-orange-500" />
//             <div>
//               <p className="font-bold">11:00 AM - 11:00 PM</p>
//               <p className="text-gray-400">Open All Days</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <FaPhone className="text-2xl text-orange-500" />
//             <p className="font-bold text-lg">+91 98765 43210</p>
//           </div>
//         </div>

//         {/* Embedded Map (Google Maps Embed) */}
//         <div className="flex-1 w-full h-64 rounded-xl overflow-hidden border-4 border-gray-700">
//            <iframe 
//              title="map"
//              width="100%" 
//              height="100%" 
//              frameBorder="0" 
//              scrolling="no" 
//              marginHeight="0" 
//              marginWidth="0" 
//              src="https://maps.google.com/maps?q=Vijay+Nagar+Indore&t=&z=13&ie=UTF8&iwloc=&output=embed"
//            ></iframe>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default About;




import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUtensils, FaUsers, FaLeaf } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <div 
        className="relative h-[50vh] w-full bg-cover bg-fixed bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight"
          >
            Our Story
          </motion.h1>
          <p className="text-xl md:text-2xl font-light opacity-90">Serving happiness in Indore since 2024</p>
        </div>
      </div>

      {/* 2. MAIN STORY SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
            <img src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2000" alt="Chef" className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"/>
          </motion.div>
          <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
            <h4 className="text-orange-600 font-bold uppercase tracking-widest mb-2">About OmniFood</h4>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">More Than Just a Restaurant</h2>
            <p className="text-gray-600 text-lg mb-6">Started in the heart of <strong>Indore</strong>, OmniFood blends authentic flavors with modern culinary art.</p>
            <p className="text-gray-600 text-lg mb-8">Whether it's <strong>Butter Paneer</strong> or <strong>Chilli Potato</strong>, we serve love on a plate.</p>
            <div className="flex items-center gap-4">
               <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Founder" className="w-16 h-16 rounded-full border-2 border-orange-500"/>
               <div><p className="font-bold text-gray-900">Rajesh Sharma</p><p className="text-sm text-gray-500">Founder & Head Chef</p></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. FEATURES */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-800">Why People Love Us</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {[
               { icon: <FaLeaf/>, title: "Fresh Ingredients", desc: "Farm-fresh vegetables." },
               { icon: <FaUtensils/>, title: "Expert Chefs", desc: "Masters of culinary arts." },
               { icon: <FaAward/>, title: "Best Quality", desc: "No compromise on taste." },
               { icon: <FaUsers/>, title: "Family Friendly", desc: "Perfect ambiance." },
             ].map((item, i) => (
               <motion.div key={i} whileHover={{ y: -10 }} className="bg-white p-8 rounded-xl shadow-lg text-center border-b-4 border-orange-500">
                 <div className="text-orange-500 text-4xl mb-4 flex justify-center">{item.icon}</div>
                 <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                 <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;