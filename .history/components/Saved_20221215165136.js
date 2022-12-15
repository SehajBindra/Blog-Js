import React from "react";
import Image from "next/image";
function Saved({ id, username, userImg, img, title }) {
  return (
    <div className="bg-black   overflow-y-auto text-white">
      <div>
        <Image
          className="rounded-lg shadow-2xl "
          width={300}
          height={200}
          src={img}
          alt=""
        />
      </div>

      <h1>{title}</h1>
    </div>
  );
}

export default Saved;
