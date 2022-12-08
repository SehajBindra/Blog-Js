import React from "react";

function SearchResults({ searchresults }) {
  console.log(searchresults);
  return (
    <div>
      {searchresults?.map(({ title }) => (
        <div key={title}>
          <h2>{title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
