import React from "react";

import Modal from "../components/Modal";
import { connectToDatabase } from "../util/mongodb2";

import Head from "next/head";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

import Category from "../components/Category";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import CategoryBtns from "../components/CategoryBtns";
function technology({ category }) {
  const [text] = useTypewriter({
    words: ["Explore by categories", "Discover that matters to you"],
    loop: true,
    delaySpeed: 2600,
  });
  return (
    <>
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
        <div className=" sm:hidden flex flex-col justify-center items-center mb-4">
          <CategoryBtns />
        </div>

        <div className=" bg-black text-white h-screen">
          {category.map((category) => (
            <Category category={category} key={category._id} />
          ))}
        </div>
      </div>
      <Modal />
    </>
  );
}

export default technology;

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const category = await db
    .collection("products")
    .find({ category: { name: "Technology" } })
    .sort({ $natural: -1 })
    .toArray();

  return {
    props: {
      category: category.map((category) => ({
        _id: category._id.toString(),
        title: category.title.trim(),
        img: category.img,
        username: category.username,
        userimg: category.userimg,
        createdAt: category.createdAt.toISOString(),
      })),
    },
  };
}
