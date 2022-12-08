import React from "react";

function SearchResults({ searchresults }) {
  console.log(searchresults);
  return (
    <div>
      {searchresults.map((data) => (
        <div key={data.title}>
          <h2>{data.data.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
