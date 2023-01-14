import React from "react";
import Head from "next/head";
// import Header from "../../components/Header";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../../components/Header"));
import { connectToDatabase } from "../../../util/mongodb2";
import { Toaster } from "react-hot-toast";

import CategoryBtns from "../../../components/CategoryBtns";
import Category from "../../../components/Category";
// const SinglePost = dynamic(() => import("../../components/SinglePost"));
// import SinglePost from "../../components/SinglePost";

function PostDetails({ category }) {
  //   console.log(category);
  return (
    <>
      <div>
        <Head>
          <title>BlogJS || Explore </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
          />
          <meta
            name="description"
            content={`Learn more about ${category.title}`}
          />
          <link rel="icon" href="/logo.jpeg" />
        </Head>
      </div>

      <Header />
      <Toaster />
      <div className=" bg-black text-white items-center align-middle flex-col flex    py-8  px-12  ">
        <div className="  bg-black flex flex-col justify-center items-center ">
          <CategoryBtns />
        </div>
        {category.map((category) => (
          <Category category={category} key={category._id} />
        ))}
        {/* <Category category={category} /> */}
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
