import { useRouter } from "next/router";
import React from "react";
import { Tab } from "@headlessui/react";

const categories = [
  { id: 1, name: "Programing" },
  { id: 2, name: "Technology" },
  { id: 3, name: "Bca" },
  { id: 4, name: "React js" },
];

function CategoryBtns() {
  const router = useRouter();

  return (
    <>
      <div className="w-full  max-w-5xl  py-2 ">
        <Tab.Group defaultIndex={router.query.name === "Programing" ? 0 : 1}>
          <Tab.List className="flex flex-row  items-center overflow-x-scroll scrollbar-hide whitespace-nowrap justify-center space-x-4 rounded-md max-w-lg bg-black  p-1">
            {categories.map((category) => (
              <Tab
                onClick={() =>
                  router.push(`/explore/category/${category.name}`)
                }
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
