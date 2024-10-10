import React, { useEffect,useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import Coin from "./Coin";

const Navbar = () => {
  const [language, setLanguage] = useState("ENG");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );

    if (storedCredentials?.email) {
      setEmail(storedCredentials.email);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-custom-gray text-white h-[90px] hidden lg:flex items-center justify-between px-8 fixed top-0 lg:left-[300px] lg:w-[calc(100%-300px)] z-50">
      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-black px-5 py-3 rounded-md border border-gray-400 w-[732px] h-[65x]">
        <FaSearch className="text-base" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none text-white flex-1 placeholder-gray-400"
        />
      </div>

      {/* Coins Section */}
      <div className="pl-20 mr-14">
        <Coin email={email} />
      </div>

      {/* Language Selector */}
      <div className="relative right-[40px]">
        <button
          className="bg-black py-2 px-4 rounded-full flex items-center gap-2"
          onClick={toggleDropdown}
        >
          {language} <FaChevronDown className="text-sm text-custom-purple" />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 bg-custom-gray text-white rounded-md shadow-lg min-w-[100px]">
            <button
              className="block w-full text-md py-2 px-4 hover:bg-gray-600"
              onClick={() => handleLanguageChange("ENG")}
            >
              English
            </button>
            <button
              className="block w-full text-md py-2 px-4 hover:bg-gray-600"
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
