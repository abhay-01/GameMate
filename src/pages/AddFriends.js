import React ,{ useState, useEffect }from "react";
import { data } from "../utils/Friends";
import icon from "../assets/boy.png";
import bg from "../assets/bg.svg";
const AddFriends = () => {
  const email="test@gmail.com"
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // captitalize text function
  function capitalizeFirstLetter(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // fetching the users are not friend to the current user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  // add friend button function
  const handleAddFriend = async (friendEmail) => {
    console.log(email,friendEmail);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-friend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, friendEmail }), // Send the current user email and friend email
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.text();
      console.log(`Friend request sent to ${friendEmail}: ${result}`);
    } catch (err) {
      console.log(`Failed to send friend request ${friendEmail}: ${err.message}`);
    }
  };

  // incase of data not showing
  if (loading) return <div className="text-white font-bold text-center text-5xl">Loading...</div>;
  if (error) return <div className="text-white font-bold text-center text-5xl">Error: {error}</div>;
  
  return (
    <div
      style={{
        overflowY: "auto",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
      className="h-screen w-screen overflow-x-hidden"
    >
      
      {/* Header Image */}
      <div
        className={`flex flex-col items-center pl-[50px] min-h-screen `}
        style={{
          width: "100%",
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="font-semibold text-xl my-4 ml-8 self-start ">Recommended</div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full md:pr-10 md:pl-20 pr-5 pl-10">
        {data.map((item) => (
          <div className="border flex flex-col rounded-xl items-center gap-y-4 my-4 py-4 px-8 w-10/12 transition duration-300 ease-in-out hover:scale-105 ">
            <img src={icon} width="60px" height="60px" className="" />
            <div className="text-lg font-bold ">{capitalizeFirstLetter(item.userName)}</div>
            <div className="text-white text-opacity-40">Bio/Air</div>
            <div className="bg-[#202320] text-white text-opacity-70 text-lg py-1 px-2 rounded-2xl cursor-pointer" onClick={() => handleAddFriend(item.email)}>+Friend</div>
          </div>
        ))}
        </div>
        
      </div>
    </div>
  );
};

export default AddFriends;
