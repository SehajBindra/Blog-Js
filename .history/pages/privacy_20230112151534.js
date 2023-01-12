import React from "react";
import Header from "../components/Header";
import Privacy from "../components/Privacy";

function privacy() {
  return (
    <div className="bg-black h-screen text-white overflow-y-scroll pb-16">
      <div>
        <Header />
      </div>

      <div>
        <Privacy />
      </div>
    </div>
  );
}

export default privacy;
