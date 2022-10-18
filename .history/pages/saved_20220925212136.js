import React from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../redux/slices/basketSlice";

function saved() {
  const items = useSelector(selectItems);
  return (
    <div>
      {items.map((item) => (
        <h2> {item.title} </h2>
      ))}
    </div>
  );
}

export default saved;
