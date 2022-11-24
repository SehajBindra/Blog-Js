import {
  ArrowLongRightIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";
import { Zoom } from "react-awesome-reveal";
import Moment from "react-moment";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoBasket,
  removefromBasket,
  selectItems,
} from "../redux/slices/basketSlice";
import { motion } from "framer-motion";
import Image from "next/image";

function ProductSection({ product }) {
  const [hasliked, sethasliked] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  // console.log(items);

  const addItemToBasket = () => {
    const post = {
      id: product._id,
      title: product.title,
      description: product.desc,
      image: product.img,
      userimg: product.userimg,
      username: product.username,
      category: product.category,
    };
    //  sending the product as an action to redux store.. the basket slice
    dispatch(addtoBasket(post));

    toast.success("saved");
  };

  const RemoveItemFromBasket = () => {
    // removing the item from Redux
    dispatch(removefromBasket({ id: product._id }));
  };

  return (
    <>
      <Zoom>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          key={product._id}
          className="flex flex-row   justify-center align-middle cursor-pointer  items-center sm:flex-row py-8 px-8 sm:pr-4 pr-2 "
        >
          <Link href={`/product/${product._id}`}>
            <div className=" my-4  flex-shrink-0  sm:my-8">
              <Image
                height={150}
                width={160}
                className="image"
                src={product.img}
                alt="something went wrong"
              />
            </div>
          </Link>

          <div className="flex flex-col  pl-4">
            <h4 className="text-base max-w-[10rem] tracking-normal leading-relaxed sm:text-lg  font-semibold sm:max-w-xs  md:max-w-sm line-clamp-2  mt-2 ">
              {product.title}{" "}
            </h4>

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
              <h2 className="flex-1 whitespace-nowrap text-sm sm:text-base">
                {product.username}
              </h2>

              <div
                className=" items-center my-1 hidden sm:inline-flex"
                onClick={() =>
                  hasliked ? sethasliked(false) : sethasliked(true)
                }
              >
                {hasliked ? (
                  <BookmarkIcon onClick={addItemToBasket} className=" h-5" />
                ) : (
                  <BookmarkSlashIcon
                    onClick={RemoveItemFromBasket}
                    className="h-5 "
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Moment
                className="flex-1 text-gray-300 font-extralight ml-2 my-1 truncate pr-5 text-sm sm:text-sm "
                fromNow
              >
                {product.createdAt}
              </Moment>

              <Link href={`/product/${product._id}`}>
                <div className="flex flex-row space-x-2 items-center cursor-pointer">
                  <h2 className="text-sm sm:text-base">Read more</h2>
                  <ArrowLongRightIcon className="arrow mr-4 animate-pulse" />
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </Zoom>
    </>
  );
}

export default ProductSection;
