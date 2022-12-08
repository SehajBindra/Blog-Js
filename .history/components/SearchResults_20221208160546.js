import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return (
    <div className="fixed z-10 bg-black text-white h-[10rem]">
      <p className="text-white">{searchResults.title}</p>
    </div>
  );
}

export default SearchResults;
