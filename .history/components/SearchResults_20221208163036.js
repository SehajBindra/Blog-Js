import React from "react";

function SearchResults({ searchResults }) {
  let results =
    searchResults && searchResults.results.length > 0 ? (
      results.map((p) => (
        <li className="partners" key={p._id}>
          {p.title}{" "}
        </li>
      ))
    ) : (
      <span></span>
    );

  console.log(searchResults);

  return (
    <div className="fixed z-10 bg-black text-white h-[10rem]">
      {/* {data?.map((title, slug) => (
        <h2>{title}</h2>
      ))} */}
      <ul>{results}</ul>
    </div>
  );
}

export default SearchResults;
