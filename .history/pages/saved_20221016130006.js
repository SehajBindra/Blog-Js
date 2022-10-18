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
        {/* <Sidebar /> */}
      </div>
      <div className="flex flex-row overflow-x-scroll  scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div className="flex flex-col px-8  my-8 " key={item._id}>
            <div className=" my-24 h-60 w-72 md:h-80 md:w-80    sm:my-8">
              <img
                className="rounded-md  hover:opacity-80 hover:shadow-lg w-[20rem] h-[20rem] transition duration-200 ease-out  cursor-pointer object-cover flex-shrink-0"
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
