import React from "react";

function SearchResults({ searchResults }) {
  return (
    <div>
      {searchResults.map((title, slug, username, category, userimg) => (
        <h2>{title}</h2>
      ))}
    </div>
  );
}

export default SearchResults;
