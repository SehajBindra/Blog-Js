import React from "react";
import { connectToDatabase } from "../util/mongodb2";
import Parser from "html-react-parser";
function programing({ product }) {
  return (
    <div>
      <div className="flex bg-black text-white h-screen flex-col overflow-x-scroll  scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {product.map((product) => (
          <div key={product.id} className="flex flex-row px-8  my-8 ">
            <div className=" cursor-pointer md:mt-4">
              <h2 className="line-clamp-1 "> {product.title} </h2>

              <h3 className="line-clamp-2 text-xs text-gray-500 my-2">
                {" "}
                {Parser(`${product.description}`)}
              </h3>

              <div className="flex flex-row items-center space-x-2">
                <img
                  className="rounded-full h-5"
                  src={product.userimg}
                  alt=""
                />
                <p className="flex-1 text-base whitespace-nowrap ">
                  {product.username}
                </p>
              </div>
            </div>
          </div>
        ))}

        <Modal />
      </div>
    </div>
  );
}

export default programing;

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const product = await db
    .collection("products")
    .find({ category: { name: "Programing" } })
    .sort({ $natural: -1 })
    .toArray();

  return {
    props: {
      product: product.map((product) => ({
        _id: product._id.toString(),
        title: product.title,
        desc: product.desc,
        username: product.username,
        userimg: product.userimg,
      })),
    },
  };
}
