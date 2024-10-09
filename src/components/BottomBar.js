import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import allGamesIcon from '../images/AllGamesIcon.png';
import addGamesIcon from '../images/AddGamesIcon.png';
import friendsIcon from '../images/FriendsIcon.png';
import addFriendsIcon from '../images/AddFriendsIcon.png';
import profileIcon from '../images/boy.png';



const bottomItems = [
    { name: "All Games", path: "/allgames", icon: allGamesIcon },
    { name: "Add Games", path: "/addgames", icon: addGamesIcon},
    { name: "Friends", path: "/friends", icon: friendsIcon },
    { name: "Add Friends", path: "/addfriends", icon: addFriendsIcon },
    { name: "Profile", path: "/profile", icon: profileIcon },
  ];

function BottomBar() {
    const location = useLocation();
  return (
    <div className='fixed z-10 bottom-0 left-0 right-0 bg-custom-gray shadow-lg lg:hidden flex justify-around '>
      {bottomItems.map((route, index) => (
        <Link key={index} to={route.path} className={`flex flex-col items-center ${
                location.pathname === route.path ? "text-white" : "text-gray-400"
              } py-2 mb-1`}>
          <img src={route.icon} alt={route.name} className={`h-5 w-6 mb-1 ${location.pathname === route.path ? "filter-none" : "filter grayscale"}`} />
          <div className='text-xs'>{route.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default BottomBar;