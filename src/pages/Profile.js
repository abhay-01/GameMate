import React, { useState, useEffect } from "react";
import bg from "../assets/bg.svg";
import boy from "../images/boy.png";
import cross from "../assets/cross.png";
import Coin from "../components/Coin";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    noOfWins: "",
    noOfLosses: "",
    coins: "",
  });

  // Fetch user data once the email is set
  const fetchUserData = async (userEmail) => {
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const nameParts = data.name ? data.name.split(" ") : ["-", "-"];
        setUserData({
          userName: data.userName || "",
          email: data.email || "",
          firstName: nameParts[0] || "--",
          lastName: nameParts.slice(1).join(" ") || "-",
          noOfWins: data.numberOfWins || "0",
          noOfLosses: data.numberOfLosses || "0",
          coins: data.coins || "",
        });
        console.log("Fetched User Data:", data);
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Get email from local storage when the component mounts
  useEffect(() => {
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );
    const userEmailFromStorage = storedCredentials?.email || email;

    if (userEmailFromStorage) {
      setEmail(userEmailFromStorage);
      fetchUserData(userEmailFromStorage); // Fetch user data only if email is found
    }else {
      alert("Please login to continue");
      navigate("/login");
    }
  }, [email]); // Only runs once when the component mounts

  // Profile update logic
  const handleProfileUpdate = async () => {
    const name = `${userData.firstName} ${userData.lastName}`.trim(); // Combine first and last name

    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/edit-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.email,
            name: name,
            userName: userData.userName,
          }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        const updatedNameParts = updatedUser.name.split(" ");
        setUserData({
          ...userData,
          firstName: updatedNameParts[0] || "-",
          lastName: updatedNameParts.slice(1).join(" ") || "-",
        });
        setIsEditing(false); // Disable edit mode after submission

        // Checking updated data
        console.log("Updated User Data:", updatedUser);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Toggle between edit and submit mode
  const handleEditClick = () => {
    if (isEditing) {
      handleProfileUpdate(); // Submit changes
    } else {
      setIsEditing(true); // Enable edit mode
    }
  };

  return (
    <div>
        <div className="text-2xl bg-black text-white font-bold pt-8 lg:pl-20">Profile</div>
      <div
        style={{
          overflowY: "hidden",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className={`flex flex-col justify-center items-center flex-1`}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col lg:pl-10 pt-5 w-full">
            <div className="flex flex-col items-center p-2 pl-8 mb-4">
              <div className="flex flex-col items-center m-2 m-r-2 rounded-lg p-10">
                <div className="flex justify-center items-center p-4">
                  <img src={boy} alt="Boy" className="w-[90px] h-[90px]" />
                </div>
                <Coin email={userData.email}/>
              </div>
            </div>
            <div className="flex flex-row w-full justify-center items-center gap-x-4">
              <div className="gap-y-2 flex flex-col items-center">
                <div className="text-white">Win</div>
                <div className="bg-[#292b2d] rounded-md w-16 h-8 text-white text-xl text-center">
                  {userData.noOfWins}
                </div>
              </div>
              <img src={cross} alt="Cross icon" className="w-8 h-8" />
              <div className="gap-y-2 flex flex-col items-center">
                <div className="text-white">Lose</div>
                <div className="bg-[#292b2d] rounded-md w-16 h-8 text-white text-xl text-center">
                  {userData.noOfLosses}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center py-12 gap-y-8">
              <div className="w-11/12 grid grid-cols-2 gap-x-6 gap-y-4 place-content-between">
                <div className="w-full flex flex-col">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={userData.firstName}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                    className={`w-full py-2 border ${
                      isEditing ? "bg-white" : "bg-[#56585A]"
                    } border-none focus:outline-none focus:ring-0 rounded-md text-[16px] text-black px-2 placeholder-black`}
                  />
                </div>

                <div className="w-full flex flex-col">
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={userData.lastName}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                    className={`w-full py-2 border ${
                      isEditing ? "bg-white" : "bg-[#56585A]"
                    } border-none focus:outline-none focus:ring-0 rounded-md text-[16px] text-black px-2 placeholder-black`}
                  />
                </div>

                <div className="w-full flex flex-col">
                  <label htmlFor="userid">User Name:</label>
                  <input
                    type="text"
                    id="userid"
                    name="userid"
                    value={userData.userName}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, userName: e.target.value })
                    }
                    className={`w-full py-2 border ${
                      isEditing ? "bg-white" : "bg-[#56585A]"
                    } border-none focus:outline-none focus:ring-0 rounded-md text-[16px] text-black px-2 placeholder-black`}
                  />
                </div>

                <div className="w-full flex flex-col">
                  <label htmlFor="emailid">Email Id:</label>
                  <input
                    type="email"
                    id="emailid"
                    name="emailid"
                    value={userData.email}
                    readOnly
                    className="w-full py-2 border bg-[#56585A] border-none focus:outline-none focus:ring-0 rounded-md text-[16px] text-black px-2 placeholder-black"
                  />
                </div>
              </div>
              <div className="w-11/12 flex flex-col items-start gap-y-8">
                <button
                  className="px-8 py-2 rounded-md font-bold bg-white bg-opacity-10 cursor-pointer"
                  onClick={handleEditClick}
                >
                  {isEditing ? "Submit" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
