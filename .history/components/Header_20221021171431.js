import React from "react";
import { useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { BsFillPatchPlusFill, BsPatchPlus } from "react-icons/bs";

import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function Header() {
  const { data: session, status } = useSession();
  // console.log(session);

  const router = useRouter();
  const [open, Setopen] = useRecoilState(modalState);

  return (
    <div className="top-0 sticky z-50 flex  h-20  justify-between bg-black  border-b border-gray-800  py-4 text-white border-1 ">
      {/* left */}
      <div className=" hidden sm:inline-flex items-center ">
        <p
          onClick={() => router.push("/")}
          className=" sm:text-3xl animate-pulse whitespace-nowrap cursor-pointer py-2 px-4"
        >
          {" "}
          BLOG JS
        </p>
      </div>
      {/* center */}

      <div className=" flex-grow sm:flex-grow-0 ml-2">
        <div className=" relative  rounded-md ">
          <div className=" absolute inset-y-3  pl-2 flex items-center pointer-events-none ">
            <MagnifyingGlassIcon className="h-5  w-5 text-white" />
          </div>
          <input
            className="bg-transparent flex-1  placeholder:text-white border-gray-800  w-full pl-12 px-4 py-2 border-2 focus-within:outline-none    rounded-full"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      {session && (
        <div className=" md:hidden w-full  fixed left-0 bottom-0">
          <div className="flex bg-black h-16 rounded-t-md  text-white  flex-row items-center justify-around">
            <ul className=" list-none text-sm flex space-x-4 py-2 px-4">
              <li> Home</li>
              <li> Explore </li>
              <li> Saved</li>
              <div className="flex flex-row items-center space-x-2">
                <PencilSquareIcon className="h-8 w-8 text-[#E23E57] animate-bounce " />
                <li onClick={() => Setopen(true)}> Write</li>
              </div>
            </ul>
          </div>
        </div>
      )}

      {/* right */}
      <div className=" flex items-center mx-4 cursor-pointer">
        <div className="flex cursor-pointer items-center space-x-2 ">
          {session && (
            <div
              className="flex items-center space-x-2"
              onClick={() => Setopen(true)}
            >
              <PencilSquareIcon className="h-8 w-8 text-[#E23E57] animate-bounce " />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 mx-2   whitespace-nowrap ">
          {session && (
            <img
              onClick={!session ? signIn : signOut}
              className="   w-8 p-1  sm:h-10 sm:w-10 rounded-full object-cover"
              src={session.user.image}
              alt=""
            />
          )}

          <p
            className="sm:hidden text-sm truncate"
            onClick={!session ? signIn : signOut}
          >
            {!session ? "Sign In" : "LogOut"}
          </p>

          <div
            onClick={!session ? signIn : signOut}
            className="hidden sm:inline  truncate  sm:text-base  text-white"
          >
            <p className="">{session ? `${session.user.name}` : "Sign In"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
