import React from "react";
import {
  // BackspaceIcon,
  BookmarkIcon,
  GlobeAltIcon,
  HomeModernIcon,
  // MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
function MobileNavigation() {
  const router = useRouter();
  const [open, Setopen] = useRecoilState(modalState);

  return (
    <div>
      <div className=" sm:hidden    w-full  fixed left-0 bottom-0">
        <div className="flex bg-black h-16  rounded-t-md  text-white px-16  justify-evenly cursor-pointer  flex-row items-center ">
          <ul className=" list-none text-sm flex justify-between space-x-4 py-2 px-4 sm:px-8 sm:space-x-8 ">
            <div onClick={() => router.push("/")} className="navbar">
              <HomeModernIcon className="navBtn animate-pulse" />
              <li> Home</li>
            </div>

            <div className="navbar">
              <PencilSquareIcon className="navBtn " />
              <li onClick={() => Setopen(true)}> Write</li>
            </div>

            <div
              onClick={() => router.push(`/Explore?name=Programing`)}
              className="navbar"
            >
              <GlobeAltIcon className="navBtn animate-spin" />
              <li> Explore </li>
            </div>

            <div onClick={() => router.push("/saved")} className="navbar">
              <BookmarkIcon className="navBtn animate-pulse" />
              <li> Saved</li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileNavigation;
