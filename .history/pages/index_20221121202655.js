import Head from "next/head";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Modal from "../components/Modal";

import Products from "../components/Products";
import ProductSection from "../components/ProductSection";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { connectToDatabase } from "../util/mongodb2";
import { useEffect, useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default function Home({ products }) {
  // console.log(products);
  const [posts, setPosts] = useState([]);
  const baseUrl = "http://localhost:3000/api/products";
  const url = "https://blog-beta-hazel.vercel.app/api/products";
  const [visible, setVisible] = useState(10);

  const fetchdata = async () => {
    const dev = process.env.NODE_ENV !== "production";
    await fetch(`${dev ? baseUrl : url}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const showmoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  return (
    <div className="bg-black text-white overflow-y-scroll h-screen  mx-auto">
      <Head>
        <title>Blog JS | Home</title>
        <meta
          name="google-site-verification"
          content="G7ytNgKJpYbuIlMLvcDW4lq9h1FZC6ez3XPjL2EgwSg"
        />

        <link
          rel="icon"
          href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
        />
      </Head>

      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>

      <Toaster />
      <Header />

      <main className=" sm:grid sm:grid-cols-10 ">
        <Sidebar />

        <div className=" flex flex-row col-span-8  max-h-screen sm:col-span-8=5 overflow-x-scroll overflow-y-scroll scrollbar-hide">
          {products.slice(0, 4).map((product) => (
            <Products key={product._id} product={product} />
          ))}
        </div>
        <Widgets />
      </main>

      <div className=" flex flex-col overflow-x-hidden sm:border-x sm:border-gray-800 mx-auto items-center justify-center pr-10  max-w-[63.4rem]  align-middle   ">
        {products.slice(4, visible).map((product) => (
          <ProductSection key={product._id} product={product} />
        ))}
        <div className="flex items-center justify-center text-center flex-row mx-auto space-x-2 pb-16">
          <button
            onClick={showmoreItems}
            className="text-white flex items-center justify-center text-center text-md sm:text-xl "
          >
            {" "}
            Load more{" "}
          </button>

          <ArrowDownIcon className="text-[#E23E57] h-5 cursor-pointer animate-bounce" />
        </div>
      </div>

      <Modal />
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const products = await db
    .collection("products")
    .find({})
    .sort({ $natural: -1 })

    .toArray();

  return {
    props: {
      products: products.map((product) => ({
        _id: product._id.toString(),
        title: product.title,
        desc: product.desc,
        img: product.img,
        username: product.username,
        userimg: product.userimg,
        createdAt: product.createdAt.toISOString(),
      })),
    },
  };
}
