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
      <div className="flex flex-row justify-center align-middle items-center min-h-[400px] mx-auto">
        {items.map((item) => (
          <div className=" flex-shrink-0 h-40 w-80 my-10" key={item.title}>
            <img
              className=" flex-shrink-0 object-cover  rounded-md"
              src={item.image}
              alt=""
            />
            <h2> {item.title} </h2>
          </div>
        ))}

        <Modal />
      </div>
    </>
  );
}

export default saved;
