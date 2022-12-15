import React from "react";
import Image from "next/image";
function Saved({ id, username, userImg, img, title }) {
  return (
    <div className="bg-black  grid  grid-cols-4 flex-row   overflow-y-auto text-white">
      <div className="flex flex-col    ">
        <Image
          className="rounded-lg shadow-2xl   image"
          width={300}
          height={200}
          src={img}
          alt="saved img"
        />
      </div>

      {/* <h1>{title}</h1> */}
    </div>
  );
}

export default Saved;
