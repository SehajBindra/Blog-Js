import React from "react";

function ProductDetails(product) {
  console.log(product);
  return (
    <div>
      <img src={product.product.img} alt="" />
      <h2 className="text-3xl"> {product.product.title} </h2>
    </div>
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
