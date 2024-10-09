import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import allGamesIcon from '../images/AllGamesIcon.png';
import addFriendsIcon from '../images/AddFriendsIcon.png';
import profileIcon from '../images/boy.png';
import { IoMdHome } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { CgGames } from "react-icons/cg";
import { GiThreeFriends } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";




const bottomItems = [
    { name: "Home", path: "/home", icon: <IoMdHome className="h-6 w-6" /> },
    { name: "All Games", path: "/allgames", icon: <CgGames className="h-6 w-6" /> },
    { name: "Friends", path: "/friends", icon: <FaUserFriends className="h-6 w-6" />},
    { name: "Add Friends", path: "/addfriends", icon: <GiThreeFriends className="h-6 w-6" /> },
    { name: "Profile", path: "/profile", icon: <CgProfile className="h-6 w-6" /> },
  ];

function BottomBar() {
    const location = useLocation();
  return (
    <div className='fixed z-10 bottom-0 left-0 right-0 bg-custom-gray shadow-lg lg:hidden flex justify-around '>
      {bottomItems.map((route, index) => (
        <Link key={index} to={route.path} className={`flex flex-col items-center ${
                location.pathname === route.path ? "text-white" : "text-gray-400"
              } py-2 mb-1`}>
          {/* <img src={route.icon} alt={route.name} className={`h-5 w-6 mb-1 `} /> */}
          <div className={``}>{route.icon}</div>
          <div className='text-xs'>{route.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default BottomBar;