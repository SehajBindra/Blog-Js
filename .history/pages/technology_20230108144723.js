import React, { useState } from "react";

// import Modal from "../components/Modal";
import { connectToDatabase } from "../util/mongodb2";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
const Header = dynamic(() => import("../components/Header"));
// import Header from "../components/Header";
// const CategoryBtns = dynamic(() => import("../components/CategoryBtns"), {
//   ssr: false,
// });
const Modal = dynamic(() => import("../components/Modal"), {
  ssr: false,
});
const Category = dynamic(() => import("../components/Category"), {
  ssr: false,
});
// import Category from "../components/Category";

import CategoryBtns from "../components/CategoryBtns";
import Explore from "../components/Explore";
function technology({ category }) {
  const [visible, setVisible] = useState(8);

  const showmoreItems = () => {
    setVisible((prevValue) => prevValue + 8);
  };
  return (
    <>
      <div className="bg-black h-screen overflow-y-auto">
        <Head>
          <title>Blog JS | Technology</title>
          <meta property="technology" content="technology - Blog JS" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link rel="icon" href="/logo.jpeg" />
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
          {category.slice(4, visible).map((category) => (
            <Category category={category} key={category._id} />
          ))}
        </div>
        <div className="flex items-center justify-center text-center flex-row mx-auto space-x-2 pb-[4rem]">
          <button onClick={showmoreItems} className="loadMore">
            {" "}
            Load more{" "}
          </button>

          <ArrowDownIcon className="arrow" />
        </div>
      </div>
      <Modal />
    </>
  );
}

export default technology;

export async function getStaticProps() {
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
        slug: category.slug,
        username: category.username.trim(),
        userimg: category.userimg,
        createdAt: category.createdAt.toISOString(),
      })),
    },

    revalidate: 1,
  };
}
