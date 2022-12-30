import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

// import Moment from "react-moment";
const Moment = dynamic(() => import("react-moment"));
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
const SavedPosts = dynamic(() => import("./SavedPosts"));
// import SavedPosts from "./SavedPosts";
import Image from "next/image";

function Products({ product }) {
  const router = useRouter();

  // console.log(items);

  const { data: session, status } = useSession();

  return (
    <>
      <div
        onClick={() => router.push(`/product/${product._id}`)}
        key={product._id}
        className="flex flex-col  justify-center align-middle     items-center  py-8 px-4 sm:px-4 md:px-8   "
      >
        <div className="mt-2 h-40 w-64 sm:w-52 sm:h-28 cursor-pointer md:h-48 md:w-80  sm:my-4">
          <Image
            height={260}
            width={440}
            className="image cursor-pointer"
            src={product.img}
            alt="Freepik.com , Pexels.com"
          />
        </div>

        <div className="flex flex-col  cursor-pointer   max-w-xs  pl-4">
          <h1 className="text-base font-semibold line-clamp-1 tracking-normal leading-relaxed  sm:text-lg   my-2">
            {product.title}{" "}
          </h1>

          {/* <h2 className="text-xs text-gray-300  line-clamp-2 my-2 sm:text-base">
            {" "}
            {Parser(`${product.desc}`)}{" "}
          </h2> */}

          <div className="flex  items-center my-2 space-x-2">
            <Image
              height={24}
              width={24}
              className="rounded-full  p-1 object-cover"
              src={product.userimg}
              alt="something went wrong"
            />
            <p className="flex-1  whitespace-nowrap">{product.username}</p>

            {session && (
              <>
                <SavedPosts product={product} />
              </>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Moment
              className=" text-gray-300 my-2 truncate pr-5 text-sm "
              format="D MMM YYYY"
            >
              {product.createdAt}
            </Moment>

            <div className="flex flex-row whitespace-nowrap space-x-2 items-center cursor-pointer">
              <p>Read more</p>
              <ArrowLongRightIcon className="arrow animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
