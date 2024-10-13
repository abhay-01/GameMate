import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SoloGamePopup = ({ email, show, winner }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  let tempEmail;

  useEffect(() => {
    if (show === true) {
      setShowPopup(true);
    }

    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );

    if (storedCredentials && storedCredentials.email) {
      tempEmail = storedCredentials.email;
    }
  }, [show]);

  if (!showPopup || !winner) return null; // Check showPopup instead of show

  console.log("Winner", winner);

  const handleSoloClose = async () => {
    setShowPopup(false);
    console.log("Closing Solo Game", tempEmail);

    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/updateSoloStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: tempEmail }),
        }
      );

      if (response.ok) {
        // Remove email from the URL
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete("matchResult"); // This removes the email query parameter
        window.history.replaceState(null, "", currentUrl.toString()); // Update the URL without reloading the page
        navigate("/home");
      } else {
        console.log("Failed to update match status");
      }
    } catch (error) {
      console.error("Error in closing match", error);
    }
  };

  return (
    showPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="relative text-center p-6 w-[500px] h-[350px] rounded-[20px] bg-[radial-gradient(circle, rgba(128,0,128,1)_0%, rgba(0,0,255,1)_70%)]">
          <h2 className="mb-4 text-white font-poppins text-[40px] font-bold uppercase">
            Solo Game Result
          </h2>

          <h1 className="text-[40px] font-bold text-center mb-5">
            {winner === "Win"
              ? "You Won!"
              : winner === "Lost"
              ? "You Lost!"
              : "Loading..."}
          </h1>

          <div className="flex justify-center">
            <button
              className="text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleSoloClose} // Removed email from the function call
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SoloGamePopup;
