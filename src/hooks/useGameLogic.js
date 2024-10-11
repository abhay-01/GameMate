import { useNavigate } from "react-router-dom";

export const useGameLogic = (userEmail, friendName) => {
  const navigate = useNavigate();

  const startChessServer = () => {
    if (friendName) {
      navigate("/matchmaking", {
        state: {
          friendName: friendName,
          gameUrl: "https://chess-gamemate.onrender.com",
          email: userEmail,
        },
      });
    } else {
      navigate("/friends", {
        state: {
          email: userEmail,
          gameUrl: "https://chess-gamemate.onrender.com",
        },
      });
    }
  };

  const openGeography = async () => {
    const email = userEmail;
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/createSoloMatch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
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
    const url = `https://geography-classes.netlify.app?email=${userEmail}`;
    window.open(url, "_blank");
  };

  const openTicTacToe = () => {
    if (friendName) {
      navigate("/matchmaking", {
        state: {
          friendName: friendName,
          gameUrl:
            "https://tic-tac-kpqi.onrender.com/",
          email: userEmail,
        },
      });
    } else {
      navigate("/friends", {
        state: {
          email: userEmail,
          gameUrl:
            "https://tic-tac-kpqi.onrender.com/",
        },
      });
    }
  };

  const openMemory = () => {
    alert("Memory Game is coming soon!");
  };

  return { startChessServer, openGeography, openTicTacToe, openMemory };
};
