import React from "react";
import Image from "next/image";
function Saved({ id, username, userImg, img, title }) {
  return (
    <div className="bg-black grid grid-cols-8  overflow-y-auto text-white">
      <div className="col-span-4  ">
        <Image
          className="rounded-lg shadow-2xl image"
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
