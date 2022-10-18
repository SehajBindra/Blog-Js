import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Products from "../components/Products";
import { currentPost } from "../redux/slices/postSlice";
import { Currentuser } from "../redux/slices/userSlice";

// import { connectToDatabase } from "../lib/mongodb";

export default function Home({ products }) {
  const currentUser = useSelector(Currentuser);
  const Currentpost = useSelector(currentPost);

  console.log(products);

  return (
    <div className="bg-white  ">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-row scrollbar-hide  sm:grid sm:grid-cols-12">
        {products.slice(0, 4).map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </main>
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
