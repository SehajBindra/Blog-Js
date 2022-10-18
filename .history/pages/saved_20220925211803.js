import React from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../redux/slices/basketSlice";

function saved() {
  const items = useSelector(selectItems);
  return (
    <div>
      <p>{items.length} </p>
    </div>
  );
}

export default saved;
