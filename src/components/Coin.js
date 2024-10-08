import React, { useEffect, useState } from 'react';
import { FaGem } from 'react-icons/fa';

function Coin() {
  const [email, setEmail] = useState("");
  const [coins, setCoins] = useState(0);

  const fetchCoins = async (email) => {
    try {
      const response = await fetch(
        "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/coins",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("COINS", data);
        setCoins(data); 
      } else {
        console.error("Failed to fetch coins");
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );
    if (storedCredentials && storedCredentials.email) {
      setEmail(storedCredentials.email);
      fetchCoins(storedCredentials.email); 
    }
  }, []);


  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center justify-center w-10 h-10 bg-custom-gray rounded-full text-sm border-8 border-black">
        <FaGem />
      </div>
      <div className="text-center">
        <span className=" text-xs text-gray-400 block">Coins</span>
        <span className="text-sm font-medium">{coins}</span> {/* Display fetched coins */}
      </div>
    </div>
  );
}

export default Coin;
