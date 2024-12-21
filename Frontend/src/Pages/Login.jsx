import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { BrowserRouter as Router, Link,useNavigate } from "react-router-dom";
import AnimatedBoy from "../components/Animatedboy";
import axios from "axios";
import {useDispatch} from "react-redux";
import { authActions } from "../redux/Store";

function App() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        const { data } = await axios.post('http://localhost:8080/api/v1/user/login', {           
            email: formData.email,     
            password: formData.password,
        });

        if (data.success) {
          localStorage.setItem("userId",data?.user._id);
          dispatch(authActions.login())
            alert("User Login successfully!");
            navigate("/Home");
        } else {
            alert("Login failed:", data.message);
        }
    } catch (error) {
        console.error("Error during registration:", error.response?.data || error.message);
    }
};

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-br from-[#8cecef] via-[#20cd31] to-green-500">
      {/* Left Section with Animated Boy and Welcome Message */}
      <div className="h-[600px] w-[500px] flex flex-col justify-start items-center text-white p-8 rounded-xl shadow-lg backdrop-blur-md bg-opacity-30 border border-white/20">
        <AnimatedBoy />
        <h1 className="text-4xl font-extrabold mb-4 text-center">Welcome Back, Developer!</h1>
        <h3 className="text-xl italic mb-4">"Dearly missed, like a crucial semicolon in code."</h3>
        <p className="text-center text-lg leading-relaxed">
          Dearly missed, like a vital semicolon completing perfect code, you’re the heart of my developers' blogging
          journey. Your influence inspires innovation, shaping ideas into impactful stories.
        </p>
      </div>

      {/* Right Section with Login Form */}
      <div className="h-[600px] w-[500px] flex flex-col justify-start items-center bg-white p-8 rounded-xl shadow-lg">
        {/* Centered Icon and User text */}
        <div className="flex justify-center items-center flex-col mb-4">
          <IoPerson size={60} className="text-green-500" />
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-green-600 mb-4">USER LOGIN</h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Email Input */}
          <div className="flex flex-row items-center border-b-2 border-gray-300 py-2 mb-4">
            <MdEmail size={24} className="text-green-500 mr-2" />
            <input
              type="email"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-row items-center border-b-2 border-gray-300 py-2 mb-6">
            <FaLock size={24} className="text-green-500 mr-2" />
            <input
              type="password"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md font-bold text-lg hover:bg-green-600 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an Account?</p>
          <Link to="/Register">
            <button className="text-green-500 underline font-semibold mt-2 hover:text-green-600 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;