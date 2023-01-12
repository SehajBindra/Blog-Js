import React from "react";
import Header from "../components/Header";

function privacy() {
  return (
    <div className="bg-black h-screen text-white overflow-y-scroll">
      <div>
        <Header />
      </div>

      <div className="max-w-5xl flex flex-col align-middle justify-center">
        <h2 className="text-2xl  underline-2 decoration-1  decoration-white">
          Privcy Policy
        </h2>

        <div>
          <h2>Interpretation and Definitions</h2>
        </div>
      </div>
    </div>
  );
}

export default privacy;
