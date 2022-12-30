import React from "react";

// import Modal from "../components/Modal";
import { connectToDatabase } from "../util/mongodb2";
import dynamic from "next/dynamic";
import Head from "next/head";
import Header from "../components/Header";
const CategoryBtns = dynamic(() => import("../components/CategoryBtns"), {
  ssr: false,
});
const Modal = dynamic(() => import("../components/Modal"), {
  ssr: false,
});
const Category = dynamic(() => import("../components/Category"));
// import Category from "../components/Category";

// import CategoryBtns from "../components/CategoryBtns";
import Explore from "../components/Explore";
function technology({ category }) {
  return (
    <>
      <div className="bg-black h-screen overflow-y-auto">
        <Head>
          <title>Blog JS | Technology</title>
          <link
            rel="icon"
            href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
          />
        </Head>
        <div>
          <Header />
          {/* <Toaster /> */}
        </div>

        <Explore />
        <div className="  flex flex-col justify-center items-center align-middle mb-4">
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

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=43200, stale-while-revalidate=60"
  );

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
