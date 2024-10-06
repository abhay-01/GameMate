import React from 'react';
import img1 from "../images/img1.jpeg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpeg";
import logo1 from "../images/logo1.jpeg";
import logo2 from "../images/logo2.jpeg";
import logo3 from "../images/logo3.png";
import trophy from "../images/trophy.png";
import group from "../images/group.png";
import { FaArrowRight } from "react-icons/fa";

//Make Only Card Component, remove the rest of the code and use that only everywhere

function Card() {
  return (
    <div>
        <div className="p-5">
        <div className="text-2xl font-bold mb-5 ml-[55px] ">
          Upcoming Matches
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 py-4 gap-x-10 gap-y-8">
          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img1} alt="Game 1" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo1} alt="Logo 1" className="w-10 h-10 mr-2" />
              Call Of Duty
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Call Of Duty WarZone Mobile</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹28k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white cursor-pointer" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img2} alt="Game 2" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo2} alt="Logo 2" className="w-10 h-10 mr-2" />
              Apex Of Legend
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Apex Of Legend Royal Battle</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹44k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img3} alt="Game 3" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo3} alt="Logo 3" className="w-10 h-10 mr-2" />
              Valorant
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Valorant Multiplayer</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹29k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img1} alt="Game 1" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo1} alt="Logo 1" className="w-10 h-10 mr-2" />
              Call Of Duty
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Call Of Duty WarZone Mobile</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹28k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img2} alt="Game 2" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo2} alt="Logo 2" className="w-10 h-10 mr-2" />
              Apex Of Legend
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Apex Of Legend Royal Battle</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹44k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img3} alt="Game 3" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo3} alt="Logo 3" className="w-10 h-10 mr-2" />
              Valorant
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Valorant Multiplayer</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹29k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Card