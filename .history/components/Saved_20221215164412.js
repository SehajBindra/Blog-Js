import React from "react";

function Saved({ id, username, userImg, img, title }) {
  return (
    <div className="bg-black grid grid-cols-8 gap-4  overflow-y-auto text-white">
      <h1>{title}</h1>

      <img className="h-60" src={img} alt="" />
    </div>
  );
}

export default Saved;
