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

  useEffect(() => {
    const friendName = location.state?.friendName;
    const gameUrl = location.state?.gameUrl;
    const email = location.state?.email;
    const friend_email = location.state?.friendEmail;
    setFriendEmail(friend_email);

    

    setMyEmail(email);
    setGameUrl(gameUrl);
    setOpponentName(friendName);

    fetchUsername(email);
    socket.on("accept-matchmaking", (data) => {
      if (data.url) {
        const url = data.url + `?email=${email}`;
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

    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );
    console.log(storedCredentials);
    return () => {
      socket.off("accept-matchmaking");
    };
  }, [location.state]);

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

        // Check if data and winner are defined before proceeding
        if (data && data.length > 0 && data[0].winner) {
          if (data[0].winner === myEmail) {
            setResult("win");
          } else {
            setResult("lose");
          }
          setShowResult(true);
        } else {
          console.log("No result data available yet.");
          setShowResult(false); // Hide result display if no valid data
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
            email: email,
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

  // Countdown timer logic
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
          height: "100vh",
          width: "100%",
        }}
      >
        <div
          className={`flex flex-col justify-center items-center pl-10 flex-1`}
          style={{
            width: "100%",
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
          <div className="flex p-2 pl-8 mb-4">
            <div className="flex flex-col border border-white w-[300px] h-[330px] m-2 m-r-2 rounded-lg p-10 pt-9">
              <div className="flex justify-center items-center">
                <img src={boy} alt="Boy" className="w-[55px] h-[55px]" />
              </div>
              <div className="flex flex-col justify-center items-center p-5">
                <span className="text-2xl font-bold">{myUsername}</span>
                <span className="text-gray-500 pt-0">BIO/AIR</span>
              </div>
              <div className="pl-16">
                <Coin />
              </div>
              <span className="text-yellow-500 font-bold pt-2 ml-6">
                500 Coins on Stakes
              </span>
            </div>
            <div className="flex justify-center">
              <span className="text-5xl mt-20 -ml-10 text-red-600 font-rubik">
                V
              </span>
              <span className="text-7xl -ml-2 mt-20 text-red-600 font-rubik">
                /
              </span>
              <span className="text-5xl mt-28 -ml-2 text-red-600 font-rubik">
                S
              </span>
            </div>

            <div className="flex flex-col border border-white w-[300px] h-[330px] m-2 m-r-2 rounded-lg p-10 pt-9">
              <div className="flex justify-center items-center">
                <img src={boy} alt="Boy" className="w-[55px] h-[55px]" />
              </div>
              <div className="flex flex-col justify-center items-center p-5">
                <span className="text-2xl font-bold">{opponentName}</span>
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
              className="bg-yellow-400 text-black font-bold py-3 px-16 rounded-full"
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
