import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(
  "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net",
  {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  }
);
const NotificationProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    socket.on("matchmaking", (data) => {
      console.log("NOTIFICATION YE PROVIDER SE-->", data);
      setAlert("abb match hua hai"); 
      setTimeout(() => setAlert(null), 5000);
    });

    return () => {
      socket.off("matchmaking");
    };
  }, []);

  return (
    <div>
      {alert && (
        <div className="fixed top-5 right-5 bg-orange-600 text-white p-4 rounded shadow-lg">
          {alert}
        </div>
      )}
      {children}
    </div>
  );
};

export default NotificationProvider;
