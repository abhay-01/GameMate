import React from "react";
import bg from "../assets/bg.svg";
import { FaGem } from "react-icons/fa";
import boy from "../images/boy.png";
import cross from "../assets/cross.png";
import Coin from "../components/Coin";

function Profile() {
  return (
    <div>
      <div
        style={{
          overflowY: "auto",
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
            <h1 className="text-xl self-start font-bold  text-white p-2 pl-8 ">
              Profile
            </h1>
            <div className="flex flex-col items-center  p-2 pl-8 mb-4">
              <div className="flex flex-col items-center   m-2 m-r-2 rounded-lg p-10  ">
                <div className="flex justify-center items-center p-4">
                  <img src={boy} alt="Boy" className="w-[90px] h-[90px]" />
                </div>
                <Coin />
              </div>
            </div>
            <div className="flex flex-row w-full justify-center items-center gap-x-4">
              <div className="gap-y-2 flex flex-col items-center">
                <div className="text-white">Win</div>
                <div className="bg-[#292b2d] rounded-md w-16 h-8"></div>
              </div>
              <img src={cross} className="w-8 h-8" />
              <div className="gap-y-2 flex flex-col items-center">
                <div className="text-white">Loose</div>
                <div className="bg-[#292b2d] rounded-md w-16 h-8"></div>
              </div>
            </div>
            <div className="flex flex-col items-center py-12 gap-y-8">
              <div className="w-11/12 grid grid-cols-2 gap-x-6 gap-y-4  place-content-between  ">
                <div className="w-full flex flex-col ">
                  <label for="firstname">First Name:</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Your First Name"
                    className="w-full py-2 border bg-[#56585A] border-none focus:outline-none focus:ring-0   rounded-md text-[16px] text-black px-2 placeholder-black"
                  />
                </div>

                <div className="w-full flex flex-col ">
                  <label for="lastname">Last Name:</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Your Last Name"
                    className="w-full py-2 border bg-[#56585A] border-none focus:outline-none focus:ring-0   rounded-md text-[16px] text-black px-2 placeholder-black"
                  />
                </div>
                <div className="w-full flex flex-col ">
                  <label for="lastname">User Id:</label>
                  <input
                    type="text"
                    id="userid"
                    name="userid"
                    placeholder="Your User Id"
                    className="w-full py-2 border bg-[#56585A] border-none focus:outline-none focus:ring-0   rounded-md text-[16px] text-black px-2 placeholder-black"
                  />
                </div>
                <div className="w-full flex flex-col ">
                  <label for="lastname">Email Id:</label>
                  <input
                    type="text"
                    id="emailid"
                    name="emailid"
                    placeholder="Your Email Id"
                    className="w-full py-2 border bg-[#56585A] border-none focus:outline-none focus:ring-0   rounded-md text-[16px] text-black px-2 placeholder-black"
                  />
                </div>
              </div>
              <div className="w-11/12 flex flex-col items-start gap-y-8">
                <div className="font-semibold ">My email address</div>
                <label class="flex items-center space-x-2">
                <input type="checkbox" class="appearance-none w-6 h-6 border border-gray-400 rounded checked:bg-white checked:border-black focus:outline-none checked:before:content-['✓'] checked:before:text-black checked:before:block checked:before:text-center"/>
                  <span >test@gmail.com <div class="text-gray-700"> 1 month ago</div></span>
                </label>
                <buttton className="px-8 py-2 rounded-md font-bold bg-white bg-opacity-10">+ Add Email Address</buttton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
