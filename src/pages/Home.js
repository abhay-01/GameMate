import React, { useEffect } from "react";
import img1 from "../images/img1.jpeg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpeg";
import logo1 from "../images/logo1.jpeg";
import logo2 from "../images/logo2.jpeg";
import logo3 from "../images/logo3.png";
import trophy from "../images/trophy.png";
import group from "../images/group.png";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import headerImage from "../images/headerImage.png";
import openSocket from "socket.io-client";
import Carousels from "../components/Carousel";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import { FaGem } from "react-icons/fa";

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

  const email = location.state?.email;
  const userName = location.state?.userName;

  console.log("Email", email);
  console.log("Username", userName);



  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );
    console.log("Stored Credentials", storedCredentials);
  }, []);
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
    <div className="h-screen w-screen overflow-y-auto bg-black text-white md:pr-10 md:pl-20 pr-5 pl-10">
      {/* Search Bar */}

      <div className="p-5 text-center">
        <input
          type="text"
          placeholder="Search for games..."
          className="w-4/5 p-2 rounded-md border border-gray-300 text-lg"
        />
      </div>

      {/* Header Image */}
      <div className="w-full">
        <img src={headerImage} alt="Header Game" className="w-full h-auto" />
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
      <div className="p-5">
        <div className="text-2xl font-bold mb-5 ml-[55px] ">
          Upcoming Matches
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 py-4 gap-x-10 gap-y-8">
          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img1} alt="Game 1" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo1} alt="Logo 1" className="w-10 h-10 mr-2" />
              Call Of Duty
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Call Of Duty WarZone Mobile</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹28k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white cursor-pointer" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img2} alt="Game 2" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo2} alt="Logo 2" className="w-10 h-10 mr-2" />
              Apex Of Legend
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Apex Of Legend Royal Battle</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹44k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img3} alt="Game 3" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo3} alt="Logo 3" className="w-10 h-10 mr-2" />
              Valorant
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Valorant Multiplayer</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹29k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img1} alt="Game 1" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo1} alt="Logo 1" className="w-10 h-10 mr-2" />
              Call Of Duty
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Call Of Duty WarZone Mobile</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹28k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img2} alt="Game 2" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo2} alt="Logo 2" className="w-10 h-10 mr-2" />
              Apex Of Legend
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Apex Of Legend Royal Battle</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹44k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5">
            <div className="mb-4">
              <img src={img3} alt="Game 3" className="w-full rounded-lg" />
            </div>
            <div className="flex items-center mb-2">
              <img src={logo3} alt="Logo 3" className="w-10 h-10 mr-2" />
              Valorant
            </div>
            <div className="mb-2">
              <span>21 Feb-6 Mar,08:00 PM</span>
              <h2 className="text-xl">Valorant Multiplayer</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor...
              </p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between items-center mt-3">
              <div className="text-center">
                <span className="block font-bold">Win Price</span>
                <div className="flex items-center justify-center">
                  <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
                  <span>₹29k</span>
                </div>
              </div>
              <div className="text-center">
                <span className="block font-bold">Player Slot</span>
                <div className="flex items-center justify-center">
                  <img src={group} alt="Group" className="w-5 h-5 mr-1" />
                  <span>4v4</span>
                </div>
              </div>
              <FaArrowRight size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
