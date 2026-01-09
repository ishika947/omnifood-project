import React, { useState } from 'react';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I am OmniBot. How can I help you today? 🤖", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  // --- SIMPLE AI LOGIC ---
  const handleSend = () => {
    if (!input.trim()) return;

    // 1. Add User Message
    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    
    // 2. Bot Thinking Logic
    setTimeout(() => {
      let botReply = "I didn't understand that. Try asking about 'menu' or 'timings'.";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
        botReply = "Hello! Welcome to OmniFood. Hungry today? 🍔";
      } else if (lowerInput.includes("menu") || lowerInput.includes("food")) {
        botReply = "We have Pizzas, Burgers, and specialized Indian Thalis. Check the Menu page! 🍕";
      } else if (lowerInput.includes("time") || lowerInput.includes("open")) {
        botReply = "We are open from 10:00 AM to 11:00 PM every day! 🕙";
      } else if (lowerInput.includes("price") || lowerInput.includes("cost")) {
        botReply = "Our meals start from just ₹150. Very affordable! 💸";
      } else if (lowerInput.includes("offer") || lowerInput.includes("discount")) {
        botReply = "Use code 'JUMBO10' for orders above ₹700! 🎉";
      } else if (lowerInput.includes("bye")) {
        botReply = "Goodbye! Have a tasty day! 👋";
      }

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="bg-white w-80 h-96 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="bg-orange-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaRobot className="text-2xl" />
                <span className="font-bold">OmniBot Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-200"><FaTimes/></button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    msg.sender === "user" 
                      ? "bg-orange-600 text-white rounded-br-none" 
                      : "bg-white border text-gray-700 rounded-bl-none shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t flex gap-2">
              <input 
                type="text" 
                placeholder="Ask something..." 
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange-600"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700">
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition transform hover:scale-110 flex items-center justify-center"
      >
        {isOpen ? <FaTimes size={24}/> : <FaRobot size={28} />}
      </button>
    </div>
  );
};

export default ChatBot;