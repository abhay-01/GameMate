import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCog,
  FaDownload,
  FaHome,
  FaQuestionCircle,
  FaSearch,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import logo from "../assets/Game-Mate-Logo.png"; // Add your logo image
import userProfileImage from "../assets/boy.png"; // Add a placeholder profile image

export const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
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
    {
      path: "/addgames",
      name: "Add Games",
      icon: <FaGamepad />,
    },
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
    {
      path: "/insatll",
      name: "Installed Games",
      icon: <FaDownload />,
    },
    {
      path: "/invite",
      name: "Settings",
      icon: <FaCog />,
    },
    {
      path: "/faqs",
      name: "FAQs",
      icon: <FaQuestionCircle />,
    },
  ];

  return (
    <div className="fixed flex">
<div className="min-h-screen w-[300px] text-white bg-custom-gradient h-screen">
        <div className="flex justify-center items-center py-4">
          <img src={logo} alt="Game Mate" className="h-12" />
        </div>

        <div class="flex items-center space-x-2 bg-black p-4 rounded-lg border border-t-0 border-r-0 border-l-0 ml-6 mr-6 mb-4">
        <div class="bg-custom-gray p-2 rounded mr-8">
        <FaSearch className="" />
        </div>
        <div className="text-lg font-medium">Explore</div>
        </div>

        <div className="px-6 py-2 text-gray-400 text-xs">
          Navigate
        </div>

        <div className="navigate px-4">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link flex items-center text-gray-400 hover:text-white py-2 px-2 mb-1"
              activeClassName="text-white"
            >
              <div className="icon mr-3 text-xl">{item.icon}</div>
              <div className="link_text text-md">{item.name}</div>
            </NavLink>
          ))}
        </div>

        <div className="absolute bottom-4 left-4 w-[280px] flex items-center py-2 border-t border-gray-700" onClick={handleLoginClick}>
          <img
            src={userProfileImage}
            alt="User Profile"
            className="h-10 w-10 rounded-full mr-2"
          />
          <div>
            <div className="text-white font-semibold">Login/SignUP</div>
            <div className="text-xs text-gray-400">Bio/AIR</div>
          </div>
        </div>
      </div>
      <main className="main-content flex-1 p-4">{children}</main>
    </div>
  );
};
