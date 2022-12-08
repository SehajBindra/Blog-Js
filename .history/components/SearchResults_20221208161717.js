import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  const data = Array.from(searchResults.data);
  return (
    <div className="fixed z-10 bg-black text-white h-[10rem]">
      {data?.map((title, slug) => (
        <h2>{title}</h2>
      ))}
    </div>
  );
}

export default SearchResults;
