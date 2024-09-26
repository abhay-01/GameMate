import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3005", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  query: {
    email: "test2",
  },
});

const InvitePage = () => {
  const [email, setEmail] = useState("test2");
  const [matchedInvite, setMatchedInvite] = useState(false);
  const [inviteSender, setInviteSender] = useState("");
  const [inviteTarget, setInviteTarget] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [inviteType, setInviteType] = useState("");

  const handleAcceptInvite = async () => {
    if (matchedInvite) {
      try {
        const response = await fetch("http://localhost:3005/accept-matchmaking", {
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
        });

        if (response.ok) {
          socket.emit("accept-matchmaking", {
            sender: inviteTarget,
            target: inviteSender,
            url: inviteUrl,
            type: inviteType,
          });

          const createMatch = await fetch("http://localhost:3005/createMatch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              player1: inviteSender,
              player2: inviteTarget,
              game: inviteType,
            }),
          });

          if (createMatch.ok) {
            console.log("Match created successfully");
          }
          
          const url = inviteUrl + `?email=${email}`;
          window.open(url, "_blank");
        } else {
          console.error("Failed to accept invite");
        }
      } catch (error) {
        console.error("Error accepting invite:", error);
      }
    }
  };

  useEffect(() => {
    socket.on("matchmaking", (data) => {
      if (data.target === email) {
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

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ml-72">
      <h2 className="text-2xl mb-4">Invite Page</h2>
      <input
        type="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Enter your email to check invites"
        className="p-2 mb-4 rounded border border-gray-300"
      />
      <button
        onClick={() => window.location.reload()}
        className="p-2 mb-4 bg-blue-500 text-white rounded cursor-pointer"
      >
        CHECK
      </button>
      {matchedInvite ? (
        <div>
          <p>Invite received from: {inviteSender}</p>
          <button
            onClick={handleAcceptInvite}
            className="p-2 mt-4 bg-green-500 text-white rounded cursor-pointer"
          >
            Accept Invite
          </button>
        </div>
      ) : (
        <p>No invites found</p>
      )}
    </div>
  );
};

export default InvitePage;
