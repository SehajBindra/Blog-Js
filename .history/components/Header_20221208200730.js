import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

import {
  BackspaceIcon,
  BookmarkIcon,
  GlobeAltIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SearchResults from "./SearchResults";

function Header() {
  const { data: session, status } = useSession();
  // console.log(session);

  const baseUrl = "http://localhost:3000/api/search";
  const url = "https://blog-beta-hazel.vercel.app/api/search";
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [open, Setopen] = useRecoilState(modalState);

  useEffect(() => {
    (async () => {
      if (!query) {
        setSearchResults([]);
        return false;
      }
      const dev = process.env.NODE_ENV !== "production";
      const { data } = await axios.get(`${dev ? baseUrl : url}`, {
        params: {
          query: query,
        },
      });

      setSearchResults(data);
    })();
  }, [query]);

  const reset = (e) => {
    setQuery("");
  };

  // console.log(searchResults);

  return (
    <div className="top-0 sticky z-50 flex  h-20  justify-between bg-black overflow-y-auto  border-b border-gray-800  py-4 text-white border-1 ">
      {/* left */}

      <div className=" hidden sm:inline-flex items-center ">
        <p
          onClick={() => router.push("/")}
          className=" sm:text-3xl  whitespace-nowrap cursor-pointer py-2 px-4"
        >
          {" "}
          BLOG JS
        </p>
      </div>
      {/* center */}

      <div className=" flex-grow sm:flex-grow-0 ml-2  ">
        <div className=" relative  rounded-md ">
          <form className="flex border-2 border-gray-800   rounded-xl px-1 py-2 ml-8 mr-5 shadow-lg items-center  ">
            <input
              className="flex-grow w-full placeholder-zinc-50 outline-none outline-0   focus:outline-none ml-2  bg-transparent  "
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
            />
            <BackspaceIcon
              onClick={(event) => reset(event)}
              className="h-8 cursor-pointer mr-4 transition duration-100 transform hover:scale-125 sm:h-6 text-[#E23E57]"
            />
          </form>
          {/* <div className=" absolute inset-y-3  pl-2 flex items-center pointer-events-none ">
            <MagnifyingGlassIcon className="h-5  w-5 text-[#E23E57]" />
          </div> */}

          {/* <input
            className="bg-transparent   placeholder:text-white border-gray-800  w-full pl-12 mx-auto py-2 border-2 focus-within:outline-none    rounded-full"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
          /> */}

          <div className="">
            <SearchResults searchResults={searchResults} />
          </div>
        </div>
      </div>
      {/* 
      <div className=" left-0 pl-[4rem] inset-y-3 flex-row   flex  items-center  pointer-events-none ">
        <BackspaceIcon
          onClick={(event) => reset(event)}
          className="h-5 w-5 text-[#E23E57]"
        />
      </div> */}

      {session && (
        <div className=" sm:hidden    w-full  fixed left-0 bottom-0">
          <div className="flex bg-black h-16  rounded-t-md  text-white px-16  justify-evenly cursor-pointer  flex-row items-center ">
            <ul className=" list-none text-sm flex justify-between space-x-4 py-2 px-4 sm:px-8 sm:space-x-8 ">
              <div
                onClick={() => router.push("/")}
                className="flex flex-row items-center space-x-2"
              >
                <HomeModernIcon className="navBtn animate-pulse" />
                <li> Home</li>
              </div>

              <div className="flex flex-row items-center space-x-2">
                <PencilSquareIcon className="navBtn " />
                <li onClick={() => Setopen(true)}> Write</li>
              </div>

              <div
                onClick={() => router.push("/programing")}
                className="flex items-center flex-row space-x-2"
              >
                <GlobeAltIcon className="navBtn animate-spin" />
                <li> Explore </li>
              </div>

              <div
                onClick={() => router.push("/saved")}
                className="flex space-x-2 items-center "
              >
                <BookmarkIcon className="navBtn animate-pulse" />
                <li> Saved</li>
              </div>
            </ul>
          </div>
        </div>
      )}

      {/* right */}
      <div className=" flex items-center mx-4 cursor-pointer">
        <div className="flex items-center space-x-2  mr-8  whitespace-nowrap ">
          {session && (
            <Image
              height={32}
              width={32}
              onClick={!session ? signIn : signOut}
              className="    rounded-full object-cover"
              src={session.user.image}
              alt="Refresh.."
            />
          )}

          <p
            className="sm:hidden text-sm "
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
