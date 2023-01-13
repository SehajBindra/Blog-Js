import Head from "next/head";
// import { Helmet } from "react-helmet";
// import { Toaster } from "react-hot-toast";
import Script from "next/script";
import dynamic from "next/dynamic";
// import Header from "../components/Header";

const Modal = dynamic(() => import("../components/Modal"), {
  ssr: false,
});
const Header = dynamic(() => import("../components/Header"));
// const Helmet = dynamic(() => import("react-helmet"));
// import Widgets from "../components/Widgets";
const Widgets = dynamic(() => import("../components/Widgets"));
// import Products from "../components/Products";
const Sidebar = dynamic(() => import("../components/Sidebar"));
// import Sidebar from "../components/Sidebar";
const Products = dynamic(() => import("../components/Products"));
const ProductSection = dynamic(() => import("../components/ProductSection"));

import { connectToDatabase } from "../util/mongodb2";
import { useEffect, useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

// import ProductSection from "./../components/ProductSection";
export default function Home({ products }) {
  // console.log(products);
  const [posts, setPosts] = useState([]);
  const baseUrl = "http://localhost:3000/api/products";
  const url = "https://blog-beta-hazel.vercel.app/api/products";
  const url2 = "https://blogjs.tech/api/products";
  const [visible, setVisible] = useState(10);

  const fetchdata = async () => {
    const dev = process.env.NODE_ENV !== "production";
    await fetch(`${dev ? baseUrl : url2}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const showmoreItems = () => {
    setVisible((prevValue) => prevValue + 8);
  };

  return (
    <>
      <Head>
        <title>Blog JS | Home</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <meta property="og:title" content="BlogJS || Home" />
        <meta
          property="og:description"
          content="This is the  Home page of BlogJS"
        />
        <meta property="og:image" content="/logo.jpeg" />
        <meta property="og:url" content="https://blogjs.tech/" />
        <meta name="description" content={`welcome to blogjs.tech`} />
        <meta name="description" content={`welcome to Blog JS`} />
        <meta
          name="google-site-verification"
          content="28jDfp2oEibVP-WSNODioOCe6YuLFPgLOREq-GD87Uw"
        />
        <Script
          strategy="lazyOnload"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3030825364916957"
          crossorigin="anonymous"
        />

        <link rel="icon" href="/logo.jpeg" />
      </Head>

      <div className="bg-black text-white overflow-y-scroll h-screen snap-y snap-mandatory z-0  mx-auto">
        {/* <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Helmet> */}

        {/* <Toaster /> */}
        <Header />

        <main className=" sm:grid sm:grid-cols-8 ">
          <Sidebar />

          <div className="relative ml-[8rem] flex flex-row col-span-8  max-h-screen sm:col-span-7 overflow-x-scroll overflow-y-scroll scrollbar-hide">
            {products.slice(0, 4).map((product) => (
              <Products key={product._id} product={product} />
            ))}
          </div>
          <Widgets />
        </main>

        <div className=" productSection   ">
          {products.slice(4, visible).map((product) => (
            <ProductSection key={product._id} product={product} />
          ))}
          <div
            onClick={showmoreItems}
            className="flex items-center justify-center text-center flex-row mx-auto space-x-2 pb-16"
          >
            <button className="loadMore"> Load more </button>

            <ArrowDownIcon className="arrow" />
          </div>
        </div>

        <Modal />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=43200, stale-while-revalidate=60"
  // );
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
        // desc: product.desc.trim(),
        img: product.img,
        username: product.username.trim(),
        userimg: product.userimg,
        // category: product.category,
        slug: product.slug.trim(),
        createdAt: product.createdAt.toISOString(),
      })),
    },

    revalidate: 1,
  };
}
