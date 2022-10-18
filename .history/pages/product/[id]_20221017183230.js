import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import SingleProduct from "../../components/SingleProduct";
import { User } from "../../redux/slices/userSlice";

function ProductDetails(product) {
  // console.log(product.product._id);
  console.log(product);
  // const [post, setPost] = useState(Products);
  const user = useSelector(User);
  console.log(user);
  const router = useRouter();
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios
        .delete(`http://localhost:3000/api/products/${id}`, {
          // data: { username: currentUser.data.data.username },
        })
        .then((res) => {
          res && router.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{product.product.title}</title>
        <link
          rel="icon"
          href="https://png.pngtree.com/png-vector/20190303/ourmid/pngtree-modern-abstract-3d-logo-png-image_771012.jpg"
        />
      </Head>

      <Header />

      <main className=" min-h-screen py-8  px-12  bg-black  flex-col  flex align-middle rounded-lg items-center">
        <SingleProduct product={product} />
      </main>
    </>
  );
}

export default ProductDetails;

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `http://localhost:3000/api/products/${params.id}`
  ).then((res) => res.json());

  return {
    props: {
      product: res.data,
    },
  };
}
