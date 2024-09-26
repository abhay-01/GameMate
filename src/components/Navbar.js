import React, { useState } from "react"; 
import { FaGem, FaSearch, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [language, setLanguage] = useState("ENG");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-custom-gray text-white h-[80px] flex items-center justify-between px-8 fixed top-0 left-[300px] w-[calc(100%-300px)] z-50">
      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-gray-800 px-5 py-2 rounded-full w-[400px]">
        <FaSearch className="text-lg" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-white flex-1 placeholder-gray-400"
        />
      </div>

      {/* Coins Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-lg border-2 border-white">
          <FaGem />
        </div>
        <div className="text-center">
          <span className="text-sm text-gray-400 block">Coins</span>
          <span className="text-xl font-bold">00</span>
        </div>
      </div>

      {/* Language Selector */}
      <div className="relative">
        <button
          className="bg-gray-800 py-2 px-4 rounded-full flex items-center gap-2"
          onClick={toggleDropdown}
        >
          {language} <FaChevronDown className="text-sm" />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg min-w-[100px]">
            <button
              className="block w-full text-left py-2 px-4 hover:bg-gray-600"
              onClick={() => handleLanguageChange("ENG")}
            >
              English
            </button>
            <button
              className="block w-full text-left py-2 px-4 hover:bg-gray-600"
              onClick={() => handleLanguageChange("HIN")}
            >
              Hindi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
