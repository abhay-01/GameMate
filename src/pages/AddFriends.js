import React, { useState, useEffect } from "react";
import icon from "../assets/boy.png";
import bg from "../assets/bg.svg";
import { useNavigate } from "react-router-dom";

const AddFriends = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");

  // Helper to capitalize first letter
  function capitalizeFirstLetter(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  useEffect(() => {
    // Fetching the current user's email and available users for friendship
    const fetchData = async () => {
      const storedCredentials = localStorage.getItem("userCredentials");

      if (storedCredentials && storedCredentials.length > 0) {
        const credentials = JSON.parse(storedCredentials);
        setEmail(credentials.email);
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/get-users`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: credentials.email }), // Send current user's email
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          setData(result.map((user) => ({ ...user, isFriend: false }))); // Initialize user list with 'isFriend' status
        } catch (err) {
          console.log("Error message", err.message);
        }
      } else {
        alert("Please login to continue");
        navigate("/login");
      }
    };

    fetchData();
  }, [email, navigate]);

  // Handle the add friend functionality
  const handleAddFriend = async (friendEmail) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/add-friend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, friendEmail }), // Send both current user and friend's email
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.text();
      console.log(`Friend request sent to ${friendEmail} : ${result}`);

      // Update the UI to hide added friend by filtering out the added friend from the list
      setData((prevData) =>
        prevData.filter((user) => user.email !== friendEmail)
      );
    } catch (err) {
      console.log(
        `Failed to send friend request to ${friendEmail}: ${err.message}`
      );
    }
  };

  return (
    <div>
      <div className="text-2xl bg-black text-white font-bold pt-8 lg:pl-20">
          Recommended
      </div>
    <div
      style={{
        overflowY: "auto",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "90vh",
      }}
    >
      <div
        className={`flex flex-col items-center flex-1`}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full md:pr-10 md:pl-20 pr-5 pl-10">
          {data.map((item) => (
            <div
              className="border flex flex-col rounded-xl items-center gap-y-4 my-4 py-4 px-8 w-10/12 transition duration-300 ease-in-out hover:scale-105"
              key={item.email}
            >
              <img
                src={icon}
                width="60px"
                height="60px"
                className=""
                alt="Friend Icon"
              />
              <div className="text-lg font-bold">
                {capitalizeFirstLetter(item.userName)}
              </div>
              <div className="text-white text-opacity-40">Bio/Air</div>

              {/* Conditionally render friend button or added text */}
              <div
                className="bg-[#202320] text-white text-opacity-70 text-lg py-1 px-2 rounded-2xl cursor-pointer"
                onClick={() => handleAddFriend(item.email)}
              >
                +Friend
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddFriends;
