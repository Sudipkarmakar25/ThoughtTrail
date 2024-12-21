import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import Myblogs from './Pages/Myblogs';
import Blogs from './Pages/Blogs';
import CreateBlog from './Pages/CreateBlog';
import Home from './Pages/Home';
import Footer from './components/Footer';
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#baca50dd]  to-[rgba(194,237,93,0.81)]">
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Myblogs" element={<Myblogs />} />
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/CreateBlog" element={<CreateBlog />} />
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
}
