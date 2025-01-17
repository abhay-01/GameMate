import React, { useState, useEffect } from "react";
import bg from "../assets/bg.svg";
import { useNavigate } from "react-router-dom";
import g from "../images/g.webp";
import f from "../images/f.webp";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to track login in progress
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedCredentials = JSON.parse(
  //     localStorage.getItem("userCredentials")
  //   );

  //   if (storedCredentials && storedCredentials.email) {
  //     navigate("/profile", {
  //       state: { email: storedCredentials.email },
  //     });
  //   }else{
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    try {
      setLoading(true); // Start loading process
      const response = await axios.post(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const userCredentials = {
          email,
        };
        localStorage.setItem(
          "userCredentials",
          JSON.stringify(userCredentials)
        );
        navigate("/home", {
          state: { email },
        });
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Password does not match.");
      } else if (error.response && error.response.status === 404) {
        setError("User not found.");
      } else {
        setError("Failed to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setError("");
  };

  return (
    <>
      <div
        style={{
          overflowY: "auto",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
          height: '90vh'
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
              className="w-full mt-5 p-2 rounded-lg border border-gray-300 placeholder-gray-500  bg-zinc-800"
            />
            <input
              type="password"
              placeholder="at least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-5 p-2 border border-gray-300 rounded-lg placeholder-gray-500 bg-zinc-800"
            />

            <div className="mt-1 mr-0 pr-0 flex justify-end text-blue-700">
              <div className="text-sm ml-20 pl-16 pr-0 text-right">
                Forget Password?
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="bg-blue-950 w-full mt-2 p-2 rounded-md text-white"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            {error && <p>{error}</p>}

            <div className="flex items-center my-4-full">
              <hr className="flex-grow h-px bg-gray-500 " />
              <span className="mx-4 text-gray-300">or</span>
              <hr className="flex-grow border-t-2 border-white " />
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
              Don't have an account?{" "}
              <button className="text-blue-600" onClick={handleSignup}>
                SignUP
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
                className="bg-custom-gray p-4 rounded-lg shadow-lg w-90"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-red-500 text-xl mx-40 mb-4">Error</h2>
                <p className="text-center text-white">{error}</p>
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
