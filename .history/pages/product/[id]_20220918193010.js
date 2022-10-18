import React from "react";

function ProductDetails(product) {
  console.log(product);
  return <div>{product && <h2 className="text-3xl"> prody </h2>}</div>;
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
