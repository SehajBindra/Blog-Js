import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

function SearchResults({ searchResults }) {
  //   console.log(searchResults);
  const router = useRouter();
  return (
    <div className="shadow-lg  bg-black    overflow-y-auto  py-2  p-4 text-white flex flex-col justify-center align-middle w-80 mx-auto rounded-md  z-10 fixed top-16">
      {searchResults?.map(({ title, _id, username, userimg }) => (
        <>
          <div
            onClick={() => router.push(`/product/${_id}`)}
            className=" border-b  border-gray-800 cursor-pointer"
            key={_id}
          >
            <h2 className="line-clamp-2 my-2 font-semibold ">{title}</h2>

            <div className="flex flex-row space-x-2 my-2   items-center justify-between">
              <img
                className="h-4 w-4 rounded-full"
                src={userimg}
                alt="userimg"
              />
              <p className="flex-1 font-light text-sm"> {username} </p>

              <ArrowRightIcon className="arrow" />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default SearchResults;
