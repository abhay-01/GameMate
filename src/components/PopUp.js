import React from "react";
import { FaTimes, FaGem } from "react-icons/fa";
import Coin from "./Coin";

const PopUp = ({ winner, show, handleClose }) => {
  if (!show || !winner) return null;

  const email = JSON.parse(localStorage.getItem("userCredentials")).email;
  

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
      <div className="relative text-center p-8 w-full max-w-[90%] h-auto flex-shrink-0 rounded-[32.525px] bg-[radial-gradient(circle,rgba(128,0,128,1)_0%,rgba(0,0,0,1)_70%)]">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded flex items-center"
        >
          <FaTimes />
        </button>

        <p className="mb-6 text-[#FA8305] font-poppins text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-bold uppercase">
        {winner === "Win" ? "Congratulations!" : "Better Luck Next Time!"}
        </p>
        <p className="mb-6 text-[#FA8305] font-poppins text-[64px] font-bold uppercase">
          {winner === "Win" ? "You Won" : "You Lost"}
        </p>

        <div className="flex flex-col items-center mb-6">
        <div className={`flex items-center justify-center rounded w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] xl:w-[140px] ${winner === "Win" ? 'bg-green-500' : 'bg-orange-600'}`}>
          {winner === "Win" ? "+ 500 Coins" : "- 500 Coins"}
        </div>
          <div className="flex items-center mt-8">
            <div className="ml-3 flex flex-col text-white">
            <Coin email={email} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
