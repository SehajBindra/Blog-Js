import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Modal from "../components/Modal";

import Sidebar from "../components/Sidebar";
import { selectItems } from "../redux/slices/basketSlice";

function saved() {
  const items = useSelector(selectItems);
  console.log(items);
  return (
    <>
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="flex flex-row  items-center  mx-auto">
        {items.map((item) => (
          <div
            className="flex flex-col flex-shrink-0 mx-16  h-[20rem] w-[20rem] my-10"
            key={item._id}
          >
            <img
              className=" flex-shrink-0 object-cover  rounded-lg"
              src={item.image}
              alt=""
            />
            <h2 className="line-clamp-1 "> {item.title} </h2>
            <h3 className="line-clamp-2 text-xs text-gray-500 my-2">
              {item.description}
            </h3>
          </div>
        ))}

        <Modal />
      </div>
    </>
  );
}

export default saved;
