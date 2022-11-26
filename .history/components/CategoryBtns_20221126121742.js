import { useRouter } from "next/router";
import React from "react";
import { Tab } from "@headlessui/react";

const categories = [
  { id: 1, name: "Programing", link: "/programing" },
  { id: 2, name: "Technology", link: "/technology" },
  { id: 3, name: "saved", link: "/saved" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function CategoryBtns() {
  const router = useRouter();
  return (
    <>
      <div className="w-full max-w-sm px-2 py-4 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex flex-row justify-center rounded-md max-w-xs bg-black space-x-2 p-1">
            {object.values(categories).map((category) => (
              <Tab
                onClick={() => router.push(`${category.link}`)}
                key={category.id}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
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
