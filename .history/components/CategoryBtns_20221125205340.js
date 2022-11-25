import React from "react";

const categories = [
  { name: "Technology" },
  { name: "Programing" },
  { name: "Data Science" },
  { name: "Web-Development" },
  { name: "Artificial Intelligence" },
  { name: "Entertainment" },
  { name: "Gaming" },
  { name: "Sports" },
  { name: "crypto" },
  { name: "Stock market" },
  { name: "others" },
];

function CategoryBtns() {
  return (
    <div className="fixed">
      <h2 className="my-4 ">Discover that matters to you..</h2>

      {categories.map((category) => (
        <div
          className="grid grid-cols-4   items-center my-2"
          key={category.name}
        >
          <button className="py-2 px-2 col-span-4 rounded-md items-center text-sm text-black bg-white">
            {category.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default CategoryBtns;
