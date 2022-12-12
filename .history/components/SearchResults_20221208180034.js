import React from "react";

function SearchResults({ searchResults }) {
  //   console.log(searchResults);
  return (
    <div className="shadow-lg bg-black  overflow-y-auto py-2  p-4 text-white flex flex-col justify-center align-middle w-80 mx-auto rounded-md  z-10 fixed top-16">
      {searchResults?.map(({ title, _id, username, userimg }) => (
        <>
          <div className=" border-b  border-gray-800" key={_id}>
            <h2 className="line-clamp-2 my-1 font-semibold ">{title}</h2>

            <div className="flex flex-row space-x-2">
              <img className="h-4 w-4 rounded-full" src={userimg} alt="" />
              <p className=" font-light text-sm"> {username} </p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default SearchResults;