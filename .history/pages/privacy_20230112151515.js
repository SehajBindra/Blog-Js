import React from "react";
import Header from "../components/Header";
import Privacy from "../components/Privacy";
import Sidebar from "./../components/Sidebar";

function privacy() {
  return (
    <div className="bg-black  text-white overflow-y-scroll pb-16">
      <div>
        <Header />
        <Sidebar />
      </div>

      <div>
        <Privacy />
      </div>
    </div>
  );
}

export default privacy;
