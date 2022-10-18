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
      <div className="flex flex-row overflow-x-scroll scrollbar-hide">
        {items.map((item) => (
          <div
            className="flex flex-col  items-center justify-center align-middle px-4  my-8 "
            key={item._id}
          >
            <div className="my-4 flex-shrink-0">
              <img
                className="rounded-md h-[10rem]  w-[10rem] hover:opacity-80 hover:shadow-lg  transition duration-200 ease-out  cursor-pointer object-cover flex-shrink-0"
                src={item.image}
                alt=""
              />
            </div>

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
