import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const SoloGamePopup = ({ email, onClose }) => {
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch("https://your-server-url/postResults", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();
        setWinner(result.winner === email ? "win" : "loss");
      } catch (err) {
        console.log("Error fetching results:", err);
      }
    };

    if (email) {
      fetchResult();
    }
  }, [email]);

  const handleSoloResult = async () => {
    try {
      const response = await fetch("https://your-server-url/updateStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        onClose();
        const urlWithoutEmail = window.location.pathname;
        window.history.replaceState(null, "", urlWithoutEmail);
      } else {
        console.log("Failed to update solo match status");
      }
    } catch (error) {
      console.error("Error closing solo match popup:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative text-center p-6 w-[500px] h-[350px] rounded-[20px] bg-[radial-gradient(circle, rgba(128,0,128,1)_0%, rgba(0,0,255,1)_70%)]">
        <button
          className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded flex items-center"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="mb-4 text-white font-poppins text-[40px] font-bold uppercase">
          Solo Game Result
        </h2>

        <h1 className="text-[40px] font-bold text-center mb-5">
          {winner === "win" ? "You Won!" : winner === "loss" ? "You Lost!" : "Loading..."}
        </h1>

        <div className="flex justify-center">
          <button
            className="text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSoloResult}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoloGamePopup;
