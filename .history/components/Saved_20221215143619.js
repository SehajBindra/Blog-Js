import React from "react";

function Saved({ id, username, userImg, img, title }) {
  return (
    <div>
      <h1>{title}</h1>

      <img className="h-60" src={img} alt="" />
    </div>
  );
}

export default Saved;
