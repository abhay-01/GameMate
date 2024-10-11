import React, { useEffect, useState } from 'react';
import logo from "../assets/Game-Mate-Logo.png";
import { useNavigate } from 'react-router-dom';
import { SlLogin } from "react-icons/sl";
import { CgProfile } from 'react-icons/cg';


function TopBar() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  const handleLogOut = () => {
    localStorage.removeItem("userCredentials");
    window.location.reload();
  };
  

  useEffect(() => {
    const storedCredentials = JSON.parse(localStorage.getItem("userCredentials"));
    console.log('stored Cred-->', storedCredentials)

    const emailFromCredentials = storedCredentials?.email || email;

    if (emailFromCredentials){
      // console.log(emailFromCredentials);
      fetchUserName(emailFromCredentials)
    }
  }, [email]);

  const fetchUserName = async(email) => {
    try {
      const response = await fetch("https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/account",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email}),
      });

      if (response.ok){
        // console.log(response);
        const data = await response.json();
        setUserName(data.userName);
        console.log(userName)
      }else{
        console.log('Error Fetching UserName')
      }
    } catch(error){
      console.error("Error fetching user Name:", error);
    }
  }
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
          {userName ? (
          <div className="flex items-center space-x-2 text-white">
            <CgProfile className="h-6 w-6 mr-2" />
            <div>
            <div className="font-semibold">{userName}</div>
            <div className="text-xs text-gray-400">Bio/AIR</div>
            </div>
            <div className="relative">
              <div className="bg-green-500 rounded-full h-3 w-3 border-2 border-gray-700 animate-pulse"></div>
            </div>
            <button
              className=" ml-28 text-sm text-red-500 hover:text-red-700"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="flex items-center text-white" onClick={handleLoginClick}>
            <SlLogin className="h-6 w-6 mr-2" />
            <span>Login</span>
          </button>
        )}
    </div>
    </div>
  )
}

export default TopBar