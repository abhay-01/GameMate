import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import icon from "../assets/boy.png";
import bg from "../assets/bg.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

// Initialize socket connection
const socket = io(
  "https://gamemateserver3-eresf4e6c0drdnaf.southindia-01.azurewebsites.net", // Replace with your socket URL
  {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  }
);

const Friends = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [friendsData, setFriendsData] = useState([]);
  const [inviteReceived, setInviteReceived] = useState(false);
  const [inviteSender, setInviteSender] = useState("");
  const [inviteTarget, setInviteTarget] = useState(""); // store the target email for later
  const [inviteUrl, setInviteUrl] = useState("");
  const [inviteType, setInviteType] = useState("");
  const [matchedInvite, setMatchedInvite] = useState(false); // To track matched invites

  const gameUrl = location.state?.gameUrl;

  // Fetch email from localStorage or route state
  useEffect(() => {
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );

    if (storedCredentials && storedCredentials?.email) {
      setEmail(storedCredentials.email);
    } else if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      alert("Please login to continue");
      navigate("/login");
    }
  }, [location.state, navigate]);

  // Fetch friends data
  useEffect(() => {
    const fetchData = async (inputMail) => {
      try {
        const response = await fetch(
          "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/friends",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: inputMail }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setFriendsData(result);
      } catch (err) {
        console.log("Error fetching friends data:", err.message);
      }
    };

    if (email) {
      fetchData(email);
    }
  }, [email]);

  // Listen for game invites via socket
  useEffect(() => {
    if (email) {
      socket.on("matchmaking", (data) => {
        console.log("Game invite received:", data);
        if (data.target === email) {
          setInviteReceived(true);
          setInviteSender(data.sender);
          setInviteTarget(data.target);
          setInviteUrl(data.url);
          setInviteType(data.type);
        }
      });
    }
    return () => {
      socket.off("matchmaking");
    };
  }, [email]);

  // Handle accept invite
  const handleAcceptInvite = async () => {
    setMatchedInvite(false);
    console.log("Invite Accepted:", inviteUrl);
    try {
      const response = await fetch(
        "https://gamemateserver3-eresf4e6c0drdnaf.southindia-01.azurewebsites.net/accept-matchmaking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: inviteTarget,
            target: inviteSender,
            url: inviteUrl,
            type: inviteType,
          }),
        }
      );

      if (response.ok) {
        console.log(
          "Invite accepted successfully",
          inviteTarget,
          inviteSender,
          inviteUrl,
          inviteType
        );

        // Emit socket event to notify both users
        socket.emit("accept-matchmaking", {
          sender: inviteTarget,
          target: inviteSender,
          url: inviteUrl,
          type: inviteType,
        });

        // Create match on server
        const createMatch = await fetch(
          "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/createMatch",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email1: inviteSender,
              email2: inviteTarget,
              game: inviteType,
            }),
          }
        );

        if (createMatch.ok) {
          console.log("Match created successfully");
          stakeCoins(inviteTarget);

          const url = inviteUrl + `?email=${inviteTarget}`;
          window.open(url, "_blank");
        }
      } else {
        console.error("Failed to accept invite");
      }
    } catch (error) {
      console.error("Error accepting invite:", error);
    }
  };

  const stakeCoins = async (email) => {
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/configure-coins",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            coins: 500,
          }),
        }
      );

      if (response.ok) {
        console.log(`500 coins staked for ${email}`);
      } else {
        console.error(`Failed to stake coins for ${email}`);
      }
    } catch (err) {
      console.error(`Error staking coins:`, err);
    }
  };

  // Handle decline invite
  const handleDeclineInvite = () => {
    setInviteReceived(false);
    console.log("Invite declined");
  };

  const handleClick = (name, friendEmail) => {
    if (gameUrl) {
      navigate("/matchmaking", {
        state: {
          friendName: name,
          email,
          gameUrl,
          friendEmail,
        },
      });
    } else {
      navigate("/allgames", {
        state: { friendName: name, email, friendEmail },
      });
    }
  };

  return (
    <div
      style={{
        overflowY: "hidden",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        width: "auto",
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
        <div className="text-2xl bg-black text-white font-bold pt-8 lg:pl-20">
          All Friends
        </div>

        {/* Invite notification */}
        {inviteReceived && (
          <div className="fixed top-5 right-5 bg-black bg-opacity-70 z-50 p-4 text-white rounded-lg shadow-lg">
            <div className="flex justify-end">
              <button onClick={() => setInviteReceived(false)}>
                <FaTimes className="text-white" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Game Invite</h3>
              <p>
                {inviteSender} has invited you to a {inviteType} game.
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAcceptInvite}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                  onClick={handleDeclineInvite}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Friends list */}
        <div className="w-full flex flex-col items-center">
          {friendsData.map((item) => (
            <div
              className="border flex flex-row rounded-xl items-center gap-x-4 my-4 py-4 px-8 w-10/12 transition duration-300 ease-in-out hover:scale-x-105"
              onClick={() => handleClick(item.userName, item.email)}
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
