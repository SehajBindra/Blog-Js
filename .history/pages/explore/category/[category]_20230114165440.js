import React from "react";
import Head from "next/head";
// import Header from "../../components/Header";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../../components/Header"));
import { connectToDatabase } from "../../../util/mongodb2";
import { Toaster } from "react-hot-toast";
import SingleCategory from "../../../components/SingleCategory";
import CategoryBtns from "../../../components/CategoryBtns";
// const SinglePost = dynamic(() => import("../../components/SinglePost"));
// import SinglePost from "../../components/SinglePost";

function PostDetails({ category }) {
  console.log(category);
  return (
    <>
      <div>
        <Head>
          <title>{category?.title} </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta
            name="description"
            content={`Learn more about ${category?.title}`}
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
        <SingleCategory category={category} />
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
  console.log(name);

  const posts = await db.collection("products").find(
    // { category: name },
    { category: { $elemMatch: { name: "Technology" } } }

    // {
    //   projection: {
    //     title: 1,
    //     _id: 1,
    //     // desc: 1,
    //     createdAt: 1,
    //     userimg: 1,
    //     username: 1,
    //     img: 1,
    //     slug: 1,
    //   },
    // }
  );
  console.log(posts);
  return {
    props: {
      category: JSON.parse(JSON.stringify(posts)),
    },
    revalidate: 1,
  };
}
