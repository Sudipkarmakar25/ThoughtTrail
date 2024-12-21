import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBoy from "../components/Animatedboy";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data being sent:", formData); // Debug log

    try {
        const { data } = await axios.post('http://localhost:8080/api/v1/user/register', {
            username: formData.name,            
            email: formData.email,     
            password: formData.password,
        });

        if (data.success) {
            alert("User registered successfully!");
            navigate("/login");
        } else {
            console.error("Registration failed:", data.message);
        }
    } catch (error) {
        console.error("Error during registration:", error.response?.data || error.message);
    }
};


  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-br from-green-700 via-green-500 to-green-200">
      {/* Left Section */}
      <div className="h-[600px] w-[500px] flex flex-col justify-start items-center text-white p-8 rounded-xl shadow-lg backdrop-blur-md bg-opacity-40 border border-white/20">
        <AnimatedBoy/>
        <h1 className="text-4xl font-extrabold mb-4 text-center">Welcome Aboard!</h1>
        <h3 className="text-xl italic mb-4">"Embark on your journey of innovation and creativity."</h3>
        <p className="text-center text-lg leading-relaxed">
          Join our vibrant developer community, where ideas take flight, knowledge is shared, and stories inspire the future.
        </p>
      </div>

      {/* Right Section */}
      <div className="h-[600px] w-[500px] flex flex-col justify-start items-center bg-green-50 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-green-700 mb-4">CREATE ACCOUNT</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-row items-center border-b-2 border-green-300 py-2 mb-4">
            <IoPerson size={24} className="text-green-600 mr-2" />
            <input
              type="text"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center border-b-2 border-green-300 py-2 mb-4">
            <MdEmail size={24} className="text-green-600 mr-2" />
            <input
              type="email"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center border-b-2 border-green-300 py-2 mb-4">
            <FaLock size={24} className="text-green-600 mr-2" />
            <input
              type="password"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center border-b-2 border-green-300 py-2 mb-6">
            <FaLock size={24} className="text-green-600 mr-2" />
            <input
              type="password"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-bold text-lg hover:bg-green-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">Already have an account?</p>
          <Link to="/Login">
            <button className="text-green-700 underline font-semibold mt-2 hover:text-green-800 transition">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
