import React from "react";
import Image from "next/image";
function Saved({ id, username, userImg, img, title }) {
  return (
    <div className="bg-black   overflow-y-auto text-white">
      <h1>{title}</h1>

      <Image
        className="rounded-lg shadow-2xl"
        width={200}
        height={200}
        src={img}
        alt=""
      />
    </div>
  );
}

export default Saved;
