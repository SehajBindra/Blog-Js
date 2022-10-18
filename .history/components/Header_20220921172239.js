import React from "react";
import { useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Currentuser } from "../redux/slices/userSlice";

function Header() {
  const [open, Setopen] = useRecoilState(modalState);
  const currentuser = useSelector((state) => state.user.Currentuser);
  console.log(currentuser);
  return (
    <div className="top:0 sticky z-50 flex h-20 justify-between bg-gray-100 w-full mx-4 py-4 text-black shadow-xl ">
      {/* left */}
      <div className=" mx-2 flex items-center ">
        <p className="text-2xl py-2 px-4"> BLOG.JS</p>
        {/* {currentuser && <h1 className="">{currentuser.data.data.email} </h1>} */}
      </div>
      {/* center */}
      <div className="mx-2 flex cursor-pointer items-center space-x-4 px-4">
        <p onClick={() => Setopen(true)}>Post</p>

        <div>
          <p className="text-blue-400">SignIn</p>
        </div>
      </div>

      {/* right */}
      <div className=" flex cursor-pointer">
        <div className="flex items-center space-x-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={currentuser.data.data.profilePic || currentuser.img}
            alt=""
          />
          <p>{currentuser.data.data.username || currentuser.displayName} </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
