import {
  ArrowLongRightIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";

import Moment from "react-moment";
import Parser from "html-react-parser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  addtoBasket,
  removefromBasket,
  selectItems,
} from "../redux/slices/basketSlice";
import { Zoom } from "react-awesome-reveal";
import Image from "next/image";

function Products({ product }) {
  const [hasliked, sethasliked] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  // console.log(items);

  const addItemToBasket = () => {
    const post = {
      id: product._id,
      title: product.title,
      description: product.desc,

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
    toast.error("Removed from saved");
  };
  const { data: session, status } = useSession();

  return (
    <>
      <div
        key={product._id}
        className="flex flex-col  justify-center align-middle    items-center sm:flex-col py-8 px-8  pr-2 "
      >
        <div className="mt-2 h-40 w-64 md:h-48 md:w-80  sm:my-4">
          <Link href={`/product/${product._id}`}>
            <Image
              height={260}
              width={440}
              className="rounded-md  hover:opacity-80  transition duration-200 ease-out  cursor-pointer object-cover flex-shrink-0"
              src={product.img}
              alt="something went wrong"
            />
          </Link>
        </div>

        <div className="flex flex-col flex-grow  max-w-xs  pl-2">
          <h4 className="text-lg font-semibold line-clamp-1   mt-2">
            {product.title}{" "}
          </h4>

          <p className="   text-xs text-gray-500  line-clamp-2 my-2 sm:text-base">
            {" "}
            {Parser(`${product.desc}`)}{" "}
          </p>

          <div className="flex  items-center my-2 space-x-2">
            <Image
              height={24}
              width={24}
              className="rounded-full  p-1 object-cover"
              src={product.userimg}
              alt="something went wrong"
            />
            <p className="flex-1 whitespace-normal">{product.username}</p>

            {session && (
              <div
                className="cursor-pointer"
                onClick={() =>
                  hasliked ? sethasliked(false) : sethasliked(true)
                }
              >
                {hasliked ? (
                  <BookmarkSlashIcon
                    onClick={RemoveItemFromBasket}
                    className="h-5"
                  />
                ) : (
                  <BookmarkIcon onClick={addItemToBasket} className="h-5  " />
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Moment
              className=" text-gray-500 my-2 truncate pr-5 text-sm "
              fromNow
            >
              {product.createdAt}
            </Moment>
            <Link href={`/product/${product._id}`}>
              <div className="flex flex-row space-x-2 items-center cursor-pointer">
                <p>Read more</p>
                <ArrowLongRightIcon className="h-4 w-4 animate-pulse" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
