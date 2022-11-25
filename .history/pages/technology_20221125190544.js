import React from "react";

import Modal from "../components/Modal";
import { connectToDatabase } from "../util/mongodb2";

import Head from "next/head";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

import Technology from "../components/Category";
function technology({ category }) {
  console.log(tech);

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

        <div className=" bg-black text-white h-screen">
          {tech.map((tech) => (
            <Technology category={category} />
          ))}
        </div>
      </div>
      <Modal />
    </>
  );
}

export default technology;

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const category = await db
    .collection("products")
    .find({ category: { name: "Technology" } })
    .sort({ $natural: -1 })
    .toArray();

  return {
    props: {
      tech: category.map((category) => ({
        _id: category._id.toString(),
        title: category.title.trim(),
        img: category.img,
        username: category.username,
        userimg: category.userimg,
        createdAt: category.createdAt.toISOString(),
      })),
    },
  };
}
