import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import headerImage from "../images/headerImage.png";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import { FaGem } from "react-icons/fa";
import Card from "../components/Card";
import Carousels from "../components/Carousel";

const socket = io(
  "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net",
  {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  }
);

const Home = () => {
  const [winner, setWinner] = useState("");
  const [matchedInvite, setMatchedInvite] = useState(false);
  const [inviteSender, setInviteSender] = useState("");
  const [inviteTarget, setInviteTarget] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [inviteType, setInviteType] = useState("");

  const location = useLocation();
  const email = location.state?.email;
  const userName = location.state?.userName;

  const tempMail = "test2"; // TODO: Have to replace it with actual user email

  useEffect(() => {
      socket.on("matchmaking", (data) => {
      if (data.target === tempMail) {
        setMatchedInvite(true);
        setInviteSender(data.sender);
        setInviteTarget(data.target);
        setInviteUrl(data.url);
        setInviteType(data.type);
      }
    });

    return () => {
      socket.off("matchmaking");
    };
  }, [email]);

  const handleAcceptInvite = async () => {
    setMatchedInvite(false);
    console.log("Invite Accepted:", inviteUrl);
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/accept-matchmaking",
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
        console.log("Invite accepted successfully");

        socket.emit("accept-matchmaking", {
          sender: inviteTarget,
          target: inviteSender,
          url: inviteUrl,
          type: inviteType,
        });

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
          const url = inviteUrl + `?email=${email}`;
          window.open(url, "_blank");
        }
      } else {
        console.error("Failed to accept invite");
      }
    } catch (error) {
      console.error("Error accepting invite:", error);
    }
  };

  const handleDeclineInvite = () => {
    setMatchedInvite(false);
    console.log("Invite Declined");
  };

  return (
    <div className="overflow-y-auto bg-black text-white md:pr-10 md:pl-20 pr-5 pl-10">
      {/* Header Image */}
      <div>
        <img src={headerImage} alt="Header Game" />
      </div>
      <Carousels />

      {matchedInvite && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative bg-white text-black p-6 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-black"
              onClick={() => setMatchedInvite(false)}
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Game Invite</h2>
            <p className="mb-4">
              You have received a game invite from{" "}
              <strong>{inviteSender}</strong>.
            </p>
            <p className="mb-4">Game Type: {inviteType}</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAcceptInvite}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeclineInvite}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Matches or Game Cards */}
      <Card />
      {/* Map your game cards here with component mapping json*/}
    </div>
  );
};

export default Home;
