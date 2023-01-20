import React from "react";
import Head from "next/head";
// import Header from "../../components/Header";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../components/Header"));
import { connectToDatabase } from "../../util/mongodb2";
import { Toaster } from "react-hot-toast";
const SinglePost = dynamic(() => import("../../components/SinglePost"));
// import SinglePost from "../../components/SinglePost";

function PostDetails({ post }) {
  return (
    <>
      <div>
        <Head>
          {/* <!-- Primary Meta Tags --> */}
          <title>{` ${post?.title}`} </title>
          <meta name="title" content="Blog JS " />
          <meta name="description" content={` ${post?.desc}`} />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blogjs.tech/" />
          <meta property="og:title" content={` ${post?.title}`} />
          <meta property="og:description" content={` ${post?.desc}`} />
          <meta property="og:image" content="/logo.jpeg" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="/logo.jpeg" />
          <meta
            property="twitter:url"
            content={`https://blogjs.tech/blog/${post?.slug}`}
          />
          <meta property="twitter:title" content={` ${post?.title}`} />
          <meta property="twitter:description" content={` ${post?.desc}`} />
          <meta property="twitter:image" content="/logo.jpeg"></meta>
          <title>{` ${post?.title}`} </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="description" content={` ${post?.desc}`} />
          <link rel="icon" href="/logo.jpeg" />
        </Head>
      </div>

      <Header />
      <Toaster />
      <div className=" bg-black text-white items-center align-middle flex-col flex    py-8  px-12  ">
        <SinglePost post={post} />
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
  const slug = params.slug;

  const posts = await db.collection("products").findOne(
    { slug: slug },

    {
      projection: {
        title: 1,
        _id: 1,
        desc: 1,
        userimg: 1,
        username: 1,
        img: 1,
        slug: 1,
      },
    }
  );

  return {
    props: {
      post: JSON.parse(JSON.stringify(posts)),
    },
    revalidate: 1,
  };
}
