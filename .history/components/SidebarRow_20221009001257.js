import React from "react";
import Modal from "./Modal";

function SidebarRow({ Icon, title, onclick }) {
  return (
    <div
      onClick={() => onclick?.()}
      className="flex max-w-fit items-center space-x-2 py-3 px-4 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 group "
    >
      {Icon && <Icon className=" h-7 w-7" />}
      <p
        onClick={() => Setopen(true)}
        className=" text-base text-left hidden md:inline-flex  lg:text-xl group-hover:text-twitter"
      >
        {" "}
        {title}
      </p>
      <Modal />
    </div>
  );
}

export default SidebarRow;
