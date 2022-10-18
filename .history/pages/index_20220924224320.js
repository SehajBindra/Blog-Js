import axios from "axios";

import Head from "next/head";
import Link from "next/link";

import { Toaster } from "react-hot-toast";

import CreatePost from "../components/CreatePost";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

export default function Home({ products }) {
  console.log(products);

  return (
    <div className="bg-white  ">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />
      <Header />

      <main className="flex flex-row  overflow-x-scroll scrollbar-hide sm:grid sm:grid-cols-8 ">
        <Sidebar />
        {products?.slice(0, 4).map((product) => (
          <Products key={product._id} product={product} />
        ))}
        <Widgets />
      </main>

      <main className="sm:grid sm:grid-cols-8"></main>
      <Modal />

      <CreatePost />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/products").then((res) =>
    res.json()
  );

  return {
    props: {
      products: res.data,
    },
    revalidate: 1,
  };
}
