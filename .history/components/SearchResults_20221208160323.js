import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return <div>{searchResults.title}</div>;
}

export default SearchResults;
