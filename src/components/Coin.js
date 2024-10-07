import React from 'react'
import { FaGem } from 'react-icons/fa'

function Coin() {
  return (
    <div className="flex items-center gap-1">
    <div className="flex items-center justify-center w-10 h-10 bg-custom-gray rounded-full text-sm border-8 border-black">
      <FaGem />
    </div>
    <div className="text-center">
      <span className=" text-xs text-gray-400 block">Coins</span>
      <span className="text-sm font-medium">00</span>
    </div>
  </div>

  )
}

export default Coin