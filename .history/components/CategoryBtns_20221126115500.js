import { useRouter } from "next/router";
import React from "react";
import { Tab } from "@headlessui/react";

const categories = [
  { name: "Technology", link: "/technology" },
  { name: "Programing", link: "/programing" },
];

function CategoryBtns() {
  const router = useRouter();
  return (
    <>
      <div className="w-full max-w-sm px-2 py-4 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex flex-row justify-center rounded-md max-w-xs bg-black space-x-2 p-1">
            {categories.map((category) => (
              <Tab
                onClick={() => router.push(`${category.link}`)}
                key={category.name}
                className={({ selected }) =>
                  selected
                    ? "rounded-md px-4 py-2 text-[#ff2369] bg-blue-300   "
                    : " rounded-md bg-white px-4  py-2  text-[#ff2369]  focus-within:outline-none active:outline-none"
                }
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
    </>
  );
}

export default CategoryBtns;
