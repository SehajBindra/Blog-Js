import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import CategoryBtns from "./CategoryBtns";
import { useRouter } from "next/router";

function Widgets() {
  const router = useRouter();
  return (
    <div className="md:inline  md:col-span-2 p-4     hidden ">
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
      {/* <div className="">
        <CategoryBtns />
      </div> */}

      <div className="cursor-pointer">
        <div className=" my-8 text-base font-bold text-[#959595] text-opacity-[95%] gap-2  text-ellipsis grid grid-cols-3">
          <p className=" hover:underline hover:decoration-text-gray-400">
            About us
          </p>
          <p className="link col-span-2">Terms & Conditions</p>
          <p
            onClick={() => router.push("/privacy")}
            className="link whitespace-nowrap"
          >
            Privacy policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Widgets;
