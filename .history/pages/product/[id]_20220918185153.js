import React from "react";
import mongoose from "mongoose";

function ProductDetails(product) {
  if (!mongoose.Types.ObjectId.isValid(product._id)) return false;
  console.log(product);
  return <div>{product && <h1> {product._id} </h1>}</div>;
}

export default ProductDetails;

export async function getServerSideProps({ params }) {
  const data = await fetch(`http://localhost:3000/api/products/${params}`).then(
    (res) => res.json()
  );

  //   const product = JSON.parse(JSON.stringify(data));

  return {
    props: {
      product: data,
    },
  };
}
