import React from "react";

const categories = [{ name: "Technology" }, { name: "Programing" }];

function CategoryBtns() {
  return (
    <>
      <h2 className="my-4  ">Discover that matters to you..</h2>
      <div className="fixed flex flex-row">
        {categories.map((category) => (
          <div className="flex   items-center my-2" key={category.name}>
            <button className="py-2 px-2 flex flex-row rounded-md items-center text-sm text-black bg-white">
              {category.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryBtns;
