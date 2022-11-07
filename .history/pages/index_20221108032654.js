import Head from "next/head";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Modal from "../components/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
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

  const [visible, setVisible] = useState(10);

  const fetchdata = async () => {
    await fetch(`http://localhost:3000/api/products`)
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
        <meta
          name="google-site-verification"
          content="G7ytNgKJpYbuIlMLvcDW4lq9h1FZC6ez3XPjL2EgwSg"
        />
      </Helmet>

      <Toaster />
      <Header />

      <main className=" sm:grid sm:grid-cols-12 ">
        <Sidebar />
        <div className=" flex flex-row col-span-11  max-h-screen sm:col-span-8 overflow-x-scroll overflow-y-scroll scrollbar-hide">
          {products.slice(0, 4).map((product) => (
            <Products key={product._id} product={product} />
          ))}
        </div>
        <Widgets />
      </main>

      {/* <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={fetchData}
        hasMore={count !== posts.length}
        loader={<h4 className=" text-center my-8 mb-4">Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b> {count}</b>
          </p>
        }
      > */}
      <div className=" flex flex-col overflow-x-hidden sm:border-x sm:border-gray-800 mx-auto items-center justify-center pr-10  max-w-[63.4rem]  align-middle   ">
        {products.slice(4, visible).map((product) => (
          <ProductSection key={product._id} product={product} />
        ))}
        <div className="flex items-center flex-row space-x-2 pb-16">
          <button
            onClick={showmoreItems}
            className="text-white flex items-center justify-center text-center text-xl"
          >
            {" "}
            Load More{" "}
          </button>

          <ArrowDownIcon className="text-red-400 h-10 animate-bounce" />
        </div>
      </div>

      {/* </InfiniteScroll> */}
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
    .limit(8)
    .toArray();

  // const res = await fetch("http://localhost:3000/api/products").then((res) =>
  //   res.json()
  // );

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