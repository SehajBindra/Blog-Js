import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return (
    <div className="shadow-xl w-72 bg-transparent rounded-md pb-32 z-10 fixed top-16">
      {searchResults?.map(({ title }) => (
        <div key={title}>
          <h2 className="line-clamp-1 ">{title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
