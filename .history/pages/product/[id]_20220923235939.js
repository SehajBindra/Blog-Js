import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import { Currentuser } from "../../redux/slices/userSlice";

function ProductDetails(product, Products) {
  console.log(product.product._id);
  // const [post, setPost] = useState(Products);
  const currentUser = useSelector(Currentuser);
  const router = useRouter();
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios
        .delete(`http://localhost:3000/api/products/${id}`, {
          data: { username: currentUser.data.data.username },
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
      <Header />
      <div className=" min-h-screen py-8  px-12 text-center bg-white  flex-col  flex align-middle rounded-lg items-center">
        <h2 className="text-3xl first:text-red-400 text-gray-900 font-semibold   my-5">
          {" "}
          {product.product.title}{" "}
        </h2>
        <img
          className="rounded-xl w-[40rem]   object-cover "
          src={product.product.img}
          alt=""
        />

        <div className="my-8">
          <h2 className="text-2xl"> {product.product.title} </h2>
          <h2 className="px-8 max-w-5xl break-words">
            {" "}
            {product.product.desc}{" "}
          </h2>

          {/* <button
            onClick={() => handleDelete(product.product._id)}
            className="px-2 py-4 text-red-400 rounded-md bg-black"
          >
            Delete
          </button> */}
        </div>
      </div>
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
