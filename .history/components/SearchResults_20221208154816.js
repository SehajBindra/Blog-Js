import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return (
    <div>
      {data.map((data) => (
        <div key={data.title}>
          <h2>{data.data.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
