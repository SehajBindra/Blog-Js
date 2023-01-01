import Head from "next/head";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
// import { ObjectId } from "mongodb";
import Header from "../../components/Header";
import SingleProduct from "../../components/SingleProduct";
import { connectToDatabase } from "../../util/mongodb2";
import { Toaster } from "react-hot-toast";
import SinglePost from "../../components/SinglePost";

function PostDetails({ post }) {
  //   console.log(post);
  // console.log(product.slug);
  //   const router = useRouter();
  //   // useEffect(() => {
  //   //   router.prefetch(`/product/${product._id}`);
  //   // }, []);

  return (
    <>
      <div>
        <Head>
          <title>{post?.title} </title>
          <link
            rel="icon"
            href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
          />
        </Head>
      </div>

      <Header />
      <Toaster />
      <div className="h-screen overflow-x-hidden   scrollbar-hide  overflow-y-auto  py-8  px-12  bg-black  flex-col  flex align-middle  items-center text-white">
        {/* <SinglePost post={post} /> */}
        {/* {post?.desc} */}

        <SinglePost post={post} />

        {/* <SingleProduct product={product} /> */}
      </div>
    </>
  );
}

export default PostDetails;
// headers: {
//   Accept: "application/json, text/plain, */*",
//   "User-Agent": "*",
// },

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   };
// }
export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();
  //   const slug = params.slug;
  const posts = await db.collection("products").findOne(
    { slug: params.slug },

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
