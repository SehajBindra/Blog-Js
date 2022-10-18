import axios from "axios";

import Head from "next/head";
import Link from "next/link";

import { Toaster } from "react-hot-toast";

import CreatePost from "../components/CreatePost";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Products from "../components/Products";
import ProductSection from "../components/ProductSection";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

export default function Home({ products }) {
  console.log(products);

  return (
    <div className="bg-white mx-auto   ">
      <Head>
        <title>Blog</title>
        <link
          rel="icon"
          href="https://png.pngtree.com/png-vector/20190303/ourmid/pngtree-modern-abstract-3d-logo-png-image_771012.jpg"
        />
      </Head>

      <Toaster />
      <Header />

      <main className=" sm:grid sm:grid-cols-12 ">
        <Sidebar />
        <div className=" flex flex-row col-span-8 overflow-x-scroll scrollbar-hide">
          {products?.slice(0, 8).map((product) => (
            <Products key={product._id} product={product} />
          ))}
        </div>

        <div className="flex flex-col  mx-auto ">
          {products?.slice(0, 8).map((product) => (
            <ProductSection key={product._id} product={product} />
          ))}
        </div>
        <Widgets />
      </main>

      <Modal />

      {/* <CreatePost /> */}
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
