import React from "react";
import { connectToDatabase } from "../util/mongodb2";
import Parser from "html-react-parser";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
function programing({ product }) {
  return (
    <div>
      <Head>
        <title>Blog JS | Programing</title>
        <link
          rel="icon"
          href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
        />
      </Head>
      <div>
        <Header />
        <Toaster />
      </div>
      <h2 className=" text-3xl font-semibold text-[#E23E57] top-0 sticky z-50 bg-black text-center  py-4">
        {" "}
        Programing
      </h2>
      <div className="flex bg-black text-white h-screen flex-col overflow-x-scroll  scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {product.map((product) => (
          <div key={product._id} className="flex flex-row px-8 bg-black  my-8 ">
            <Link href={`/product/${product._id}`}>
              <div className=" cursor-pointer md:mt-4">
                <h2 className="line-clamp-1 max-w-sm font-semibold">
                  {" "}
                  {product.title}{" "}
                </h2>

                <h3 className="line-clamp-2 text-xs text-gray-500 my-2 max-w-xs">
                  {" "}
                  {Parser(`${product.desc}`)}
                </h3>

                <div className="flex flex-row items-center space-x-2">
                  <img
                    className="rounded-full h-5"
                    src={product.userimg}
                    alt=""
                  />
                  <p className="flex-1 text-base whitespace-nowrap ">
                    {product.username}
                  </p>

                  <div className="flex flex-row items-center space-x-2">
                    <p>Read more</p>
                    <ArrowRightIcon className="h-4 animate-pulse" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default programing;

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const product = await db
    .collection("products")
    .find({ category: { name: "Programing" } })
    .sort({ $natural: -1 })
    .toArray();

  return {
    props: {
      product: product.map((product) => ({
        _id: product._id.toString(),
        title: product.title,
        desc: product.desc.trim(),
        username: product.username,
        userimg: product.userimg,
      })),
    },
  };
}