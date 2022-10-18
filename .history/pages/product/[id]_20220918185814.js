import React from "react";

function ProductDetails(product) {
  console.log(product);
  return <div>{product && <h1> {product.tur} </h1>}</div>;
}

export default ProductDetails;

export async function getServerSideProps({ params }) {
  const data = await fetch(`http://localhost:3000/api/products/${params}`).then(
    (res) => res.json()
  );

  return {
    props: {
      product: data,
    },
  };
}
