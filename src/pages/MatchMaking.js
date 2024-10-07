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
    query: { email: "test2" },
  }
);

const Matchmaking = () => {
  const location = useLocation();

  const [friendEmail, setFriendEmail] = useState("test2");
  const [selectedGame, setSelectedGame] = useState("chess");
  const [myEmail, setMyEmail] = useState("");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [player1Stake, setPlayer1Stake] = useState(0);
  const [player2Stake, setPlayer2Stake] = useState(0);
  const [opponentName, setOpponentName] = useState("null");
  const [gameUrl, setGameUrl] = useState("");

  // const game_url = location.state?.gameUrl;
  // setGameUrl(game_url);

  const handleStakeChange = (player, value) => {
    const stakeValue = parseInt(value, 10) || 0;
    if (player === 1) {
      setPlayer1Stake(stakeValue);
    } else {
      setPlayer2Stake(stakeValue);
    }
  };

  const handleConfirmStake = (player) => {
    console.log(
      `Player ${player} staked: ${
        player === 1 ? player1Stake : player2Stake
      } coins`
    );
  };

  useEffect(() => {
    const friendName = location.state?.friendName;
    const gameUrl = location.state?.gameUrl;
    const email = location.state?.email;

    setMyEmail(email);
    setGameUrl(gameUrl);
    setOpponentName(friendName);
  
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

    socket.on("redirect", (data) => {
      console.log("redir", data);
    });

    socket.on("gameStatus", (data) => {
      console.log("Game status received:", data);
    });

    // Parsing URL parameters
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
  }, []);

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
        console.log("Matchmaking initiated successfully",myEmail, friendEmail, gameUrl, selectedGame);
        // console.log("SENDER MAIL-->", myEmail);
        // console.log("TARGET MAIL-->", friendEmail);
        // console.log("URL-->", gameUrl);
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

  const fetchResults = async () => {
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
      response = await response.json();

      if (response[0].winner === myEmail) {
        setResult("win");
        setShowResult(true);
      } else {
        setResult("lose");
        setShowResult(true);
      }
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

  return (
    <div>
      <div
        style={{
          overflowY: "auto",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
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
          {/* Matchmaking UI */}
          <div className="flex p-2 pl-8 mb-4">
            <div className="flex flex-col border border-white w-[300px] h-[330px] m-2 m-r-2 rounded-lg p-10 pt-9">
              <div className="flex justify-center items-center">
                <img src={boy} alt="Boy" className="w-[55px] h-[55px]" />
              </div>
              <div className="flex flex-col justify-center items-center p-5">
                <span className="text-2xl font-bold">Sandhya Gupta</span>
                <span className="text-gray-500 pt-0">BIO/AIR</span>
              </div>
              <div className=" pl-16">
              <Coin />
              </div>

              <div className="flex flex-col items-center mt-4">
                <input
                  type="number"
                  value={player1Stake}
                  onChange={(e) => handleStakeChange(1, e.target.value)}
                  className="w-20 text-center bg-gray-800 text-white rounded-md"
                  placeholder="Coins"
                />
                <button
                  onClick={() => handleConfirmStake(1)}
                  className="bg-orange-500 w-20 h-8 rounded-lg mt-2"
                >
                  STAKE
                </button>
              </div>
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

            <div className="flex flex-col border border-white w-[300px] h-[330px] m-2 m-r-2 rounded-lg p-10 pt-9 -ml-5">
              <div className="flex justify-center items-center">
                <img src={boy} alt="Boy" className="w-[55px] h-[55px]" />
              </div>
              <div className="flex flex-col justify-center items-center p-5">
                <span className="text-2xl font-bold">
                  {opponentName !== null ? `${opponentName}` : "TEST"}
                </span>
                <span className="text-gray-500 pt-0">BIO/AIR</span>
              </div>
              <div className=" pl-16">
              <Coin />
              </div>
              

              <div className="flex flex-col items-center mt-4">
                <input
                  type="number"
                  value={player2Stake}
                  onChange={(e) => handleStakeChange(2, e.target.value)}
                  className="w-20 text-center bg-gray-800 text-white rounded-md"
                  placeholder="Coins"
                />
                <button
                  onClick={() => handleConfirmStake(2)}
                  className="bg-orange-500 w-20 h-8 rounded-lg mt-2"
                >
                  STAKE
                </button>
              </div>
            </div>
          </div>

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

          {/*DISPLAY GAME RESULT*/}

          {showResult && (
            <div className="game-result">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
                <h2 className="text-2xl font-bold mb-2">Game Over</h2>
                {result === "win" ? (
                  <p className="text-lg">Congratulations! You won the game.</p>
                ) : (
                  <p className="text-lg">
                    Sorry, you lost the game. Better luck next time!
                  </p>
                )}
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleStatus()}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matchmaking;
