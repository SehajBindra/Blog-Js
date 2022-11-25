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
    <div className="flex flex-col items-center my-8  ">
      <h2 className="my-4">Discover that matters to you..</h2>

      {categories.map((category) => {
        <div key={category.name}>
          <button className="py-2 px-2 rounded-lg items-center text-sm text-white bg-blue-400">
            {category.name}
          </button>
        </div>;
      })}
    </div>
  );
}

export default CategoryBtns;
