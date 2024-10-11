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
  const email = location.state?.email;
  const friend_email = location.state?.friendEmail;

  useEffect(() => {
    // Retrieve and set the user's email from local storage during the initial mount
    const storedCredentials = JSON.parse(localStorage.getItem("userCredentials"));
    if (storedCredentials && storedCredentials.email) {
      setMyEmail(storedCredentials.email);
      console.log("User email set from local storage:", storedCredentials.email);
    } else {
      console.error("No email found in local storage");
    }
  }, []); // Empty dependency array ensures this runs only once on component mount

  useEffect(() => {
    setFriendEmail(friend_email);
    setGameUrl(game_Url);
    setOpponentName(friendName);

    fetchUsername(myEmail);

    socket.on("accept-matchmaking", (data) => {
      console.log("Matchmaking accepted by", data.url);
      const stored_email = JSON.parse(localStorage.getItem("userCredentials")).email;

      if (data.url) {
        const url = data.url + `?email=${stored_email}`;
        window.open(url, "_blank");
        stopCountdown();
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

  const handleStatus = async () => {
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/updateStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email1: myEmail,
            email2: friendEmail,
          }),
        }
      );

      if (response.ok) {
        setShowResult(false);
        console.log("Status updated successfully");
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const fetchUsername = async (myEmail) => {
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: myEmail
          }),
        }
      );

      console.log("RESPONSE USERNAME", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Username data:", data);  
        setMyUsername(data.userName);
      } else {
        console.error("Failed to fetch username");
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  useEffect(() => {
    socket.on("decline-matchmaking", (data) => {
      console.log("Matchmaking declined by", data.target);
      setAlertMessage(`Matchmaking invite declined by ${data.target}.`);
      setShowAlert(true);
      setIsCountingDown(false);
    });
    if (showAlert) {
      setIsCountingDown(false);
    }
    setTimeout(() => {
      setShowAlert(false);
      stopCountdown();
    }, 5000);
    return () => {
      socket.off("decline-matchmaking");
    };
  }, [setAlertMessage, setShowAlert]);

  useEffect(() => {
    let timer;
    if (isCountingDown && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown <= 0) {
      stopCountdown();
    }
    return () => clearInterval(timer);
  }, [isCountingDown, countdown]);

  const startCountdown = () => {
    setCountdown(60);
    setIsCountingDown(true);
  };

  const stopCountdown = () => {
    setIsCountingDown(false);
    setCountdown(0);
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
            // width: "100%",
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {showAlert && (
            <div
              style={{
                position: "absolute",
                top: "10%",
                right: "10%",
                background: "red",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              {alertMessage}
            </div>
          )}
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

          {result && (
            <div className="text-white text-center">
              {result === "win" ? (
                <p>Congrats! You won the game!</p>
              ) : (
                <p>Sorry! You lost the game.</p>
              )}
            </div>
          )}
          {/* Match Button and Timer */}
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
