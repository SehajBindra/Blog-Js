import React from "react";

function ProductDetails(product) {
  console.log(product);
  return <div>{product && <h1> {product.title} </h1>}</div>;
}

export default ProductDetails;

export async function getServerSideProps({ params }) {
  const data = await fetch(
    `http://localhost:3000/api/products/${params.id}`
  ).then((res) => res.json());

  const filter = JSON.stringify(data);

  return {
    props: {
      product: filter,
    },
  };
}
