import React, { useState } from "react";
import bg from "../assets/bg.svg";
import { useNavigate } from "react-router-dom";
import g from "../images/g.webp";
import f from "../images/f.webp";
import axios from "axios";

export const SignUP = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [correctOtp, setCorrectOtp] = useState("");

  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/login");
  };

  const validateEmail = (email) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return isValidEmail;
  };

  const closeModal = () => {
    setError("");
  };

  const otpPage = async () => {
    if (validateEmail(email)) {
      setError("");
      try {
        const response = await axios.post("https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/sendOTP", {
          email,
        });
        if (response.status === 200) {
          setCorrectOtp(response.data.otp);
          console.log("OTP", response.data.otp);
          navigate("/otp", {
            state: { correctOtp: response.data.otp, email, password, username },
          });
        }
      } catch (error) {
        if (error.response?.status === 409) {
          setError("User already exists. Try logging in.");
        } else {
          setError("Failed to send OTP. Please try again.");
        }
      }
    } else {
      setError("Invalid email address. Please enter a valid email.");
    }
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "black",
          color: "white",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Image */}
        <div
          className={`flex flex-col items-center justify-center flex-1`}
          style={{
            width: "100%",
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center justify-center w-full max-w-xs px-4 py-8 rounded-md shadow-md">
            <input
              type="text"
              placeholder="Example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-3 p-2 border border-gray-300 rounded-md placeholder-gray-500 bg-zinc-800"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-3 p-2 border border-gray-300 rounded-md placeholder-gray-500 bg-zinc-800"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-3 p-2 border border-gray-300 rounded-md placeholder-gray-500 bg-zinc-800"
            />

            <button
              onClick={otpPage}
              className="bg-blue-950 w-full mt-2 p-2 rounded-md text-white"
            >
              Send OTP
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow h-px bg-gray-500" />
              <span className="mx-4 text-gray-300">or</span>
              <hr className="flex-grow border-t-2 border-white" />
            </div>

            <button className="bg-white w-full mt-2 p-2 border border-gray-300 rounded-md text-black flex items-center justify-center space-x-2">
              <img src={g} alt="Google logo" className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
            <button className="bg-white w-full mt-2 p-2 border border-gray-300 rounded-md text-black flex items-center justify-center space-x-2">
              <img src={f} alt="Facebook logo" className="w-5 h-5" />
              <span>Sign in with Facebook</span>
            </button>

            <p className="mt-5 text-gray-500">
              Already have an account?{" "}
              <button className="text-blue-600" onClick={handleSignin}>
                Sign in
              </button>
            </p>
          </div>

          {/* Error Pop-Up Modal */}
          {error && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              onClick={closeModal}
            >
              <div
                className="bg-white p-4 rounded-lg shadow-lg w-90"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-red-500 text-xl mx-40 mb-4">Error</h2>
                <p className="text-black ml-5">{error}</p>
                <button
                  onClick={closeModal}
                  className="mt-4 mx-40 px-4 py-2 bg-blue-950 text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
