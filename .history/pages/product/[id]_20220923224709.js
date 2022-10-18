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

      <div className="h-80 max-w-5xl h-screen  flex-col w-80 flex align-middle rounded-lg items-center">
        <img
          className="rounded-xl  flex-shrink-0 object-cover "
          src={product.product.img}
          alt=""
        />
        <h2 className="text-3xl"> {product.product.title} </h2>
        <h2> {product.product.desc} </h2>

        <button
          onClick={() => handleDelete(product.product._id)}
          className="px-2 py-4 text-red-400 rounded-md bg-black"
        >
          Delete
        </button>
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
