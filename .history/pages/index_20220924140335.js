import { ScaleIcon } from "@heroicons/react/24/outline";
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
import Sidebar from "../components/Sidebar";
import { currentPost } from "../redux/slices/postSlice";
import { Currentuser, User } from "../redux/slices/userSlice";

// import { connectToDatabase } from "../lib/mongodb";

export default function Home({ products }) {
  const user = useSelector(User);

  console.log(user);

  console.log(products);

  return (
    <div className="bg-white  ">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-row overflow-x-scroll scrollbar-hide sm:grid sm:grid-cols-12 ">
        {products.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </main>

      <main className="sm:grid sm:grid-cols-12">
        <Sidebar />
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
