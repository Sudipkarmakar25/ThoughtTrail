import React from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { authActions } from "../redux/Store";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const isLogin = useSelector((state) => state.isLogin);
  console.log("Is User Logged In: ", isLogin);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  //logout
  const handleLogout=()=>{
    try {
      dispatch(authActions.logout())
      alert('Logout Successfully');
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="flex justify-between bg-gradient-to-r from-[#2A5815] to-[#72A15C] text-xl text-white h-[60px] font-bold font-serif">
        <div className="mt-4 font-bold size-10">ThoughtTrail</div>
        <div className="space-x-1 my-3">
          {isLogin && (
            <>
              <Link to="/Blogs">
                <button className="text-[#F7E190] px-6 py-2 rounded-lg shadow-lg hover:bg-[#527557] transition duration-200 mb-3">
                  Blogs
                </button>
              </Link>
              <Link to="/Myblogs">
                <button className="text-[#F7E190] px-6 py-2 rounded-lg shadow-lg hover:bg-[#527557] transition duration-200 mb-3">
                  My-Blogs
                </button>
              </Link>
              <Link to="/CreateBlog">
                <button className="text-[#F7E190] px-6 py-2 rounded-lg shadow-lg hover:bg-[#527557] transition duration-200 mb-3">
                  Create-Blog
                </button>
              </Link>
            </>
          )}
        </div>
        <div className="space-x-1 my-3">
          {!isLogin && (
            <>
              <Link to="/Login">
                <button className="text-black px-6 py-2 rounded-lg shadow-lg hover:bg-[#527557] transition duration-200 mb-3">
                  Login
                </button>
              </Link>
              <Link to="/Register">
                <button className="text-black px-6 py-2 rounded-lg shadow-lg hover:bg-[#527557] transition duration-200 mb-3">
                  Register
                </button>
              </Link>
            </>
          )}
          {isLogin && (
            <button onClick ={handleLogout} className="text-black px-6 py-2 rounded-lg shadow-lg hover:bg-[#527557] transition duration-200 mb-3">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
