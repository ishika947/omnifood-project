import React from 'react';
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Top Section: Logo & Lang */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black italic text-black">OmniFood</h2>
          <div className="flex gap-4">
             <button className="border border-gray-300 px-3 py-1 rounded flex items-center gap-2"><FaGlobe /> India</button>
             <button className="border border-gray-300 px-3 py-1 rounded flex items-center gap-2">English</button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold uppercase mb-4 tracking-wider text-black">About OmniFood</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black cursor-pointer">Who We Are</li>
              <li className="hover:text-black cursor-pointer">Blog</li>
              <li className="hover:text-black cursor-pointer">Work With Us</li>
              <li className="hover:text-black cursor-pointer">Investor Relations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase mb-4 tracking-wider text-black">Omniverse</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black cursor-pointer">OmniFood</li>
              <li className="hover:text-black cursor-pointer">Feeding India</li>
              <li className="hover:text-black cursor-pointer">Hyperpure</li>
              <li className="hover:text-black cursor-pointer">Omniland</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase mb-4 tracking-wider text-black">For Restaurants</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black cursor-pointer">Partner With Us</li>
              <li className="hover:text-black cursor-pointer">Apps For You</li>
              <li className="hover:text-black cursor-pointer">Business App</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase mb-4 tracking-wider text-black">Social Links</h4>
            <div className="flex gap-4 text-xl mb-4">
              <FaLinkedin className="cursor-pointer hover:text-black"/>
              <FaInstagram className="cursor-pointer hover:text-black"/>
              <FaTwitter className="cursor-pointer hover:text-black"/>
              <FaFacebook className="cursor-pointer hover:text-black"/>
            </div>
            <div className="space-y-2">
               <img src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png" alt="App Store" className="h-10 cursor-pointer" />
               <img src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png" alt="Play Store" className="h-10 cursor-pointer" />
            </div>
          </div>
        </div>

        <hr className="border-gray-300 mb-8" />

        <p className="text-sm text-gray-500">
          By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © OmniFood™ Ltd. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;