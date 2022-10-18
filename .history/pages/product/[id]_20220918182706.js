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
  const data = await fetch(`http://localhost:3000/api/products/${params}`).then(
    (res) => res.json()
  );

  const product = JSON.parse(JSON.stringify(data));

  return {
    props: {
      product: product,
    },
  };
}
