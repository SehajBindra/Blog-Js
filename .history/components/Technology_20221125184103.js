import React from "react";

function Technology({ tech }) {
  return (
    <div>
      <h2 className="text-white font-semibold text-lg ">{tech.title}</h2>
    </div>
  );
}

export default Technology;
