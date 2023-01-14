import React, { useEffect, useState } from "react";
import axios from "axios";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SearchResults from "./SearchResults";
import MobileNavigation from "./MobileNavigation";

function Header() {
  const { data: session, status } = useSession();
  // console.log(session);

  const baseUrl = "http://localhost:3000/api/search";
  const url = "https://blog-beta-hazel.vercel.app/api/search";
  const url2 = "https://blogjs.tech/api/search";
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [open, Setopen] = useRecoilState(modalState);

  useEffect(() => {
    (async () => {
      if (!query) {
        setSearchResults([]);
        return false;
      }
      const dev = process.env.NODE_ENV !== "production";
      const { data } = await axios.get(`${dev ? baseUrl : url2}`, {
        params: {
          query: query,
        },

        timeout: 16000,
      });

      setSearchResults(data);
    })();
  }, [query]);

  const reset = (e) => {
    setQuery("");
  };

  // console.log(searchResults);

  return (
    <div className="top-0 sticky z-50 flex  h-20  justify-between bg-black overflow-y-auto    py-4 text-white  ">
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

      <div className=" flex-grow sm:flex-grow-0 ml-2 pb-10 ">
        <div className=" relative  rounded-md ">
          <form
            className={
              !session
                ? "flex border-2 border-gray-800  xl:mr-16   rounded-full px-1 py-2 ml-2 mr-2 shadow-lg items-center"
                : "flex border-2 border-gray-800 xl:ml-64  rounded-full px-1 py-2 ml-2 mr-2 shadow-lg items-center"
            }
          >
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

          <div className="bg-black ml-0 xl:ml-60">
            {query !== "" && <SearchResults searchResults={searchResults} />}
          </div>
        </div>
      </div>

      {session && <MobileNavigation />}

      {/* right */}
      <div className=" flex items-center mx-2 cursor-pointer">
        <div className="flex items-center space-x-2    whitespace-nowrap ">
          {session && (
            <Image
              height={28}
              width={28}
              onClick={!session ? signIn : signOut}
              className="    rounded-full object-cover"
              src={session.user.image}
              alt="User Image"
            />
          )}

          <button
            className="sm:hidden text-base font-medium cursor-pointer "
            onClick={!session ? signIn : signOut}
          >
            {!session ? "Sign In" : "LogOut"}
          </button>

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
