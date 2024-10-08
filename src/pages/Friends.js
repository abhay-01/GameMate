import React, { useEffect, useState } from "react";
import { data } from "../utils/Friends";
import icon from "../assets/boy.png";
import bg from "../assets/bg.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Friends = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const gameUrl = location.state?.gameUrl;
  const email = location.state?.email;

  const handleClick = (name) => {
    if (gameUrl) {
      navigate("/matchmaking", {
        state: { friendName: name, email: email, gameUrl: gameUrl },
      });
    } else {
      navigate("/allgames", { state: { friendName: name, email: email } });
    }
  };

  const color = {
    busy: "#F6EF07",
    online: "#0DEF0D",
    offline: "#E71919",
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/friends",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-white font-bold text-center text-5xl">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-white font-bold text-center text-5xl">
        Error: {error}
      </div>
    );
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
        className={`flex flex-col items-start pl-[100px] min-h-screen`}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="font-semibold text-2xl my-4">All Friends</div>
        <div className="w-full flex flex-col items-center">
          {data.map((item) => (
            <div
              className="border flex flex-row rounded-xl items-center gap-x-4 my-4 py-4 px-8 w-10/12 transition duration-300 ease-in-out hover:scale-x-105"
              onClick={() => handleClick(item.name)} // Use an arrow function to pass item.name
              key={item.name}
            >
              <img src={icon} width="40px" height="40px" alt="Friends's icon" />
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
