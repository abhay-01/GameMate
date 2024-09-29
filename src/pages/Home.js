import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import headerImage from "../images/headerImage.png";
import openSocket from "socket.io-client";
import Carousels from "../components/Carousel";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import { FaGem } from "react-icons/fa";
import Card from "../components/Card";

const socket = io("http://localhost:3005", {
  withCredentials: true,
  transportOptions: {
    polling: {
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    },
  },
});

var items = [];

const Home = () => {
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  const [winner, setWinner] = React.useState("");
  const [matchEmails, setMatchEmails] = React.useState({
    email1: "",
    email2: "",
  });

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState(false);

  const location = useLocation();

  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  // useEffect(() => {

  //   const socket = io('http://localhost:3005',{
  //     transports:['websocket','polling','flashsocket']
  //   });

  //   socket.on('connect',()=>{
  //     console.log('Connected to server');
  //   }
  //   );
  // }, []);

  useEffect(() => {
    setWinner("");
    const queryParams = getQueryParams(location.search);
    const email = queryParams.get("email"); //TODO: get email from query params

    // NOTE:for temp purpose only

    const temp = "rahul";

    if (temp) {
      setWinner("");

      setShow(true);
      const fetchResult = async () => {
        try {
          const response = await fetch("http://localhost:3005/postResults", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: temp,
            }),
          });

          const result = await response.json();
          console.log("HOME PAGE REDIRECT--->", result);

          setWinner(result.winner === temp ? "Win" : "Lost");
        } catch (err) {
          console.log("ERROR IN FETCHING RESULTS", err);
        }
      };

      fetchResult();
    }
  }, [location.search]);

  const handleClose = async () => {
    console.log("PRESSED");
    setShow(false);
    try {
      const response = await fetch("http://localhost:3005/updateStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "rahul",
        }),
      });

      const res = await response.json();
      console.log("AFTER UPDATION", res);
      if (response.ok) {
        console.log("Match status updated");
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
      <div className="">
        <img src={headerImage} alt="Header Game" className="" />
      </div>
      <Carousels />

      {show && winner && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
          <div className="relative text-center p-8 w-[992.818px] h-[653.747px] flex-shrink-0 rounded-[32.525px] bg-[radial-gradient(circle,rgba(128,0,128,1)_0%,rgba(0,0,0,1)_70%)]">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded flex items-center"
            >
              <FaTimes />
            </button>

            <h2 className="mb-4 text-white font-poppins text-[84px] font-bold uppercase">
              {winner === "Win" ? "Congratulations!" : "Bad Luck Next Time!"}
            </h2>
            <p className="mb-6 text-[#FA8305] font-poppins text-[64px] font-bold uppercase">
              {winner === "Win" ? "You Won" : "You Lost"}
            </p>

            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center justify-center rounded bg-orange-600 w-[80px] mx-auto sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px]">
                {winner === "Win" ? "+ Coins" : "- Coins"}
              </div>
              <div className="flex items-center mt-8">
                <div className="flex justify-center items-center rounded-full w-12 h-12">
                  {" "}
                  <FaGem className="text-white" size="2x" />
                </div>
                <div className="ml-3 flex flex-col text-white">
                  {" "}
                  <span className="text-xs font-light">Coins</span>
                  <span className="text-lg font-bold">00</span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Matches */}
      <Card />
      //need to make it more modular, use mapping method to display the cards
      //Create a JSON body to store the data and then map it to display the cards

    </div>
  );
};

export default Home;
