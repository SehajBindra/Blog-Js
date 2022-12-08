import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return (
    <div className="shadow-xl w-80">
      {searchResults?.map(({ title }) => (
        <div key={title}>
          <h2>{title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
