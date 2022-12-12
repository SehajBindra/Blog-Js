import React from "react";
import { connectToDatabase } from "../util/mongodb2";

import Head from "next/head";

import Header from "../components/Header";

import Modal from "../components/Modal";

import Category from "../components/Category";
import CategoryBtns from "../components/CategoryBtns";

function programing({ category }) {
  return (
    <div>
      <Head>
        <title>Blog JS | Programing</title>
        <link
          rel="icon"
          href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
        />
      </Head>
      <div>
        <Header />
        {/* <Toaster /> */}
      </div>

      <div className="  bg-black flex flex-col justify-center items-center ">
        <CategoryBtns />
      </div>

      <div className="flex bg-black text-white h-screen flex-col overflow-x-auto overflow-y-auto  scrollbar-hide pb-[8rem]">
        {category.map((category) => (
          <Category category={category} key={category._id} />
        ))}
      </div>

      <Modal />
    </div>
  );
}

export default programing;

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const category = await db
    .collection("products")
    .find({ category: { name: "Programing" } })
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
