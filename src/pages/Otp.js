import React, {useState, useRef } from "react";
import bg from "../assets/bg.svg";
import OtpInput from "react-otp-input";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";

export const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const location = useLocation();
  const navigate = useNavigate();
  const otpRef = useRef(null);

  const correctOtp = location.state?.correctOtp;
  const email = location.state?.email;
  const password = location.state?.password;
  const userName = location.state?.username;

  const resetOtp = () => {
    setOtp(["", "", "", ""]); 
    if (otpRef.current) {
      otpRef.current.focus();
    }
  };

  const verifyOTP = async () => {
    if (otp.join("") === correctOtp.toString().trim()) {
      let response = axios.post("https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/signup", {
        email,
        password,
        userName,
      });

      if ((await response).status === 409) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User already exists. Try logging in.",
          confirmButtonText: "Login",
          didClose: () => {
            navigate("/login");
          },
        });
      } else {
        localStorage.setItem("userCredentials", JSON.stringify({ email }));
        navigate("/home",{
          state: { email, userName },
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong OTP. Please enter the correct OTP again.",
        confirmButtonText: "Try Again",
        didClose: resetOtp,
      });
    }
  };

  return (
    <>
      <div
        style={{
          height: "90vh",
          overflowY: "auto",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >

        {/* Header Image */}
        <div
          className={`flex flex-col   items-center justify-center flex-1`}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-white  text-[30px] flex justify-center items-center">
            OTP Verification
          </h1>
          <p className="text-gray-500 pb-9 pt-0">
            Enter the verification code we just sent on your email address
          </p>
          <div className="flex-col justify-center items-center text-white">
            <OtpInput
              value={otp.join("")}
              onChange={(value) => setOtp(value.split(""))}
              numInputs={6}
              isInputNum
              inputStyle={{
                width: "2.8rem",
                height: "2.8rem",
                margin: "0 0.2rem",
                fontSize: "1.5rem",
                borderRadius: "4px",
                border: "1px solid #ced4da",
                color: "black",
                background: " rgba(86, 88, 90, 1)",
              }}
              renderInput={(inputProps, index) => (
                <input {...inputProps} key={index} />
              )}
            />

            <button
              onClick={verifyOTP}
              className="bg-blue-950 w-full mt-4 p-2  rounded-md text-white "
            >
              Verify OTP
            </button>
            <div className="flex">
              <p className="mt-5 text-gray-500">Don't recieve code?</p>
              <span className="text-blue-700 mt-5">Resend</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
