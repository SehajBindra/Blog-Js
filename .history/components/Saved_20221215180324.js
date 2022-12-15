import React from "react";
import Image from "next/image";
function Saved({ id, username, userImg, img, title }) {
  return (
    <div className="flex bg-black text-white   flex-col  overflow-y-auto scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      <div className="flex flex-row px-8  my-8 ">
        <div className=" cursor-pointer md:mt-4">
          <h2 className="line-clamp-1 "> {title} </h2>

          {/* <h3 className="line-clamp-2 text-xs text-gray-500 my-2">
            {" "}
            {Parser(`${item.description}`)}
          </h3> */}

          <div className="flex flex-row items-center space-x-2">
            <img className="rounded-full h-5" src={userImg} alt="" />
            <p className="flex-1 text-base whitespace-nowrap ">{username}</p>
          </div>
        </div>
      </div>

      {/* <Modal /> */}
    </div>
  );
}

export default Saved;
