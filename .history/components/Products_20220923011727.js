import { HeartIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { Currentuser } from "../redux/slices/userSlice";

function Products({ product }) {
  const currentUser = useSelector(Currentuser);
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios
        .delete(`http://localhost:3000/api/products/${id}`, {
          data: { username: currentUser.data.data.username },
        })
        .then(console.log("deleted"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={product._id}
      className="flex flex-col  cursor-pointer  items-center sm:flex-row py-7 px-2 border-b pr-4 rounded-xl  hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t"
    >
      <div className="relative my-24 h-32 w-72 md:h-52 md:w-80 flex-shrink-0  sm:my-8">
        <Link href={`/product/${product._id}`}>
          <img
            className="rounded-xl h-[15rem] w-[30rem] cursor-pointer object-cover flex-shrink-0"
            src={product.img}
          />
        </Link>
      </div>

      <div className="flex flex-col flex-grow mt-2 pl-5">
        <div className="flex justify-between items-center">
          <p className="text-xs font-extralight mt-4 truncate">
            {" "}
            {new Date(product.createdAt).toString()}{" "}
          </p>
          <HeartIcon className="  h-7 cursor-pointer " />
        </div>

        <h4 className="text-xl mt-2 text-left sm:text-left">
          {product.title}{" "}
        </h4>

        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-xs text-gray-500 flex-grow line-clamp-2 sm:text-base">
          {" "}
          {product.desc}{" "}
        </p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            {/* <StarIcon className="h-5 text-red-400" /> {star} */}
          </p>

          <div>
            {/* <p className="pb-2 font-semibold text-lg lg:text-2xl">
                  {" "}
                  ${property.price}{" "}
                </p> */}

            <a
              onClick={() => handleDelete(product._id)}
              className="px-4 py-2 text-white bg-red-400 rounded-lg cursor-pointer"
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
