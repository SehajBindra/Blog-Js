import React from "react";
import Image from "next/image";
function Saved({ id, username, userImg, img, title }) {
  return (
    <div className="bg-black flex   flex-col overflow-x-scroll  scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  overflow-y-auto text-white">
      <div className="flex flex-row px-8  my-8 ">
        <Image
          className="rounded-lg shadow-2xl flex-row image"
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
