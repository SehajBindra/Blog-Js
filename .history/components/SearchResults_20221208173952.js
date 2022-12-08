import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return (
    <div className="shadow-lg bg-black  overflow-y-auto py-4  p-4 text-white flex flex-col justify-center align-middle w-56 rounded-md  z-10 fixed top-16">
      {searchResults?.map(({ title }) => (
        <div key={title}>
          <h2 className="line-clamp-2 my-1 border-b  border-gray-800">
            {title}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
