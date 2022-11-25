import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Zoom } from "react-awesome-reveal";
import Parser from "html-react-parser";
import Modal from "../components/Modal";
import { connectToDatabase } from "../util/mongodb2";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Head from "next/head";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
function technology({ product }) {
  const [text] = useTypewriter({
    words: ["Technology"],
    loop: true,
    delaySpeed: 2600,
  });
  return (
    <div>
      <Head>
        <title>Blog JS | Technology</title>
        <link
          rel="icon"
          href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
        />
      </Head>
      <div>
        <Header />
        <Toaster />
      </div>
      <div className="flex  items-center justify-center  top-0 sticky z-50 bg-black  py-4">
        {" "}
        <h2 className="text-3xl font-semibold text-blue-400 text-center ">
          {" "}
          <span>{text}</span>
          <Cursor cursorColor="#E23E57" />
        </h2>
      </div>

      <div className="flex bg-black text-white h-screen flex-col overflow-x-auto overflow-y-auto  scrollbar-hide pb-[8rem]">
        {product.map((product) => (
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
            key={product._id}
            className="flex flex-col mx-auto bg-black  my-4 "
          >
            <Zoom>
              <div className=" cursor-pointer md:mt-2">
                <div className="flex flex-row items-center">
                  <Image
                    width={200}
                    height={200}
                    className="image"
                    src={product.img}
                    placeholder="not found"
                  />
                </div>

                <h2 className="line-clamp-1 max-w-xs sm:max-w-sm md:max-w-xs placeholder: font-semibold text-lg">
                  {" "}
                  {product.title}{" "}
                </h2>

                {/* <h3 className="line-clamp-2 text-xs text-gray-300 sm:text-lg  my-3 max-w-xs lg:max-w-2xl">
                {" "}
                {Parser(`${product.desc}`)}
              </h3> */}

                <div className="flex flex-row items-center space-x-2">
                  <img
                    className="rounded-full h-5"
                    src={product.userimg}
                    alt=""
                  />
                  <p className="flex-1 font-extralight text-sm sm:text-base whitespace-nowrap ">
                    {product.username}
                  </p>
                  <Link href={`/product/${product._id}`}>
                    <div className="flex flex-row items-center space-x-2">
                      <p className="font-light text-sm sm:text-base">
                        Read more
                      </p>
                      <ArrowRightIcon className="arrow" />
                    </div>
                  </Link>
                </div>
              </div>
            </Zoom>
          </motion.div>
        ))}
      </div>

      <Modal />
    </div>
  );
}

export default technology;

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const product = await db
    .collection("products")
    .find({ category: { name: "Technology" } })
    .sort({ $natural: -1 })
    .toArray();

  return {
    props: {
      product: product.map((product) => ({
        _id: product._id.toString(),
        title: product.title.trim(),
        img: product.img,
        username: product.username,
        userimg: product.userimg,
      })),
    },
  };
}
