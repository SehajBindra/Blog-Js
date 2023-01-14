import React from "react";

function SingleCategory({ category }) {
  return (
    <div className="h-screen bg-black text-white">
      SingleCategory
      {category.title}
    </div>
  );
}

export default SingleCategory;
