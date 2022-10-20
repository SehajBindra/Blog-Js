import axios from "axios";

import Head from "next/head";

import React, { useState } from "react";

import Header from "../../components/Header";
import SingleProduct from "../../components/SingleProduct";

function ProductDetails(product) {
  // console.log(product);

  return (
    <>
      <Head>
        <title>{product.product.title} </title>
        <link
          rel="icon"
          href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
        />
      </Head>

      <Header />

      <main className=" min-h-screen py-8  px-12  bg-black  flex-col  flex align-middle  items-center">
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
  let dev = process.env.NODE_ENV !== "production";
  const baseUrl = "http://localhost:3000/api/products/";
  const url = "https://blog-beta-hazel.vercel.app/api/products/";
  const res = await fetch(`${dev ? baseUrl : url}${params.id}`).then((res) =>
    res.json()
  );

  return {
    props: {
      product: res.data,
    },
  };
}
