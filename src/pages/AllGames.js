import React, { useState, useEffect } from "react";
import { games } from "../utils/Games";
import { useGameLogic } from "../hooks/useGameLogic";
import trophy from "../images/trophy.png";
import group from "../images/group.png";
import { FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const AllGames = () => {
  const location = useLocation();
  const [userEmail, setUserEmail] = useState("");
  const [availableGames, setAvailableGames] = useState([]);

  const email = location.state?.email;
  const friendName = location.state?.friendName;

  // Use the custom game logic hook
  const gameLogic = useGameLogic(
    userEmail,
    friendName,
    location.state?.friendEmail
  );

  useEffect(() => {
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );
    const userEmailFromStorage = storedCredentials?.email || email;
    if (userEmailFromStorage && userEmail === "") {
      setUserEmail(userEmailFromStorage);
    }

    // Get the games and pass the game logic
    const gameList = games(gameLogic); // Fetch games with logic
    if (gameList && availableGames.length === 0) {
      setAvailableGames(gameList); // Store fetched games
    }
  }, [email, friendName, gameLogic]);

  return (
    <div>
    <div className="text-2xl bg-black text-white font-bold pt-8 lg:pl-20">All Games</div>
    <div className="bg-black items-center justify-center min-h-screen flex">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-x-2 gap-y-8 lg:ml-[10vh]">
        {availableGames.map((game) => (
          <div
            key={game.id}
            className="h-[57vh]  w-[45vh] border border-white bg-[#171717] rounded-lg flex flex-col mt-5 hover:scale-105 transition-transform duration-300"
            onClick={game.onClick} // Use the correct game logic function
          >
            <div className="p-2">
              <img
                src={game.image}
                alt={game.title}
                className="w-[38vh] h-[20vh] rounded-md"
              />
            </div>

            <div className="text-white w-[13.78vh] ml-[2.67vh] -mt-[2.67vh] bg-[rgb(50,46,46)] rounded-[15px] flex text-center justify-center text-[13px] h-[24px] pt-[3px]">
              <img
                src={game.logo}
                alt={game.title}
                className="w-[1.56vh] h-[1.56vh] rounded-[3px] mt-[3px] mr-[5px]"
              />
              {game.title}
            </div>
            <div className="text-white pl-4 pt-2">
              <span className="font-poppins text-xs font-light">
                {game.date}
              </span>
              <h2 className="font-poppins text-lg font-semibold leading-[27px] pt-2 pb-2 text-left">
                {game.title}
              </h2>
              <p className="font-poppins text-xs font-light text-left">
                {game.description}
              </p>
            </div>
            <div className="line mt-3 mb-3">
              <hr className="w-[245px] ml-2.5 border-gray-300" />
            </div>

            <div className="bottom flex justify-between text-center text-white pl-3 pr-3 lg:pt-1.5 lg:pb-1.5">
              <div className="flex flex-col">
                <span className="text-white opacity-50">Win Price</span>
                <div className="flex">
                  <img
                    src={trophy}
                    alt="Trophy"
                    className="h-[20px] w-[20px]"
                  />
                  <span className="text-[16px] pl-[3px]">{game.winPrice}</span>
                </div>
              </div>

              <div className="">
                <span className="text-white opacity-50">Player Slot</span>
                <div className="flex">
                  <img src={group} alt="Group" className="h-[20px] w-[20px]" />
                  <span className="text-[16px] pl-[3px]">
                    {game.playerSlot}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <FaArrowRight
                  size={5}
                  className="mt-1.5 rounded-full h-[33px] w-[33px] bg-purple-800 flex justify-center items-center text-[10px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AllGames;
