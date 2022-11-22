import React from "react";
import { connectToDatabase } from "../util/mongodb2";
import Parser from "html-react-parser";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Modal from "../components/Modal";
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
      <motion.div
        initial={{
          x: -500,
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          x: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="flex  items-center justify-center  top-0 sticky z-50 bg-black  py-4"
      >
        {" "}
        <h2 className="text-3xl font-semibold text-[#E23E57] text-center ">
          {" "}
          Programing
        </h2>
      </motion.div>
      <motion.div
        initial={{
          x: -500,
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          y: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="flex bg-black text-white h-screen flex-col overflow-x-auto overflow-y-auto  scrollbar-hide pb-[8rem]"
      >
        {product.map((product) => (
          <div
            key={product._id}
            className="flex flex-row mx-auto bg-black  my-4 "
          >
            <Link href={`/product/${product._id}`}>
              <div className=" cursor-pointer md:mt-2">
                <h2 className="line-clamp-2 max-w-xs sm:max-w-sm md:max-w-2xl placeholder: font-semibold text-lg">
                  {" "}
                  {product.title}{" "}
                </h2>

                <h3 className="line-clamp-2 text-xs text-gray-300 sm:text-lg  my-3 max-w-xs lg:max-w-2xl">
                  {" "}
                  {Parser(`${product.desc}`)}
                </h3>

                <div className="flex flex-row items-center space-x-2">
                  <img
                    className="rounded-full h-5"
                    src={product.userimg}
                    alt=""
                  />
                  <p className="flex-1 font-extralight text-sm sm:text-base whitespace-nowrap ">
                    {product.username}
                  </p>

                  <div className="flex flex-row items-center space-x-2">
                    <p className="font-light text-sm sm:text-base">Read more</p>
                    <ArrowRightIcon className="h-4 animate-pulse" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </motion.div>
      <Modal />
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