import { useRouter } from "next/router";
import React from "react";

const categories = [
  { name: "Technology", link: "/technology" },
  { name: "Programing", link: "/programing" },
];

function CategoryBtns() {
  const router = useRouter();
  return (
    <>
      <h2 className="my-8  hidden md:inline ">
        Discover that matters to you..
      </h2>
      <div className="flex flex-row overflow-y-scroll scrollbar-hide  md:flex  items-center space-x-2 ">
        {categories.map((category) => (
          <div
            className="flex flex-row whitespace-nowrap  items-center my-2"
            key={category.name}
          >
            <button
              onClick={() => router.push(`${category.link}`)}
              className="py-2 px-2  rounded-md items-center text-sm text-black bg-white"
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryBtns;
