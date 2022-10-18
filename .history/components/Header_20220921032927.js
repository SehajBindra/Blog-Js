import React from "react";
import { useSelector } from "react-redux";
import { Currentuser } from "../redux/slices/userSlice";

function Header() {
  const currentuser = useSelector((state) => state.user.Currentuser);
  //   console.log(currentuser);
  return (
    <div className="top:0 sticky z-50 flex  justify-between bg-black  py-4 text-red-400 shadow-xl ">
      {/* left */}
      <div className=" mx-2 flex items-center text-white">
        {currentuser && (
          <h1 className="text-white">{currentuser.data.data.email} </h1>
        )}
      </div>
      {/* center */}
      <div className="mx-2 flex cursor-pointer items-center space-x-4 px-4">
        <p>{currentuser.username} </p>
        <p>About</p>
        <p>Skills</p>
        <p>Contact</p>
      </div>

      {/* right */}
      <div className=" flex cursor-pointer">
        <div className="flex items-center space-x-3">
          <img
            className="h-8  object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Instagram.svg/2048px-Instagram.svg.png"
            alt=""
          />
        </div>
        <div className="flex items-center space-x-3">
          <img
            className="h-8  object-cover"
            src="https://www.logo.wine/a/logo/Gmail/Gmail-Logo.wine.svg"
            alt=""
          />
        </div>

        <div className="flex items-center space-x-3">
          <img
            className="h-8  object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
