import React, { useState } from "react";
import bg from "../assets/bg.svg";
import { FaGem, FaSearch, FaChevronDown } from "react-icons/fa";
import boy from "../images/boy.png";
import cross from "../assets/cross.png";

function Profile() {
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
    <div>
      <div
        style={{
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "black",
          color: "white",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{ padding: "20px", textAlign: "center" }}
          className="flex items-center justify-between p-4 border-b border-white border-opacity-35  ml-9"
        >
          <input
            type="text"
            placeholder="Search for games..."
            className="w-8/12 py-2 pl-6 border  rounded-md text-[16px] bg-transparent px-2"
          />

          <div className="flex items-center space-x-6 ">
            <div className="flex items-center mr-4">
              <div className="flex justify-center items-center bg-gray-800 rounded-full w-8 h-8">
                <FaGem className="text-white" />
              </div>
              <div className="ml-0 flex flex-col text-white">
                <span className="text-xs font-light">Coins</span>
                <span className="text-sm font-bold">00</span>
              </div>
            </div>

            <div className="relative ml-6">
              <button
                className="flex items-center bg-gray-800 text-white py-1 px-3 rounded-full"
                onClick={toggleDropdown}
              >
                {language} <FaChevronDown className="ml-1" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg">
                  <button
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleLanguageChange("ENG")}
                  >
                    English
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleLanguageChange("HIN")}
                  >
                    Hindi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col justify-center items-center   pl-10 flex-1`}
          style={{
            width: "100%",
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col p-4 w-full">
            <h1 className="text-xl self-start font-bold  text-white p-2 pl-8 ">
              Profile
            </h1>
            <div className="flex flex-col items-center  p-2 pl-8 mb-4">
              <div className="flex flex-col items-center   m-2 m-r-2 rounded-lg p-10  ">
                <div className="flex justify-center items-center p-4">
                  <img src={boy} alt="Boy" className="w-[90px] h-[90px]" />
                </div>

                <div className="flex items-center gap-x-4 justify-center mr-4 pt-0">
                  <div className="flex justify-center items-center border-8 border-[#56585A]  p-2 rounded-full  ">
                    <FaGem className="text-white" />
                  </div>
                  <div className="ml-0 flex flex-col text-white">
                    <span className="text-xs font-light mb-0 pb-0">Coins</span>
                    <span className="text-sm font-bold">00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full justify-center items-center gap-x-4">
              <div className="gap-y-2 flex flex-col items-center">
                <div className="text-white">Win</div>
                <div className="bg-[#292b2d] rounded-md w-16 h-8"></div>
              </div>
              <img src={cross} className="w-8 h-8" />
              <div className="gap-y-2 flex flex-col items-center">
                <div className="text-white">Loose</div>
                <div className="bg-[#292b2d] rounded-md w-16 h-8"></div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center py-12 gap-y-8">
              <div className="w-11/12 grid grid-cols-2 gap-x-6 gap-y-4  place-content-between  ">
                <div className="w-full flex flex-col ">
                  <label for="firstname">First Name:</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Your First Name"
                    className="w-full py-2 border bg-[#56585A] border-none focus:outline-none focus:ring-0   rounded-md text-[16px] text-black px-2 placeholder-black"
                  />
                </div>

                <div className="w-full flex flex-col ">
                  <label for="lastname">Last Name:</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Your Last Name"
                    className="w-full py-2 border bg-[#56585A] border-none focus:outline-none focus:ring-0   rounded-md text-[16px] text-black px-2 placeholder-black"
                  />
                </div>
                <div className="w-full flex flex-col ">
                  <label for="lastname">User Id:</label>
                  <input
                    type="text"
                    id="userid"
                    name="userid"
                    placeholder="Your User Id"
                    className="w-full py-2 border bg-[#56585A] border-none focus:outline-none focus:ring-0   rounded-md text-[16px] text-black px-2 placeholder-black"
                  />
                </div>
                <div className="w-full flex flex-col ">
                  <label for="lastname">Email Id:</label>
                  <input
                    type="text"
                    id="emailid"
                    name="emailid"
                    placeholder="Your Email Id"
                    className="w-full py-2 border bg-[#56585A] border-none focus:outline-none focus:ring-0   rounded-md text-[16px] text-black px-2 placeholder-black"
                  />
                </div>
              </div>
              <div className="w-11/12 flex flex-col items-start gap-y-8">
                <div className="font-semibold ">My email address</div>
                <label class="flex items-center space-x-2">
                <input type="checkbox" class="appearance-none w-6 h-6 border border-gray-400 rounded checked:bg-white checked:border-black focus:outline-none checked:before:content-['✓'] checked:before:text-black checked:before:block checked:before:text-center"/>
                  <span >test@gmail.com <div class="text-gray-700"> 1 month ago</div></span>
                </label>
                <buttton className="px-8 py-2 rounded-md font-bold bg-white bg-opacity-10">+ Add Email Address</buttton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
