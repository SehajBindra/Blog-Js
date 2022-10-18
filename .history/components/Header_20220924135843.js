import React from "react";
import { useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { BsFillPatchPlusFill, BsPatchPlus } from "react-icons/bs";
import { Currentuser, User } from "../redux/slices/userSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const [open, Setopen] = useRecoilState(modalState);
  const user = useSelector(User);
  console.log(user);
  return (
    <div className="top-0 sticky z-50 flex  h-20  justify-between bg-white border-b  py-4 text-gray-800 border-1 ">
      {/* left */}
      <div className="hidden sm:inline-flex items-center ">
        <p
          onClick={() => router.push("/")}
          className="text-xl cursor-pointer py-2 px-4"
        >
          {" "}
          BLOG JS
        </p>
        {/* {currentuser && <h1 className="">{currentuser.data.data.email} </h1>} */}
      </div>
      {/* center */}

      <div className=" flex-grow sm:flex-grow-0 ml-2">
        <div className=" relative  rounded-md ">
          <div className=" absolute inset-y-3  pl-2 flex items-center pointer-events-none ">
            <MagnifyingGlassIcon className="h-5  w-5 text-gray-800" />
          </div>
          <input
            className="bg-transparent  w-full pl-10 px-4 py-2 border-2 focus-within:outline-none  placeholder:text-gray-800  rounded-full"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      {/* right */}
      <div className=" flex items-center mx-4 cursor-pointer">
        <div className="flex cursor-pointer items-center space-x-2 ">
          <div
            className="flex items-center space-x-2"
            onClick={() => Setopen(true)}
          >
            <BsFillPatchPlusFill className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="flex items-center space-x-2  mx-4 whitespace-nowrap ">
          <img
            className="h-10   w-10 rounded-full object-cover"
            src={currentuser.data.data.profilePic || currentuser.img}
            alt=""
          />
          <p className="text-base sm:text-base truncate text-gray-800">
            {currentuser.data.data.username || currentuser.displayName}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
