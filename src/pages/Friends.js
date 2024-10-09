import React, { useEffect, useState } from "react";
import icon from "../assets/boy.png";
import bg from "../assets/bg.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Friends = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [friendsData, setFriendsData] = useState([]);
  const gameUrl = location.state?.gameUrl;
  
  useEffect(() => {
    // Get the email only once when the component mounts
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );

    if (storedCredentials?.email) {
      setEmail(storedCredentials.email);
    } else if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, []);

  useEffect(() => {
    const fetchData = async (inputMail) => {
      try {
        const response = await fetch(
          "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/friends",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: inputMail }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log("-->>", result);
        setFriendsData(result);
      } catch (err) {
        console.log("Error message",err.message);
      } 
      finally{
        console.log("Error message:Not fetching friends data")
      }
    };

    if (email) {
      fetchData(email);
    }
  }, [email]);

  const handleClick = (name) => {
    if (gameUrl) {
      navigate("/matchmaking", {
        state: { friendName: name, email: email, gameUrl: gameUrl },
      });
    } else {
      navigate("/allgames", { state: { friendName: name, email: email } });
    }
  };

  return (
    <div
      style={{
        overflowY: "auto",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Image */}
      <div
        className="flex flex-col items-start min-h-screen"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="font-semibold text-2xl my-4 pl-28">All Friends</div>
        <div className="w-full flex flex-col items-center">
          {friendsData.map((item) => (
            <div
              className="border flex flex-row rounded-xl items-center gap-x-4 my-4 py-4 px-8 w-10/12 transition duration-300 ease-in-out hover:scale-x-105"
              onClick={() => handleClick(item.userName)}
              key={item.name}
            >
              <img src={icon} width="40px" height="40px" alt="Friend's icon" />
              <div className="flex flex-row justify-between w-full items-center">
                <div>
                  <div className="text-lg font-bold">{item.userName}</div>
                  <div>Bio/Air</div>
                </div>
                <div
                  className={`text-white rounded-full px-4 py-2 capitalize ${
                    item.currentStatus === "offline"
                      ? "bg-[#E71919]"
                      : item.currentStatus === "busy"
                      ? "bg-[#FFFF00]"
                      : "bg-[#0DEF0D]"
                  }`}
                >
                  {item.currentStatus}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
