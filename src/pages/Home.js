import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import headerImage from "../images/headerImage.png";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Popup from "../components/PopUp";
import SoloGamePopup from "../components/SoloGamePopup";
import LoginAlert from "../components/LoginAlert";
import AllGames from "./AllGames";

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
  const [queryMail, setQueryMail] = useState("");
  const [showSoloPopUp, setShowSoloPopUp] = useState(false);
  const [showLoginBanner, setShowLoginBanner] = useState(false);

  const handleLoginClick = () => {
    setShowLoginBanner(false);
    navigate("/login");
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedCredentials = localStorage.getItem("userCredentials");

    if (!storedCredentials) {
      setShowLoginBanner(true);
    } else {
      const tempMail = JSON.parse(storedCredentials).email;

      socket.on("matchmaking", (data) => {
        if (data.target === tempMail) {
          setMatchedInvite(true);
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
  }, [navigate]);

  useEffect(() => {
    const getEmailFromURL = () => {
      const params = new URLSearchParams(location.search);
      const email = params.get("email");
      return email;
    };

    const email = getEmailFromURL();
    if (email) {
      setQueryMail(email);
      setShowSoloPopUp(true);
    }
  }, [location.search]);

  const handleClosePopup = () => {
    setShowSoloPopUp(false);
    setQueryMail("");
  };

  useEffect(() => {
    if (queryMail) {
      setWinner("");
      setShow(true);

      const fetchResult = async () => {
        try {
          const response = await fetch(
            "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/postResults",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: queryMail }),
            }
          );

          const result = await response.json();
          setWinner(result.winner === queryMail ? "Win" : "Lost");
          handleResult(queryMail, result.winner === queryMail ? "win" : "loss");
        } catch (err) {
          console.log("Error fetching results:", err);
        }
      };

      fetchResult();
    } else {
      console.log("No email found in query string.");
    }
  }, [queryMail]);

  const handleResult = async (email, result) => {
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/updateStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, result: result }),
        }
      );

      if (response.ok) {
        console.log("Match status updated successfully");
      } else {
        console.error("Failed to update match status");
      }
    } catch (error) {
      console.error("Error updating match status:", error);
    }
  };

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

  const handleClose = async () => {
    setShow(false);
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/updateStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: queryMail }),
        }
      );

      if (response.ok) {
        setWinner("");
        setShow(false);

        const urlWithoutEmail = window.location.pathname;
        window.history.replaceState(null, "", urlWithoutEmail);
      } else {
        console.log("Failed to update match status");
      }
    } catch (error) {
      console.error("Error in closing match", error);
    }
  };

  return (
    <div className="overflow-y-auto bg-black text-white md:pr-10 md:pl-20 pr-5 pl-10">
      {showLoginBanner && <LoginAlert onLoginClick={handleLoginClick} />}

      {/* Header Image */}
      <div>
        <img src={headerImage} alt="Header Game" />
      </div>

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

            <div className="flex justify-center gap-8">
              <button
                className="text-white bg-green-500 py-2 px-4 rounded hover:bg-green-600"
                onClick={handleAcceptInvite}
              >
                Accept
              </button>
              <button
                className="text-white bg-red-500 py-2 px-4 rounded hover:bg-red-600"
                onClick={handleDeclineInvite}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for winner/loser */}
      {show && (
        <Popup onClose={handleClose}>
          <h1 className="text-[40px] font-bold text-center mb-5">{winner}</h1>
        </Popup>
      )}

      {showSoloPopUp && (
        <SoloGamePopup email={queryMail} onClose={handleClosePopup} />
      )}

      <AllGames />

      <Card />
    </div>
  );
};

export default Home;
