import React from "react";
import { games } from "../utils/Games";
import trophy from "../images/trophy.png";
import group from "../images/group.png";
import "./Home.css";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllGames = () => {
  const navigate = useNavigate();
  // const startChessServer = () => {
  //   fetch("http://localhost:3001/start-chess-server", { method: "POST" })
  //     .then((response) => response.text())
  //     .then((data) => {
  //       console.log(data);
  //       window.open("http://localhost:3001", "_blank");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       alert("Failed to start the server. Please try again.");
  //     });
  // };

  const startChessServer = () => {
    navigate("/matchmaking");
  };

  const startServer = () => {
    window.open("http://localhost:3000", "_blank");
  };

  const openGeography = async() => {
    const email = "test@gmail.com";
    try {
      // Make the POST request using fetch
      const response = await fetch("https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/createSoloMatch", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send the email in the request body
        credentials: 'include', // Include credentials like cookies if necessary
      });
  
      // Check if the response is OK
      if (response.ok) {
        const data = await response.json();
        console.log("Match created:", data);
      } else {
        console.error("Failed to create match:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
    const url = "https://geography-classes.netlify.app" + "?email=" + email;
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      {games.map((game) => (
        <div
          key={game.id}
          className="card"
          onClick={
            game.onClick === "startChessServer" ? startChessServer : startServer
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

      <div className="card" onClick={() => openGeography()}>
        <div className="image">
          <img src={group} alt="Group" />
        </div>
      </div>
    </div>
  );
};

export default AllGames;
