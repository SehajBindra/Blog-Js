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

  const handleDelete = async () => {
    try {
      await axios
        .delete(`api/products/`, {
          data: {
            username: currentUser.data.data.username,
          },
        })
        .then(console.log("deleted"));
    } catch (error) {
      console.log("invalid");
    }
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Modal />

      {products.map((product) => (
        <Products key={product._id} product={product} />
      ))}

      <CreatePost />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/products").then((res) =>
    res.json()
  );

  return {
    props: {
      products: res.data,
    },
  };
}
