import { useRouter } from "next/router";
import React from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";

const categories = [
  { id: 1, name: "Programing", link: "/programing" },
  { id: 2, name: "Technology", link: "/technology" },
];

function CategoryBtns() {
  const router = useRouter();
  return (
    <>
      <h2 className="my-2 hidden md:inline">Recommended Topics ~ </h2>
      <div className="w-full max-w-sm px-4 py-4 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex flex-row justify-center rounded-md max-w-xs bg-black space-x-2 p-1">
            {categories.map((category) => (
              <Tab
                onClick={() => router.push(`${category.link}`)}
                key={category.id}
                className={({ selected }) =>
                  selected
                    ? "rounded-lg bg-white px-4  py-2  text-[#ff2369]  focus-within:outline-none active:outline-none"
                    : "rounded-md px-4 py-2 text-[#ff2369] hover:bg-white"
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
