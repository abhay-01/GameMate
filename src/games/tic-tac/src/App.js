import { useEffect, useState } from "react";
import "./App.css";
import Square from "./square/Square";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function App() {
  const location = useLocation();
  const [gameState, setGameState] = useState(renderFrom);
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [finishedstate, setFinishedState] = useState(false);
  const [finishedArrayState, setFinishedArrayState] = useState([]);
  const [playOnline, setPlayonline] = useState(false);
  const [socket, setsocket] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [playingAs, setPlayingAs] = useState(null);

  const getQueryParams = (query) => {
    
    return new URLSearchParams(query);
  };

  const checkWinner = () => {
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2] &&
        gameState[row][0] !== null
      ) {
        setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }

    for (let col = 0; col < gameState.length; col++) {
      if (
        gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col] &&
        gameState[0][col] !== null
      ) {
        setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
        return gameState[0][col];
      }
    }

    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
      return gameState[0][0];
    }
    if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]
    ) {
      return gameState[0][2];
    }

    const isDrawMatch = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") return true;
    });
    if (isDrawMatch) return "draw";
    return null;
  };

  useEffect(() => {
    const winner = checkWinner();
    const queryParams = getQueryParams(location.search);
    const emailFromQuery = queryParams.get("email"); // Get email from query params
    console.log("Email from query", emailFromQuery);

    if (winner) {
      setFinishedState(winner);

      let result;
      if (winner === playingAs) {
        result = "win";
      } else if (winner !== "draw") {
        result = "loss";
      }

      if (result) {
        console.log("Game over, result:", result);
        const saveFinalResults = async () => {
          try {
            const response = await fetch("https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/finalResults", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: playerName,
                result: result,
              }),
            });

            if (!response.ok) {
              throw new Error("Failed to save final results");
            }

            console.log("Final results saved successfully");
             window.location.href = `http://localhost:3000/home?email=${playerName}`;

          } catch (error) {
            console.error("Error saving final results:", error);
          }
        };

        saveFinalResults();
      }
    }
  }, [gameState, playingAs, playerName]);

  const takePlayerName = async () => {
    const result = await Swal.fire({
      title: "Enter your name",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    return result;
  };

  useEffect(() => {
    if (playOnline && opponentName) {
      const createMatch = async () => {
        try {
          const response = await fetch("https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/createMatch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email1: playerName,
              email2: opponentName,
              game: "tic-tac-toe",
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create match");
          }

          const data = await response.json();
          console.log("Match created successfully:", data.message);
        } catch (error) {
          console.error("Error creating match:", error);
        }
      };

      createMatch();
    }
  }, [playOnline, opponentName, playerName]);

  socket?.on("playerMoveFromServer", (data) => {
    setGameState((prevState) => {
      const id = data.state.id;
      let newState = [...prevState];
      const rowIndex = Math.floor(id / 3);
      const colIndex = id % 3;
      newState[rowIndex][colIndex] = data.state.sign;
      console.log(newState);
      return newState;
    });
    setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");
  });

  socket?.on("connect", function () {
    setPlayonline(true);
  });

  socket?.on("OpponentNotfound", function () {
    setOpponentName(false);
  });

  socket?.on("Opponentfound", function (data) {
    setOpponentName(data.opponentName);
    setPlayingAs(data.playingAs);
  });

  async function playOnlineClick() {
    const result = await takePlayerName();
    console.log(result);

    if (!result.isConfirmed) {
      return;
    }

    const username = result.value;
    setPlayerName(username);

    const newSocket = io("https://tic-tac-server-kidq.onrender.com", {
      autoConnect: true,
    });

    newSocket?.emit("request_to_play", {
      playerName: username,
    });
    setsocket(newSocket);
  }

  if (!playOnline) {
    return (
      <div className="main-div">
        <button onClick={playOnlineClick} className="play">
          Play Online
        </button>
      </div>
    );
  }

  if (playOnline && !opponentName) {
    return (
      <div className="waiting">
        <p>Waiting for opponent....</p>
      </div>
    );
  }

  return (
    <div className="main-div">
      <div className="move-detection">
        <div
          className={`left ${
            currentPlayer === playingAs ? "current-move-" + currentPlayer : ""
          }`}
        >
          {playerName}
        </div>
        <div
          className={`right ${
            currentPlayer !== playingAs ? "current-move-" + currentPlayer : ""
          }`}
        >
          {opponentName}
        </div>
      </div>
      <div>
        <h1 className=" heading title">Tic Tac Toe</h1>
        <div className="square-wrapper">
          {gameState.map((arr, rowIndex) => {
            return arr.map((e, colIndex) => {
              return (
                <Square
                  socket={socket}
                  playingAs={playingAs}
                  gameState={gameState}
                  finishedstate={finishedstate}
                  finishedArrayState={finishedArrayState}
                  currentPlayer={currentPlayer}
                  setCurrentPlayer={setCurrentPlayer}
                  setGameState={setGameState}
                  id={rowIndex * 3 + colIndex}
                  key={rowIndex * 3 + colIndex}
                  currentElement={e}
                />
              );
            });
          })}
        </div>
        {finishedstate && finishedstate !== "draw" && (
          <h3 className="finished-state">
            {finishedstate === playingAs ? "You" : finishedstate} won the game
          </h3>
        )}
        {finishedstate && finishedstate === "draw" && (
          <h3 className="finished-state">It's a draw</h3>
        )}
      </div>
      {!finishedstate && opponentName && (
        <h2>You are playing against {opponentName} </h2>
      )}
    </div>
  );
}

export default App;
