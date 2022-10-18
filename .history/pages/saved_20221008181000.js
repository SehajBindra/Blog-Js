import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Modal from "../components/Modal";

import Sidebar from "../components/Sidebar";
import { selectItems } from "../redux/slices/basketSlice";

function saved() {
  const items = useSelector(selectItems);
  return (
    <div>
      <Header />
      <Sidebar />
      {items.map((item) => (
        <div key={item.title}>
          <h2> {item.title} </h2>
        </div>
      ))}

      <Modal />
    </div>
  );
}

export default saved;
