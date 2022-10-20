import Head from "next/head";

import React, { useState } from "react";

import Header from "../../components/Header";
import SingleProduct from "../../components/SingleProduct";

function ProductDetails(product) {
  // console.log(product);

  return (
    <>
      <Head>
        <title>{product.product.title}</title>
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

export async function getServerSideProps({ params }) {
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;
  const res = await fetch(
    `${dev ? DEV_URL : PROD_URL}/api/products/${params.id}`,
    {
      headers: {
        Accept: "application/json, text/plain, */*",
        "User-Agent": "*",
      },
    }
  ).then((res) => res.json());

  return {
    props: {
      product: res.data,
    },
  };
}
