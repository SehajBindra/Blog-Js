import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return (
    <div>
      <p className="text-white">{searchResults.title}</p>
    </div>
  );
}

export default SearchResults;
