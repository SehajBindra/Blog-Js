import React from "react";

function SearchResults({ searchResults }) {
  console.log(searchResults);
  return searchResults?.map(
    ({ title, slug, createdAt, totalViews, readingTime, description }) => (
      <h1>{title}</h1>
    )
  );
}

export default SearchResults;
