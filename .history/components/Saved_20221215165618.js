import React from "react";
import Image from "next/image";
function Saved({ id, username, userImg, img, title }) {
  return (
    <div className="bg-black flex flex-row  overflow-y-auto text-white">
      <div className="flex flex-row justify-between">
        <Image
          className="rounded-lg shadow-2xl image"
          width={300}
          height={200}
          src={img}
          alt="saved img"
        />
      </div>

      <h1>{title}</h1>
    </div>
  );
}

export default Saved;
