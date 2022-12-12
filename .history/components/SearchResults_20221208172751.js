import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return (
    <div className="shadow-lg bg-white  overflow-y-auto  p-5 text-black flex flex-col justify-center align-middle w-72 rounded-md  z-10 fixed top-16">
      {searchResults?.map(({ title }) => (
        <div key={title}>
          <h2 className="line-clamp-2 my-1 ">{title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;