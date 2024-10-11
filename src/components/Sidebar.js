import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaSearch, FaUserFriends, FaUserPlus } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import logo from "../assets/Game-Mate-Logo.png";
import { CgProfile } from "react-icons/cg";
import { SlLogin } from "react-icons/sl";

export const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const userCredentials = localStorage.getItem("userCredentials");

  const handleLogOut = () => {
    localStorage.removeItem("userCredentials");
    window.location.reload();
  };

  useEffect(() => {
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );
    console.log("stored Cred-->", storedCredentials);

    const emailFromCredentials = storedCredentials?.email || email;

    if (emailFromCredentials) {
      // console.log(emailFromCredentials);
      fetchUserName(emailFromCredentials);
    }
  });

  const fetchUserName = async (email) => {
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      if (response.ok) {
        // console.log(response);
        const data = await response.json();
        setUserName(data.userName);
        console.log(userName);
      } else {
        console.log("Error Fetching UserName");
      }
    } catch (error) {
      console.error("Error fetching user Name:", error);
    }
  };

  const handleLoginClick = () => {
    if (userCredentials) {
      navigate("/profile", {
        state: { email: JSON.parse(userCredentials).email },
      });
    } else {
      navigate("/login");
    }
  };

  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/allgames",
      name: "All Games",
      icon: <FaGamepad />,
    },
    // {
    //   path: "/addgames",
    //   name: "Add Games",
    //   icon: <FaGamepad />,
    // },
    {
      path: "/friends",
      name: "Friends",
      icon: <FaUserFriends />,
    },
    {
      path: "/addfriends",
      name: "Add Friends",
      icon: <FaUserPlus />,
    },
    // {
    //   path: "/insatll",
    //   name: "Installed Games",
    //   icon: <FaDownload />,
    // },
    // {
    //   path: "/faqs",
    //   name: "FAQs",
    //   icon: <FaQuestionCircle />,
    // },
    {
      path: "/profile",
      name: "Profile",
      icon: <CgProfile className="-ml-1" />,
    },
  ];

  return (
    <div className="fixed hidden lg:flex z-10">
      <div className="min-h-screen w-80 text-white bg-custom-gradient h-screen">
        <div className="flex justify-center items-center py-4">
          <img
            src={logo}
            alt="Game Mate"
            className="h-12"
            onClick={() => navigate("/home")}
            style={{
              cursor: "pointer",
            }}
          />
        </div>

        <div class="flex items-center space-x-2 bg-black p-4 rounded-lg border border-t-0 border-r-0 border-l-0 ml-6 mr-6 mb-4">
          <div class="bg-custom-gray p-2 rounded mr-8">
            <FaSearch className="" />
          </div>
          <div className="text-lg font-medium">Explore</div>
        </div>

        <div className="px-6 py-2 text-gray-400 text-xs">Navigate</div>

        <div className="navigate px-4">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={`flex items-center ${
                location.pathname === item.path ? "text-white" : "text-gray-400"
              } hover:text-white py-2 px-2 mb-1`}
            >
              <div className="mr-3 text-xl">{item.icon}</div>
              <div className="text-md">{item.name}</div>
            </NavLink>
          ))}
        </div>

        <div
          className="absolute bottom-4 left-4 w-[280px] flex items-center py-2 border-t border-gray-700"
          onClick={handleLoginClick}
        >
          {userName ? (
            <>
              <div className="flex items-center space-x-2">
                <CgProfile className="h-6 w-6 mr-2" />
                <div>
                  <div className="text-white font-semibold">{userName}</div>
                  <div className="text-xs text-gray-400">Bio/AIR</div>
                </div>
                <div className="relative">
                  <div className="bg-green-500 rounded-full h-3 w-3 border-2 border-gray-700 animate-flicker"></div>
                </div>
              </div>
              <button
                className=" ml-28 text-sm text-red-500 hover:text-red-700"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <SlLogin className="h-6 w-6 mr-2" />
              <div>
                <div className="text-white font-semibold">Login/SignUP</div>
                <div className="text-xs text-gray-400">Bio/AIR</div>
              </div>
            </>
          )}
        </div>
      </div>
      <main className="main-content flex-1 p-4">{children}</main>
    </div>
  );
};
