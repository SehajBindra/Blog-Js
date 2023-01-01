import React from "react";
import Head from "next/head";
import Header from "../../components/Header";
import { connectToDatabase } from "../../util/mongodb2";
import { Toaster } from "react-hot-toast";
import SinglePost from "../../components/SinglePost";

function PostDetails({ post }) {
  return (
    <>
      <div>
        <Head>
          <title>{post?.title} </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link
            rel="icon"
            href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
          />
        </Head>
      </div>

      <Header />
      <Toaster />
      <div className="h-screen overflow-x-hidden   scrollbar-hide  overflow-y-auto  py-8  px-12  bg-black  flex-col  flex align-middle  items-center text-white">
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
        // slug: 1,
      },
    }
  );

  return {
    props: {
      post: JSON.parse(JSON.stringify(posts)),
    },
    // revalidate: 8,
  };
}
