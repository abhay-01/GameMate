import React from "react";
import { FaTimes, FaGem } from "react-icons/fa";

const PopUp = ({ winner, show, handleClose }) => {
  if (!show || !winner) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
      <div className="relative text-center p-8 w-[992.818px] h-[653.747px] flex-shrink-0 rounded-[32.525px] bg-[radial-gradient(circle,rgba(128,0,128,1)_0%,rgba(0,0,0,1)_70%)]">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded flex items-center"
        >
          <FaTimes />
        </button>

        <h2 className="mb-4 text-white font-poppins text-[84px] font-bold uppercase">
          {winner === "Win" ? "Congratulations!" : "Bad Luck Next Time!"}
        </h2>
        <p className="mb-6 text-[#FA8305] font-poppins text-[64px] font-bold uppercase">
          {winner === "Win" ? "You Won" : "You Lost"}
        </p>

        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center rounded bg-orange-600 w-[80px] mx-auto sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px]">
            {winner === "Win" ? "+ 500 Coins" : "- 500 Coins"}
          </div>
          <div className="flex items-center mt-8">
            <div className="flex justify-center items-center rounded-full w-12 h-12">
              <FaGem className="text-white" size="2x" />
            </div>
            <div className="ml-3 flex flex-col text-white">
              <span className="text-xs font-light">Coins</span>
              <span className="text-lg font-bold">00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
