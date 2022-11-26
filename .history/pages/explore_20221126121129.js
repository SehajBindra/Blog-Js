import Head from "next/head";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Header from "../components/Header";

function explore() {
  const [text] = useTypewriter({
    words: ["Explore by categories", "Discover that matters to you"],
    loop: true,
    delaySpeed: 2600,
  });
  return (
    <div>
      <div className="bg-black h-screen">
        <Head>
          <title>Blog JS | Technology</title>
          <link
            rel="icon"
            href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
          />
        </Head>
        <div>
          <Header />
          <Toaster />
        </div>

        <div className="flex  items-center justify-center  top-0 sticky z-50 bg-black  py-4">
          {" "}
          <h2 className="text-2xl font-semibold text-[#E23E57] text-center ">
            {" "}
            <span>{text}</span>
            <Cursor cursorColor="#E23E57" />
          </h2>
        </div>
        <div className="  flex flex-col justify-center items-center align-middle mb-4">
          <CategoryBtns />
        </div>
      </div>
    </div>
  );
}

export default explore;
