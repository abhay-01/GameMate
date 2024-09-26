import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCog,
  FaDownload,
  FaHome,
  FaQuestionCircle,
  FaSearch,
  FaUserCircle,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

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
      name: "ALL Games",
      icon: <FaGamepad />,
    },
    {
      path: "/addgames",
      name: "Add games",
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
      name: "FAQS",
      icon: <FaQuestionCircle />,
    },
  ];

  return (
    <div className="container">
      <div className="sidebar" style={{ width: "250px" }}>
        <div className="top_section">
          <h1 className="logo">Logo</h1>
        </div>

        <div className="explore expanded">
          <div className="icon">
            <FaSearch />
          </div>
          <div className="explore-text">Explore</div>
        </div>

        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}

        <div className="explore expanded" onClick={handleLoginClick}>
          <div className="icon">
            <FaUserCircle size={30} />
          </div>
          <div className="explore-text">Login/SignUP</div>
        </div>
      </div>
      <main className="main-content">{children}</main>
    </div>
  );
};
