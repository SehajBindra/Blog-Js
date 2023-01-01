import Head from "next/head";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
// import { ObjectId } from "mongodb";
import Header from "../../components/Header";
import SingleProduct from "../../components/SingleProduct";
import { connectToDatabase } from "../../util/mongodb2";
import { Toaster } from "react-hot-toast";

function ProductDetails({ post }) {
  console.log(post);
  // console.log(product.slug);
  //   const router = useRouter();
  //   // useEffect(() => {
  //   //   router.prefetch(`/product/${product._id}`);
  //   // }, []);

  return (
    <>
      <Head>
        <title>{post.title} </title>
        <link
          rel="icon"
          href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
        />
      </Head>

      <Header />
      <Toaster />
      <main className="h-screen overflow-x-hidden   scrollbar-hide  overflow-y-auto  py-8  px-12  bg-black  flex-col  flex align-middle  items-center">
        hello chacking
        {/* <SingleProduct product={product} /> */}
      </main>
    </>
  );
}

export default ProductDetails;
// headers: {
//   Accept: "application/json, text/plain, */*",
//   "User-Agent": "*",
// },

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
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
