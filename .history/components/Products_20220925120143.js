import { HeartIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

function Products({ product }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios
        .delete(`http://localhost:3000/api/products/${id}`, {
          data: { username: session?.user.name },
        })
        .then((res) => {
          res && router.push("/");
          toast.success("Deleted");
        });
    } catch (error) {
      toast.error("You can only delete your post!");
      console.log(error);
    }
  };
  return (
    <div
      key={product._id}
      className="flex flex-col  cursor-pointer  items-center sm:flex-col py-8 px-8  pr-2 "
    >
      <div className=" my-16 h-60 w-72 md:h-80 md:w-80   sm:my-8">
        <Link href={`/product/${product._id}`}>
          <img
            className="rounded-md hover:opacity-80 hover:shadow-lg w-[30rem] h-[20rem] transition duration-200 ease-out  cursor-pointer object-cover flex-shrink-0"
            src={product.img}
          />
        </Link>
      </div>

      <div className="flex flex-col flex-grow   pl-2">
        <div className="flex justify-between items-center">
          <p className="text-xs font-extralight mt-2 truncate">
            {" "}
            {new Date(product.createdAt).toDateString()}{" "}
          </p>
          {/* <HeartIcon className="  h-7 cursor-pointer " /> */}
        </div>

        <h4 className="text-lg line-clamp-1 flex-grow mt-2 text-left sm:text-left">
          {product.title}{" "}
        </h4>

        {/* <div className="border-b w-10 pt-2" /> */}

        <p className="  text-xs text-gray-500 flex-grow line-clamp-2 sm:text-base">
          {" "}
          {product.desc}{" "}
        </p>

        {session && (
          <div className="flex justify-between items-end pt-5">
            <div>
              <a
                onClick={() => handleDelete(product._id)}
                className="px-4 py-2 text-white bg-red-400 rounded-lg cursor-pointer"
              >
                Delete
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
