import { useRouter } from "next/router";
import React from "react";
import { Tab } from "@headlessui/react";

const categories = [
  { name: "Programing", link: "/programing" },
  { name: "Technology", link: "/technology" },
];

function CategoryBtns() {
  const router = useRouter();
  return (
    <>
      <div className="w-full max-w-sm px-2 py-8 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex flex-row justify-center rounded-md max-w-xs bg-black space-x-2 p-1">
            {categories.map((category) => (
              <Tab
                onClick={() => router.push(`${category.link}`)}
                key={category.name}
                className={({ selected }) =>
                  selected
                    ? "rounded-lg bg-white px-4  py-2  text-[#ff2369] shadow-xl focus-within:outline-none active:outline-none"
                    : "rounded-md px-3 py-2 text-[#ff2369] hover:bg-white"
                }
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="text-white">hello</Tab.Panel>
          </Tab.Panels>

          <Tab.Panels className="mt-2">
            <Tab.Panel className="text-white">hello 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

export default CategoryBtns;