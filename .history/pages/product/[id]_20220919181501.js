import React from "react";

function ProductDetails(product) {
  console.log(product);
  return (
    <div className="h-80 w-80 flex align-middle rounded-lg items-center">
      <img
        className="rounded-xl flex-shrink-0 object-cover "
        src={product.product.img}
        alt=""
      />
      <h2 className="text-3xl"> {product.product.title} </h2>
      <h2> {product.product.desc} </h2>
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
