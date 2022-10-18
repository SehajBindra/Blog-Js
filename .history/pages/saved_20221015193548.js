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
      <div className="flex flex-row overflow-x-scroll scrollbar-hide  items-center   mx-auto">
        {items.map((item) => (
          <div
            className="flex flex-col h-80 w-80 items-center justify-center align-middle px-8  md:h-[25rem] md:w-[25rem] my-8 "
            key={item._id}
          >
            <img
              className="flex-shrink-0  sm:h-[10rem] sm:w-[30rem] object-cover  rounded-lg"
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
