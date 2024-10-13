import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const useGameLogic = (userEmail, friendName, friendEmail) => {
  const navigate = useNavigate();

  const [myEmail, setMyEmail] = useState("");

  const startChessServer = () => {
    if (friendName) {
      navigate("/matchmaking", {
        state: {
          friendName: friendName,
          gameUrl: "https://chess-26tz.onrender.com/",
          email: userEmail,
          friendEmail: friendEmail,
        },
      });
    } else {
      navigate("/friends", {
        state: {
          email: userEmail,
          gameUrl: "https://chess-26tz.onrender.com/",
          friendEmail: friendEmail,
        },
      });
    }
  };

  const openGeography = async () => {
    // Retrieve the email directly from local storage, if not provided as a prop
    let emailForUrl = userEmail;
    if (!emailForUrl) {
      const storedCredentials = JSON.parse(
        localStorage.getItem("userCredentials")
      );
      if (storedCredentials && storedCredentials.email) {
        emailForUrl = storedCredentials.email;
        console.log("User email retrieved from local storage:", emailForUrl);
      } else {
        console.error("No email found in local storage");
        return; // Stop execution if no email is found
      }
    }

    try {
      console.log("Creating match for Geography Quiz..." + emailForUrl);
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/createSoloMatch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailForUrl,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Match created:", data);
      } else {
        console.error("Failed to create match:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
    }

    console.log("Opening Geography Quiz with email: " + emailForUrl);
    const url = "https://geography-classes.netlify.app?email=" + emailForUrl;
    window.open(url, "_blank");
  };

  const openTicTacToe = () => {
    if (friendName) {
      navigate("/matchmaking", {
        state: {
          friendName: friendName,
          gameUrl: "https://salmon-bay-02f093e00.5.azurestaticapps.net",
          email: userEmail,
          friendEmail: friendEmail,
        },
      });
    } else {
      navigate("/friends", {
        state: {
          email: userEmail,
          gameUrl: "https://salmon-bay-02f093e00.5.azurestaticapps.net",
          friendEmail: friendEmail,
        },
      });
    }
  };

  const openMemory = () => {
    alert("Memory Game is coming soon!");
  };

  return { startChessServer, openGeography, openTicTacToe, openMemory };
};
