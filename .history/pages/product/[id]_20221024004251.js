import axios from "axios";

import Head from "next/head";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import Header from "../../components/Header";
import SingleProduct from "../../components/SingleProduct";
import { connectToDatabase } from "../../util/mongodb2";

function ProductDetails({ product }) {
  // console.log(product);
  const router = useRouter();
  useEffect(() => {
    router.prefetch(`/product/${product._id}`);
  }, []);

  return (
    <>
      <Head>
        <title>{product.title} </title>
        <link
          rel="icon"
          href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
        />
      </Head>

      <Header />

      <main className="h-screen  scrollbar-hide overflow-y-auto  py-8  px-12  bg-black  flex-col  flex align-middle  items-center">
        <SingleProduct product={product} />
      </main>
    </>
  );
}

export default ProductDetails;
// headers: {
//   Accept: "application/json, text/plain, */*",
//   "User-Agent": "*",
// },

export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();
  const id = params.id;
  const products = await db.collection("products").findOne(
    { _id: new ObjectId(id) },

    {
      projection: {
        title: 1,
        desc: 1,
        userimg: 1,
        username: 1,
        img: 1,
      },
    }
  );

  // const posts = products.map((product) => ({
  //   _id: product.product._id.toString(),
  //   title: product.product.title,
  //   desc: product.product.desc,
  //   img: product.product.img,
  //   username: product.product.username,
  //   userimg: product.product.userimg,
  // }));

  // let dev = process.env.NODE_ENV !== "production";
  // const baseUrl = "http://localhost:3000/api/products/";
  // const url = "https://blog-beta-hazel.vercel.app/api/products/";
  // const res = await fetch(`${dev ? baseUrl : url}${params.id}`).then((res) =>
  //   res.json()
  // );

  return {
    props: {
      product: JSON.parse(JSON.stringify(products)),
    },
  };
}
