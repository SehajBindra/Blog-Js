import React from "react";
import Image from "next/image";
function Saved({ id, username, userImg, img, title }) {
  return (
    <div className="bg-black   overflow-y-auto text-white">
      <h1>{title}</h1>

      <Image width={400} height={400} src={img} alt="" />
    </div>
  );
}

export default Saved;
