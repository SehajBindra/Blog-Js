import { useRouter } from "next/router";
import React from "react";
import { Tab } from "@headlessui/react";

const categories = [
  { id: 1, name: "Programing" },
  { id: 2, name: "Technology" },
  { id: 3, name: "Bca" },
];

function CategoryBtns() {
  const router = useRouter();

  return (
    <>
      <div className="w-full  px-4 py-2 ">
        <Tab.Group defaultIndex={router.query.name === "Programing" ? 0 : 1}>
          <Tab.List className="   grid grid-cols-3 gap-4 whitespace-nowrap justify-center  rounded-md sm:grid sm:grid-cols-3 truncate  sm:gap-2  bg-black ">
            {categories.map((category) => (
              <Tab
                onClick={() => router.push(`/Explore?name=${category.name}`)}
                key={category.id}
                className={({ selected }) =>
                  selected
                    ? "rounded-lg bg-purple-400 px-4  py-2  text-white font-medium  focus-within:outline-none active:outline-none"
                    : "rounded-md px-4 py-2 text-[#ff2369] bg-white"
                }
              >
                <h2> {category.name} </h2>
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
    </>
  );
}

export default CategoryBtns;
