import React from "react";
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
      navigate("/allgames", { state: { friendName: name, email: email } });
    }
  };

  const color = {
    busy: "#F6EF07",
    online: "#0DEF0D",
    offline: "#E71919",
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
        className={`flex flex-col items-start pl-[100px] `}
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
              onClick={() => handleClick(item.name)}
              key={item.name}
            >
              <img src={icon} width="40px" height="40px" alt="Friend's icon" />
              <div className="flex flex-row justify-between w-full items-center">
                <div>
                  <div className="text-lg font-bold">{item.name}</div>
                  <div>Bio/Air</div>
                </div>
                <div
                  className={`bg-[${
                    color[item.status]
                  }] text-white rounded-full px-4 py-2 capitalize`}
                >
                  {item.status}
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
