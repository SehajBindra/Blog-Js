import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
// import { Zoom } from "react-awesome-reveal";
const Zoom = dynamic(() => import("react-awesome-reveal"));
const Moment = dynamic(() => import("react-moment"));
// import Moment from "react-moment";
// import SavedPosts from "./SavedPosts";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
const SavedPosts = dynamic(() => import("./SavedPosts"));

import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";

function ProductSection({ product }) {
  const router = useRouter();
  const { data: session } = useSession();
  // console.log(items);

  return (
    <>
      <Zoom>
        <motion.div
          onClick={() => router.push(`/blog/${product.slug}`)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          key={product._id}
          className="flex flex-row   justify-center align-middle cursor-pointer  items-center sm:flex-row py-8 px-8 sm:pr-4 pr-2 "
        >
          <div className=" my-4  flex-shrink-0  sm:my-8">
            <Image
              height={150}
              width={160}
              className="image"
              src={product.img}
              alt="use freepik.com for images"
            />
          </div>

          <div className="flex flex-col  pl-4">
            <h2 className="text-base max-w-[10rem]  sm:text-lg  font-semibold sm:max-w-xs  md:max-w-sm line-clamp-2  mt-2 ">
              {product.title}{" "}
            </h2>

            {/* <div className="border-b w-10 pt-2" /> */}

            {/* <div className="hidden sm:inline  text-xs max-w-[10rem] mt-2 sm:max-w-xs  md:max-w-2xl text-gray-300  sm:line-clamp-2 sm:text-base">
              {" "}
              {Parser(`${product.desc}`)}{" "}
            </div> */}

            <div className="flex items-center space-x-2 my-2">
              <Image
                height={24}
                width={24}
                className="rounded-full  pointer-events-none  p-1 object-cover"
                src={product.userimg}
                alt="something went wrong"
              />
              <p className="flex-1 whitespace-nowrap text-sm sm:text-base">
                {product.username}
              </p>

              {session && (
                <>
                  <SavedPosts product={product} />
                </>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Moment
                className="flex-1 text-gray-300 font-extralight ml-2 my-1 truncate pr-5 text-sm sm:text-sm "
                format="D MMM YYYY"
              >
                {product.createdAt}
              </Moment>

              <div className="flex flex-row space-x-2 items-center cursor-pointer">
                <p className="text-sm sm:text-base">Read more</p>
                <ArrowLongRightIcon className="arrow mr-4 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      </Zoom>
    </>
  );
}

export default ProductSection;
