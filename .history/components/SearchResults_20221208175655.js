import React from "react";

function SearchResults({ searchResults }) {
  //   console.log(searchResults);
  return (
    <div className="shadow-lg bg-black  overflow-y-auto py-2 border-b  border-gray-800  p-4 text-white flex flex-col justify-center align-middle w-80 mx-auto rounded-md  z-10 fixed top-16">
      {searchResults?.map(({ title, _id, username, userimg }) => (
        <>
          <div key={title}>
            <h2 className="line-clamp-2 my-1 font-semibold ">{title}</h2>
          </div>
          <p className=" font-light text-sm"> {username} </p>
        </>
      ))}
    </div>
  );
}

export default SearchResults;
