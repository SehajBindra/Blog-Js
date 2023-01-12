import React, { useState } from "react";
import { useRouter } from "next/router";
import { connectToDatabase } from "../util/mongodb2";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
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
// import Explore from "../components/Explore";
// const Explore = dynamic(() => import("../components/CategoryBtns"), {
//   ssr: false,
// });

function Hello({ category }) {
  const [visible, setVisible] = useState(8);

  const showmoreItems = () => {
    setVisible((prevValue) => prevValue + 8);
  };

  return (
    <div>
      <Head>
        <title>Blog JS | Programing</title>
        <link rel="icon" href="/logo.jpeg" />

        <meta property="programing" content="programing - Blog JS" />
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

      <div className="flex bg-black text-white  flex-col   scrollbar-hide pb-16">
        {category.slice(4, visible).map((category) => (
          <Category category={category} key={category._id} />
        ))}
        <div
          onClick={showmoreItems}
          className="flex items-center justify-center text-center flex-row mx-auto space-x-2 pb-16"
        >
          <button className="loadMore "> Load more </button>

          <ArrowDownIcon className="arrow" />
        </div>
      </div>

      <Modal />
    </div>
  );
}

export default Hello;

export async function getStaticProps(context) {
  console.log("context==>", context.query);
  // let { name } = context.query;
  //   console.log("context== >", name, context.query);

  const { db } = await connectToDatabase();
  //   http://localhost:3000/Explore?category=Programing

  //    GET http://localhost:3000/Explore?name=Programing 404 (Not Found)
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
        slug: category.slug.trim(),
        username: category.username.trim(),
        userimg: category.userimg,
        createdAt: category.createdAt.toISOString(),
      })),
    },

    revalidate: 30,
  };
}
