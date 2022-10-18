import React from "react";
import { useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { BsFillPatchPlusFill, BsPatchPlus } from "react-icons/bs";
import { Currentuser } from "../redux/slices/userSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Header() {
  const [open, Setopen] = useRecoilState(modalState);
  const currentuser = useSelector((state) => state.user.Currentuser);
  console.log(currentuser);
  return (
    <div className="top-0 sticky z-50 flex h-20  justify-between bg-white  overflow-x-hidden py-4 text-gray-800 border-1 ">
      {/* left */}
      <div className=" flex items-center ">
        <p className="text-xl py-2 px-4"> BLOG.JS</p>
        {/* {currentuser && <h1 className="">{currentuser.data.data.email} </h1>} */}
      </div>
      {/* center */}

      <div className="  ml-2">
        <div className=" relative  rounded-md ">
          <div className=" absolute inset-y-3  pl-2 flex items-center pointer-events-none ">
            <MagnifyingGlassIcon className="h-5  w-5 text-gray-800" />
          </div>
          <input
            className="bg-transparent flex-grow w-full pl-10 px-4 py-2 border-2 focus-within:outline-none  placeholder:text-gray-800  rounded-full"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      {/* right */}
      <div className=" flex cursor-pointer">
        <div className="flex items-center  whitespace-nowrap ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={currentuser.data.data.profilePic || currentuser.img}
            alt=""
          />
          <p className="flex items-center space-x-2 truncate text-gray-800">
            {currentuser.data.data.username || currentuser.displayName}{" "}
          </p>
        </div>

        <div className="hidden  cursor-pointer items-center space-x-2 ">
          <div
            className="flex items-center space-x-2"
            onClick={() => Setopen(true)}
          >
            <BsFillPatchPlusFill className="h-8 w-8 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
