import React from "react";

const DrawCard = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">It's a Draw!</h2>
        <p className="text-lg mb-4 text-center">
          Both players played their best! This game ends in a draw.
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawCard;
