import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return (
    <div>
      {searchResults.map((searchResults) => (
        <div key={searchResults._id}>
          <h2>{title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
