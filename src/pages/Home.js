import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import headerImage from "../images/headerImage.png";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Popup from "../components/PopUp";
import LoginAlert from "../components/LoginAlert";
import AllGames from "./AllGames";
import DrawCard from "../components/DrawCard";
import SoloGamePopup from "../components/SoloGamePopup";

const socket = io(
  "https://gamemateserver3-eresf4e6c0drdnaf.southindia-01.azurewebsites.net",
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
  const [show, setShow] = useState(false);
  const [queryMail, setQueryMail] = useState("");
  const [showSoloPopUp, setShowSoloPopUp] = useState(false);
  const [showLoginBanner, setShowLoginBanner] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [soloResult, setSoloResult] = useState(false);

  const handleLoginClick = () => {
    setShowLoginBanner(false);
    navigate("/login");
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedCredentials = localStorage.getItem("userCredentials");

    if (!storedCredentials) {
      console.log("No user credentials found");
      setShowLoginBanner(true);
    } else {
      const tempMail = JSON.parse(storedCredentials).email;

      socket.on("matchmaking", (data) => {
        console.log("Matchmaking AA YAA:", data);
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
  }, [navigate, socket]);

  useEffect(() => {
    const getEmailFromURL = () => {
      const params = new URLSearchParams(location.search);
      const email = params.get("email");
      const result = params.get("result");

      return email, result;
    };

    const getSolo = () => {
      const params = new URLSearchParams(location.search);
      const matchResult = params.get("matchResult");

      return matchResult;
    };

    const email = getEmailFromURL();
    const result = getEmailFromURL();
    const matchResult = getSolo();

    if (result) {
      setIsDraw(true);
    }
    if (email) {
      setQueryMail(email);
      setShowSoloPopUp(true);
    }

    if (matchResult) {
      setSoloResult(true);
      setShow(true);
      setWinner(matchResult === "win" ? "Win" : "Lost");

      console.log("Match Result:", matchResult, soloResult, show);
    }
  }, [location.search]);

  const handleClosePopup = () => {
    setShowSoloPopUp(false);
    setQueryMail("");
  };

  useEffect(() => {
    if (queryMail) {
      console.log("Fetching result for:", queryMail);
      setWinner(""); // Reset winner state before fetching
      fetchResult(queryMail); // Fetch result based on the email
    } else {
      console.log("No email found in query string.");
    }
  }, [queryMail]);

  // Fetch result and handle the response
  const fetchResult = async (queryMail) => {
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
      console.log("Result:", result.winner);

      if (result && result.winner) {
        setWinner(result.winner === queryMail ? "Win" : "Lost"); // Update winner status
        setShow(true); // Show the popup when we have the result
        handleResult(queryMail, result.winner === queryMail ? "win" : "loss");
      } else {
        console.log("No result found for the email.");
      }
    } catch (err) {
      console.log("Error fetching results:", err);
    }
  };

  const handleResult = async (email, result) => {
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/updateResults",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, result: result }),
        }
      );

      console.log("Response updateStatus:", response);

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

        console.log("createMatch", createMatch);

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
        window.history.replaceState(null, "", urlWithoutEmail); // This will update the URL without the query string

        setQueryMail("");
      } else {
        console.log("Failed to update match status");
      }
    } catch (error) {
      console.error("Error in closing match", error);
    }
  };

  const handleDraw = () => {
    setIsDraw(false);
    const urlWithoutEmail = window.location.pathname;
    window.history.replaceState(null, "", urlWithoutEmail);
  };
  return (
    <div className=" bg-black text-white md:pr-10 ">
      {showLoginBanner && <LoginAlert onLoginClick={handleLoginClick} />}

      <div className="text-2xl bg-custom-gray text-white font-bold pt-8 lg:pl-20">
        Home
      </div>

      {/* Header Image */}
      <div>
        <img src={headerImage} alt="Header Game" />
      </div>

      {matchedInvite && (
        <div className="fixed top-5 right-5 bg-black bg-opacity-70 z-50 p-4 text-white rounded-lg shadow-lg">
          <div className="flex justify-end">
            <button onClick={() => setMatchedInvite(false)}>
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

      {/* All Games Section */}
      <AllGames />

      {/* Popup for Draw */}
      {isDraw && <DrawCard onClose={() => handleDraw()} />}

      {/* Popup for Result */}
      {showSoloPopUp && show && (
        <Popup show={show} winner={winner} handleClose={handleClose} />
      )}

      {/* Popup for Solo Game */}

      {soloResult && show && (
        <SoloGamePopup email={inviteTarget} show={show} winner={winner} />
      )}

      <Card />
      {/* Popup for Solo Game */}
      {/* {showSoloPopUp && (
        <SoloGamePopup onClose={handleClosePopup} email={queryMail} />
      )} */}
    </div>
  );
};

export default Home;
