import React from "react";
import { useSelector } from "react-redux";
import { Currentuser } from "../redux/slices/userSlice";

function Header() {
  const currentuser = useSelector((state) => state.user.Currentuser);
  console.log(currentuser);
  return (
    <div className="top:0 sticky z-50 flex h-20 justify-between bg-white  py-4 text-black shadow-xl ">
      {/* left */}
      <div className=" mx-2 flex items-center text-white">
        {currentuser && (
          <h1 className="text-white">{currentuser.data.data.email} </h1>
        )}
      </div>
      {/* center */}
      <div className="mx-2 flex cursor-pointer items-center space-x-4 px-4">
        <p>{currentuser.data.data.username} </p>
        <p>About</p>
        <p>Skills</p>
        <p>Contact</p>
      </div>

      {/* right */}
      <div className=" flex cursor-pointer">
        <div className="flex items-center space-x-3 mx-8">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={currentuser.data.data.profilePic || currentuser.img}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
