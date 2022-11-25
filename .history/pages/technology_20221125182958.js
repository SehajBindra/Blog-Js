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
      <div className="bg-black h-screen">
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

        <div>{product}</div>
      </div>
      <Modal />
    </>
  );
}

export default technology;

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const tech = await db
    .collection("products")
    .find({ category: { name: "Technology" } })
    .sort({ $natural: -1 })
    .toArray();

  return {
    props: {
      tech: tech.map((tech) => ({
        _id: tech._id.toString(),
        title: tech.title.trim(),
        img: tech.img,
        username: tech.username,
        userimg: tech.userimg,
      })),
    },
  };
}
