import React from "react";

function ProductDetails(product) {
  console.log(product);
  return (
    <div>
      <h1> {product.title} </h1>
    </div>
  );
}

export default ProductDetails;

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/products/${params}`).then(
    (res) => res.json()
  );

  return {
    props: {
      product: res.data,
    },
  };
}
