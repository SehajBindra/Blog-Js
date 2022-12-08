import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return (
    <div>
      {searchResults.map((data) => (
        <div key={data.data.title}>
          <h2>{data.data.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
