import React, { useState, useEffect } from "react";
import icon from "../assets/boy.png";
import bg from "../assets/bg.svg";
import { useNavigate } from "react-router-dom";

const AddFriends = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");

  function capitalizeFirstLetter(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  useEffect(() => {
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
              body: JSON.stringify({ email: credentials.email }),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          setData(result.map((user) => ({ ...user, isFriend: false })));
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

  // Handle add friend functionality
  const handleAddFriend = async (friendEmail) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/add-friend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, friendEmail }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.text();
      console.log(`Friend request sent to ${friendEmail} : ${result}`);

      setData((prevData) =>
        prevData.map((user) =>
          user.email === friendEmail ? { ...user, isFriend: true } : user
        )
      );
    } catch (err) {
      console.log(
        `Failed to send friend request ${friendEmail}: ${err.message}`
      );
    }
  };

  return (
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
        <div className="font-semibold text-xl my-4 ml-8 self-start pl-12 pt-4">
          Recommended
        </div>
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
              {!item.isFriend ? (
                <div
                  className="bg-[#202320] text-white text-opacity-70 text-lg py-1 px-2 rounded-2xl cursor-pointer"
                  onClick={() => handleAddFriend(item.email)}
                >
                  +Friend
                </div>
              ) : (
                <div className="text-green-500 text-lg py-1 px-2 rounded-2xl">
                  Friend Added
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddFriends;
