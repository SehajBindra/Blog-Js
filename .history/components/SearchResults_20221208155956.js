import React from "react";

function SearchResults({ searchresults }) {
  console.log(searchresults);
  return (
    <div>
      {searchresults?.map((searchresults) => (
        <div key={title}>
          <h2>{searchresults.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
