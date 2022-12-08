import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return (
    <div>
      {searchResults.map((data) => (
        <div key={data._id}>
          <h2>{title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
