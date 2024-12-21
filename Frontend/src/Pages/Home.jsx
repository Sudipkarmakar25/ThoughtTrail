import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('opacity-100');
      }, index * 200);
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-yellow-500 to-blue-600 h-screen w-full flex items-center justify-center">
      {/* Content Section */}
      <div className="flex flex-col items-center justify-center h-full px-4 sm:px-8 md:px-16 fade-in opacity-0">
        {/* Heading Section */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4 transition-transform transform hover:scale-105">
          Stay Ahead in the World of Technology
        </h1>
        
        <p className="text-lg text-white text-center mb-6 max-w-2xl fade-in opacity-0">
           
Stay ahead in the tech world with our curated content. Explore insightful tutorials, emerging trends, and the latest innovations in software development, AI, machine learning, and more. Whether you're a beginner or expert, our platform helps you enhance your skills and stay updated on the dynamic tech landscape.
        </p>
        
        <div className="flex justify-center gap-4 fade-in opacity-0">
          <Link to="/Register">
            <button className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105">
              Register
            </button>
          </Link>

          <Link to="/Login">
            <button className="px-6 py-3 bg-gray-300 text-gray-800 text-lg font-semibold rounded-lg hover:bg-gray-400 transition duration-300 transform hover:scale-105">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
