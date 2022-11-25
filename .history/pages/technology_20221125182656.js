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
    <>
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
      </div>
      <Modal />
    </>
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
