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
    <div className="top-0 sticky z-50 flex h-20  justify-between bg-white  overflow-x-hidden py-4 text-black shadow-xl ">
      {/* left */}
      <div className=" flex items-center ">
        <p className="text-2xl py-2 px-4"> BLOG.JS</p>
        {/* {currentuser && <h1 className="">{currentuser.data.data.email} </h1>} */}
      </div>
      {/* center */}

      <div>
        <div className="bg-gray-100 rounded-full flex-row">
          <input
            className="flex bg-transparent rounded-full px-8 py-2"
            type="text"
            placeholder="Search your blog.."
          />
          <MagnifyingGlassIcon className="h-8 w-8 text-black" />
        </div>
      </div>

      {/* right */}
      <div className=" flex cursor-pointer">
        <div className="flex items-center space-x-2 mx-2 ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={currentuser.data.data.profilePic || currentuser.img}
            alt=""
          />
          <p>{currentuser.data.data.username || currentuser.displayName} </p>
        </div>

        <div className=" flex cursor-pointer items-center space-x-2 ">
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
