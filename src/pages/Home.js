import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import headerImage from "../images/headerImage.png";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import Carousels from "../components/Carousel";
import Popup from "../components/PopUp";

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
  const [show, setShow] = useState(true);

  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  const location = useLocation();
  const email = location.state?.email;
  const userName = location.state?.userName;

  const tempMail = "tom@gmail.com"; // TODO: Have to replace it with actual user email

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

    socket.emit("decline-matchmaking", {
      sender: inviteTarget,
      target: inviteSender,
      url: inviteUrl,
      type: inviteType,
    });
  };

  useEffect(() => {
    setWinner("");
    const queryParams = getQueryParams(location.search);
    const email = queryParams.get("email");

    const temp = "keshav"; // Temporary for now

    if (temp) {
      setShow(true);
      const fetchResult = async () => {
        try {
          const response = await fetch("https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/postResults", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: temp }),
          });

          const result = await response.json();
          setWinner(result.winner === temp ? "Win" : "Lost");
        } catch (err) {
          console.log("ERROR IN FETCHING RESULTS", err);
        }
      };

      fetchResult();
    }
  }, [location.search]);

  const handleClose = async () => {
    setShow(false);
    try {
      const response = await fetch("https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/updateStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "keshav" }),
      });

      if (response.ok) {
        setWinner("");
        setShow(false);
      } else {
        console.log("Failed to update match status");
      }
    } catch (error) {
      console.error("Error in closing match", error);
    }
  };

  return (
    <div className="overflow-y-auto bg-black text-white md:pr-10 md:pl-20 pr-5 pl-10">
      {/* Header Image */}
      <div>
        <img src={headerImage} alt="Header Game" />
      </div>
      <Carousels />

      {matchedInvite && (
        <div className="fixed top-5 right-5 bg-black bg-opacity-70 z-50">
          <div className="relative text-center p-6 w-[500px] h-[350px] flex-shrink-0 rounded-[20px] bg-[radial-gradient(circle, rgba(128,0,128,1)_0%, rgba(0,0,255,1)_70%)]">
            <button
              className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded flex items-center"
              onClick={() => setMatchedInvite(false)}
            >
              <FaTimes size={20} />
            </button>

            <h2 className="mb-4 text-white font-poppins text-[40px] font-bold uppercase">
              Game Invite
            </h2>

            <p className="mb-4 text-[#FA8305] font-poppins text-[28px] font-bold uppercase">
              Invite from {inviteSender}
            </p>

            <p className="mb-4 text-white text-[22px]">
              Game Type: {inviteType}
            </p>

            <div className="flex justify-center space-x-6 mt-4">
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-lg text-[20px] font-bold"
                onClick={handleAcceptInvite}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg text-[20px] font-bold"
                onClick={handleDeclineInvite}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      <Popup winner={winner} show={show} handleClose={handleClose} />

      {/* Upcoming Matches or Game Cards */}
      <Card />
      {/* Map your game cards here with component mapping json*/}
    </div>
  );
};

export default Home;
