import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import bg from "../assets/bg.svg";
import boy from "../images/boy.png";
import Coin from "../components/Coin";

const socket = io(
  "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/",
  {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  }
);

const Matchmaking = () => {
  const location = useLocation();

  const [friendEmail, setFriendEmail] = useState("");
  const [selectedGame, setSelectedGame] = useState("chess");
  const [myEmail, setMyEmail] = useState("");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [opponentName, setOpponentName] = useState("null");
  const [gameUrl, setGameUrl] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [myUsername, setMyUsername] = useState("");

  const friendName = location.state?.friendName;
  const game_Url = location.state?.gameUrl;
  const friend_email = location.state?.friendEmail;

  // Fetch email from localStorage and pass to the account API
  useEffect(() => {
    const storedCredentials = JSON.parse(localStorage.getItem("userCredentials"));
    if (storedCredentials && storedCredentials.email) {
      setMyEmail(storedCredentials.email);
      fetchUsername(storedCredentials.email); // Fetch username after setting email
    } else {
      console.error("No email found in local storage");
    }
  }, []);

  // Fetch the userName from the server using the email
  const fetchUsername = async (email) => {
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMyUsername(data.userName);
      } else {
        console.error("Failed to fetch username");
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  useEffect(() => {
    setFriendEmail(friend_email);
    setGameUrl(game_Url);
    setOpponentName(friendName);
  
    // Listen for accept-matchmaking event
    socket.on("accept-matchmaking", (data) => {
      console.log("Matchmaking accepted by", data.url);
      
      const storedCredentials = JSON.parse(localStorage.getItem("userCredentials"));
      const storedEmail = storedCredentials?.email;
  
      if (data.url && storedEmail) {
        // Append the email as a query parameter to the game URL
        const urlWithEmail = `${data.url}?email=${storedEmail}`;
        
        // Redirect the user to the game
        window.open(urlWithEmail, "_blank");
      } else {
        console.error("URL or email missing for matchmaking");
      }
    });
  
    fetchResults();
  
    socket.on("gameOver", (data) => {
      console.log(`${data.email} has ${data.result} the game`);
    });
  
    socket.on("gameStatus", (data) => {
      console.log("Game status received:", data);
    });
  
    const params = new URLSearchParams(window.location.search);
    const resultParam = params.get("result");
  
    if (resultParam) {
      setResult(resultParam);
      setShowResult(true);
    }
  
    return () => {
      socket.off("accept-matchmaking");
    };
  }, [location.state, socket]);
  

  const startCountdown = () => {
    setIsCountingDown(true);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          setIsCountingDown(false);
          setShowAlert(true);
          setAlertMessage("Matchmaking timed out.");
          return 60;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };

  const fetchResults = async () => {
    try {
      let response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/postResults",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: myEmail,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data && data.length > 0 && data[0].winner) {
          if (data[0].winner === myEmail) {
            setResult("win");
          } else {
            setResult("lose");
          }
          setShowResult(true);
        } else {
          console.log("No result data available yet.");
          setShowResult(false);
        }
      } else {
        console.error("Failed to fetch results");
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const handleInitiateMatchmaking = async () => {
    startCountdown();
    console.log("PRESSED", myEmail, friendEmail, gameUrl, selectedGame);
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/initiate-matchmaking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: myEmail,
            target: friendEmail,
            url: gameUrl,
            type: selectedGame,
          }),
        }
      );

      if (response.ok) {
        socket.emit("matchmaking", {
          sender: myEmail,
          target: friendEmail,
          url: gameUrl,
          type: selectedGame,
        });
      } else {
        console.error("Failed to initiate matchmaking");
      }
    } catch (error) {
      console.error("Error initiating matchmaking:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundPosition: "center",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className={`flex flex-col justify-center items-center`}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Matchmaking UI */}
          <div className="flex flex-col md:flex-row p-2 mb-4 lg:pt-48">
            <div className="flex flex-col border border-white w-[300px] h-[330px] m-2 m-r-2 rounded-lg p-10 pt-9">
              <div className="flex justify-center items-center">
                <img src={boy} alt="Boy" className="w-[55px] h-[55px]" />
              </div>
              <div className="flex flex-col justify-center items-center p-5">
                <span className="text-lg md:text-2xl font-bold">{myUsername}</span>
                <span className="text-gray-500 pt-0">BIO/AIR</span>
              </div>
              <div className="pl-16">
                <Coin />
              </div>
              <span className="text-yellow-500 font-bold pt-2 ml-6">
                500 Coins on Stakes
              </span>
            </div>
            <div className="flex justify-center lg:pt-32">
              <span className="text-5xl text-red-600 font-rubik">V</span>
              <span className="text-7xl text-red-600 font-rubik">/</span>
              <span className="text-5xl mt-4 text-red-600 font-rubik">S</span>
            </div>
            <div className="flex flex-col border border-white w-[300px] h-[330px] m-2 m-r-2 rounded-lg p-10 pt-9">
              <div className="flex justify-center items-center">
                <img src={boy} alt="Boy" className="w-[55px] h-[55px]" />
              </div>
              <div className="flex flex-col justify-center items-center p-5">
                <span className="text-lg md:text-2xl font-bold">{opponentName}</span>
                <span className="text-gray-500 pt-0">BIO/AIR</span>
              </div>
              <div className="pl-16">
                <Coin />
              </div>

              <span className="text-yellow-500 font-bold pt-2 ml-6">
                500 Coins on Stakes
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center mt-4">
            <button
              onClick={handleInitiateMatchmaking}
              className="bg-yellow-400 text-black font-bold py-2 px-10 md:py-3 md:px-16 rounded-full"
              style={{
                background: "linear-gradient(to right, #FFCC00, #FF9900)",
              }}
            >
              Match
            </button>
            {isCountingDown && (
              <div className="mt-2 text-white font-bold">
                {`Time remaining: ${countdown} seconds`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchmaking;
