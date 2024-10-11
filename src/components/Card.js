import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { cardData } from '../utils/UpcomingGames';
import trophy from "../images/trophy.png";
import group from "../images/group.png";

// Component for a Single Card
const OneCard = ({ card }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-5">
      <div className="mb-4">
        <img src={card.image} alt={card.game} className="w-full rounded-lg" />
      </div>
      <div className="flex items-center mb-2">
        <img src={card.logo} alt={card.game} className="w-10 h-10 mr-2" />
        {card.game}
      </div>
      <div className="mb-2">
        <span>{card.eventDate}</span>
        <h2 className="text-xl">{card.title}</h2>
        <p>{card.description}</p>
      </div>
      <hr className="border-gray-600" />
      <div className="flex justify-between items-center mt-3">
        <div className="text-center">
          <span className="block font-bold">Win Price</span>
          <div className="flex items-center justify-center">
            <img src={trophy} alt="Trophy" className="w-5 h-5 mr-1" />
            <span>{card.winPrice}</span>
          </div>
        </div>
        <div className="text-center">
          <span className="block font-bold">Player Slot</span>
          <div className="flex items-center justify-center">
            <img src={group} alt="Group" className="w-5 h-5 mr-1" />
            <span>{card.playerSlot}</span>
          </div>
        </div>
        <FaArrowRight size={20} className="text-white" />
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="p-4 lg:pl-20 lg:pt-6">
      <div className="text-2xl font-bold">
        Upcoming Matches
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 py-4 gap-x-10 gap-y-8">
        {cardData.map((card) => (
          <OneCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Card;
