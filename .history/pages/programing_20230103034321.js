import React from "react";
import { connectToDatabase } from "../util/mongodb2";

import Head from "next/head";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"));
// import Header from "../components/Header";
const Modal = dynamic(() => import("../components/Modal"), {
  ssr: false,
});
// import Modal from "../components/Modal";
const Category = dynamic(() => import("../components/Category"));
// import Category from "../components/Category";
// const CategoryBtns = dynamic(() => import("../components/CategoryBtns"), {
//   ssr: false,
// });
import CategoryBtns from "../components/CategoryBtns";
import Explore from "../components/Explore";
// const Explore = dynamic(() => import("../components/CategoryBtns"), {
//   ssr: false,
// });

function programing({ category }) {
  return (
    <div>
      <Head>
        <title>Blog JS | Programing</title>
        <link
          rel="icon"
          href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
        />

        <meta property="programing" content="programing - Blog js" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <div>
        <Header />
        {/* <Toaster /> */}
      </div>

      <Explore />

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

export async function getServerSideProps({ res }) {
  const { db } = await connectToDatabase();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=43200, stale-while-revalidate=60"
  );

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
        slug: category.slug,
        username: category.username.trim(),
        userimg: category.userimg,
        createdAt: category.createdAt.toISOString(),
      })),
    },
  };
}
