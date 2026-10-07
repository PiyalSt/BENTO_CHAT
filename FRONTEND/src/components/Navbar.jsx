import React from "react";
import assets from "../assets/assets";
import { BiMessageRounded } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <div className="w-20 mx-auto mt-6">
        <img src={assets.logo} alt="" />
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-4 mt-4">
        <div className="">
          <BiMessageRounded className="text-4xl text-gray-800 hover:text-amber-400 cursor-pointer active:scale-95 transition-all duration-200" />
        </div>
        <div className="">
          <FaUsers className="text-3xl text-gray-800 hover:text-amber-400 cursor-pointer active:scale-95 transition-all duration-200" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
