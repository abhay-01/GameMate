import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import allGamesIcon from '../images/AllGamesIcon.png';
import addGamesIcon from '../images/AddGamesIcon.png';
import friendsIcon from '../images/FriendsIcon.png';
import addFriendsIcon from '../images/AddFriendsIcon.png';
import profileIcon from '../images/boy.png';



const bottomItems = [
    { name: "All Games", path: "/allgames", },
    { name: "Add Games", path: "/addgames",},
    { name: "Friends", path: "/friends", },
    { name: "Add Friends", path: "/addfriends" },
    { name: "Profile", path: "/profile" },
  ];

function BottomBar() {
    const location = useLocation();
  return (
    <div className='fixed z-10 bottom-0 left-0 right-0 bg-custom-gray shadow-lg lg:hidden flex justify-around py-2'>
      {bottomItems.map((route, index) => (
        <Link key={index} to={route.path} className={`flex items-center ${
                location.pathname === route.path ? "text-white" : "text-gray-400"
              } py-2 px-2 mb-1`}>
          <div>{route.name}</div>
          <div>{route.icon}</div>
        </Link>
      ))}
    </div>
  );
}

export default BottomBar;