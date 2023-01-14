import React from "react";
import Head from "next/head";
// import Header from "../../components/Header";
import dynamic from "next/dynamic";

import { connectToDatabase } from "../../../util/mongodb2";
// import { Toaster } from "react-hot-toast";
const Header = dynamic(() => import("../../../components/Header"));
const Category = dynamic(() => import("../../../components/Category"));
const Modal = dynamic(() => import("../../../components/Modal"), {
  ssr: false,
});
import CategoryBtns from "../../../components/CategoryBtns";
// import Category from "../../../components/Category";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
const Explore = dynamic(() => import("../../../components/Explore"));
// import Explore from "../../../components/Explore";

function PostDetails({ category }) {
  //   console.log(category);
  return (
    <>
      <div>
        <Head>
          <title>Blog JS | Explore</title>
          <link rel="icon" href="/logo.jpeg" />

          <meta property="Explore" content="Explore-Blog JS" />
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

        <div className="flex scrollbar-hide  overflow-y-scroll bg-black text-white  flex-col    pb-16">
          {category.slice(0, visible).map((category) => (
            <Category category={category} key={category._id} />
          ))}
          <div
            onClick={showmoreItems}
            className="flex items-center justify-center text-center  mx-auto space-x-2 pb-16"
          >
            <button className="loadMore "> Load more </button>

            <ArrowDownIcon className="arrow" />
          </div>
        </div>

        <Modal />
      </div>
    </>
  );
}

export default PostDetails;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();

  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=43200, stale-while-revalidate=60"
  // );
  const name = params.category;
  //   console.log(name);

  const category = await db
    .collection("products")
    .find({ category: { name } })
    .sort({ $natural: -1 })
    .toArray();

  //   console.log("posts ===> ", category);
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
    revalidate: 1,
  };
}
