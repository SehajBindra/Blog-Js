import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import SingleProduct from "../../components/SingleProduct";
import { User } from "../../redux/slices/userSlice";

function ProductDetails(product) {
  console.log(product);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>{product.title}</title>
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
    `${dev ? DEV_URL : PROD_URL}/api/products/${params.id}`
  ).then((res) => res.json());

  return {
    props: {
      product: res.data,
    },
  };
}
