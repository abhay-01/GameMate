import React, { useEffect, useState } from "react";
import { games } from "../utils/Games";
import trophy from "../images/trophy.png";
import group from "../images/group.png";
import "./Home.css";
import { FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const AllGames = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState("");

  // Extract email from the props passed to this page
  const email = location.state?.email;
  const friendName = location.state?.friendName;

  console.log("Friend Name:", friendName);

  const startChessServer = () => {
    navigate("/matchmaking", {
      state: {
        friendName: friendName,
        gameUrl: "http://localhost:3001",
      },
    });
  };

  const openGeography = () => {
    const email = "test@gmail.com";
    const url = "https://geography-classes.netlify.app" + "?email=" + email;
    window.open(url, "_blank");
  };

  // Add the Tic-Tac-Toe game URL along with the email as a query parameter
  const openTicTacToe = () => {
    navigate("/matchmaking", {
      state: {
        friendName: friendName,
        gameUrl: "https://tic-tac-kpqi.onrender.com",
        email: userEmail,
      },
    });
  };

  useEffect(() => {
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );

    setUserEmail(storedCredentials.email);
  }, []);

  return (
    <div className="flex justify-center items-center pl-16">
      {games.map((game) => (
        <div
          key={game.id}
          className="card"
          onClick={
            game.onClick === "startChessServer" ? startChessServer : null
          }
        >
          <div className="image">
            <img src={game.image} alt="Game" />
          </div>

          <div className="name">
            <img src={game.logo} alt="Logo" />
            {game.title}
          </div>
          <div className="text">
            <span>{game.date}</span>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
          </div>
          <div className="line">
            <hr />
          </div>

          <div className="bottom">
            <div className="first">
              <span className="win">Win Price</span>
              <div className="both">
                <img src={trophy} alt="Trophy" />
                <span>{game.winPrice}</span>
              </div>
            </div>

            <div className="first">
              <span className="win">Player Slot</span>
              <div className="both">
                <img src={group} alt="Group" />
                <span className="cost">{game.playerSlot}</span>
              </div>
            </div>

            <div className="first">
              <FaArrowRight size={5} className="arrow" />
            </div>
          </div>
        </div>
      ))}

      {/* New Card for Tic-Tac-Toe */}
      <div className="card" onClick={openTicTacToe}>
        <div className="image">
          <img src={group} alt="Group" />
        </div>
        <div className="name">
          <h2>Tic-Tac-Toe</h2>
        </div>
        <div className="text">
          <p>Play Tic-Tac-Toe with your friends!</p>
        </div>
        <div className="line">
          <hr />
        </div>
        <div className="bottom">
          <div className="first">
            <span className="win">Win Price</span>
            <div className="both">
              <img src={trophy} alt="Trophy" />
              <span>100 Coins</span>
            </div>
          </div>
          <div className="first">
            <span className="win">Player Slot</span>
            <div className="both">
              <img src={group} alt="Group" />
              <span className="cost">2 Players</span>
            </div>
          </div>
          <div className="first">
            <FaArrowRight size={5} className="arrow" />
          </div>
        </div>
      </div>

      <div className="card" onClick={() => openGeography()}>
        <div className="image">
          <img src={group} alt="Group" />
        </div>
      </div>
    </div>
  );
};

export default AllGames;
