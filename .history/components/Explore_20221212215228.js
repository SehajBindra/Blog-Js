import React from "react";
import { Cursor } from "react-simple-typewriter";
import { useTypewriter } from "react-simple-typewriter";

function Explore() {
  const [text] = useTypewriter({
    words: ["Explore by categories", "Discover that matters to you"],
    loop: true,
    delaySpeed: 2600,
  });
  return (
    <div className=" p-4">
      <h2 className="text-xl font-semibold text-[#E23E57] text-center ">
        {" "}
        <span>{text}</span>
        <Cursor cursorColor="#E23E57" />
      </h2>
    </div>
  );
}

export default Explore;
