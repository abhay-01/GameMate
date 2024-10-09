import React from 'react';
import logo from "../assets/Game-Mate-Logo.png";
import { useNavigate } from 'react-router-dom';
import { SlLogin } from "react-icons/sl";


function TopBar() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className='lg:hidden bg-black w-full fixed z-10'>
      <div className="flex items-center justify-between px-4 bg-custom-gradient">
          <img
            src={logo}
            alt="Game Mate"
            className="h-12"
            onClick={() => navigate("/home")}
            style={{
              cursor: "pointer",
            }}
          />
          <button
          className="flex items-center text-white"
          onClick={handleLoginClick}
          >
          <SlLogin className="h-6 w-6 mr-2" />
          <span>Login</span>
          </button>
    </div>
    </div>
  )
}

export default TopBar