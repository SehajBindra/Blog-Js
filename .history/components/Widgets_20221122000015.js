import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

function Widgets() {
  return (
    <div className="md:col-span-2 border-l border-gray-800 mt-2 px-2 hidden md:inline lg:inline">
      {/* Search */}
      <div className="flex items-center space-x-2 bg-transparent  rounded-full mt-2 mb-2">
        <MagnifyingGlassIcon className="h-5 w-5 " />
        <input
          className="bg-transparent flex-1 outline-none"
          type="text"
          placeholder="Search "
        />
      </div>

      <div>
        <img
          className="rounded-full object-cover w-56 h-56"
          src="https://img.freepik.com/premium-vector/hand-drawn-collection-startup_7243-321.jpg?w=2000"
          alt=""
        />
      </div>
    </div>
  );
}

export default Widgets;
