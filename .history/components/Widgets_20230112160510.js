import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import CategoryBtns from "./CategoryBtns";

function Widgets() {
  return (
    <div className="md:inline  md:col-span-2     hidden ">
      {/* Search */}
      {/* <div className="flex items-center space-x-2 bg-transparent  rounded-full mt-2 mb-2">
        <MagnifyingGlassIcon className="h-5 w-5 " />
        <input
          className="bg-transparent flex-1 outline-none"
          type="text"
          placeholder="Search "
        />
      </div> */}
      <div>
        <h2 className="my-2 hidden md:inline text-white">
          Recommended Topics ~{" "}
        </h2>
      </div>
      <div className="divide-y divide-gray-400">
        <CategoryBtns />
      </div>
      <div className=" text-base text-[#959595] gap-2  text-ellipsis grid grid-cols-3">
        <p>About us</p>
        <p className="col-span-2">Terms & Conditions</p>
        <p className="whitespace-nowrap">Privacy policy</p>
      </div>
    </div>
  );
}

export default Widgets;
