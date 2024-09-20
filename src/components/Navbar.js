import React, { useState } from "react";
import { FaGem, FaSearch, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [language, setLanguage] = useState("ENG");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navbarStyles = {
    container: {
      height: "70px",
      marginLeft: "250px", // Sidebar width offset
      display: "flex",
      alignItems: "center",
      backgroundColor: "rgb(63, 62, 62)",
      color: "white",
      width: "calc(100% - 250px)", // Adjust width based on the sidebar
      padding: "0 32px",
      boxSizing: "border-box",
      justifyContent: "space-between",
    },
    search: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      border: "0.1px solid rgb(245, 236, 236)",
      width: "380px",
      padding: "4px 13px",
      borderRadius: "7px",
      marginRight: "auto",
    },
    searchText: {
      padding: "2px",
    },
    coin: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginLeft: "20px",
      marginRight: "20px",
    },
    coinLogo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "25px",
      height: "25px",
      borderRadius: "50%",
      backgroundColor: "#333",
      color: "white",
      fontSize: "14px",
      border: "2px solid white",
    },
    total: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    text: {
      fontSize: "12px",
    },
    digits: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    lang: {
      position: "relative",
    },
    dropdownButton: {
      background: "#070707",
      border: "none",
      color: "white",
      padding: "4px 14px",
      borderRadius: "20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    dropdownContent: {
      display: isDropdownOpen ? "flex" : "none",
      flexDirection: "column",
      position: "absolute",
      top: "100%",
      right: "0",
      backgroundColor: "#333",
      color: "white",
      minWidth: "100px",
      borderRadius: "4px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
      zIndex: 1000,
      marginTop: "4px",
    },
    dropdownItem: {
      background: "none",
      border: "none",
      color: "white",
      padding: "12px 16px",
      textAlign: "left",
      width: "100%",
      cursor: "pointer",
    },
    dropdownItemHover: {
      backgroundColor: "#575757",
    },
  };

  return (
    <div style={navbarStyles.container}>
      <div style={navbarStyles.search}>
        <FaSearch />
        <div style={navbarStyles.searchText}>Search..</div>
      </div>
      <div style={navbarStyles.coin}>
        <div style={navbarStyles.coinLogo}>
          <FaGem />
        </div>
        <div style={navbarStyles.total}>
          <div style={navbarStyles.text}>Coins</div>
          <div style={navbarStyles.digits}>00</div>
        </div>
      </div>
      <div style={navbarStyles.lang}>
        <button style={navbarStyles.dropdownButton} onClick={toggleDropdown}>
          {language} <FaChevronDown />
        </button>
        <div style={navbarStyles.dropdownContent}>
          <button
            style={navbarStyles.dropdownItem}
            onClick={() => handleLanguageChange("ENG")}
          >
            English
          </button>
          <button
            style={navbarStyles.dropdownItem}
            onClick={() => handleLanguageChange("HIN")}
          >
            Hindi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
