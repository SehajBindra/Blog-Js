import {
  ArrowLongRightIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";

import Moment from "react-moment";
import Parser from "html-react-parser";
import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      key={product._id}
      className="flex flex-row   justify-center align-middle cursor-pointer  items-center sm:flex-row py-8 px-8  pr-2 "
    >
      <div className=" my-4   sm:my-8">
        <Link href={`/product/${product._id}`}>
          <img
            className="rounded-md h-[10rem]  mx-auto  w-[15rem] hover:opacity-80 hover:shadow-lg  transition duration-200 ease-out  cursor-pointer object-cover "
            src={product.img}
          />
        </Link>
      </div>

      <div className="flex flex-col flex-grow  pl-2">
        <h4 className="text-base  sm:max-w-2xl line-clamp-1 break-all  mt-2 text-left sm:text-left">
          {product.title}{" "}
        </h4>

        {/* <div className="border-b w-10 pt-2" /> */}

        <div className="text-xs max-w-xs   sm:max-w-2xl text-gray-500  line-clamp-2 sm:text-base">
          {" "}
          {Parser(`${product.desc}`)}{" "}
        </div>

        <div className="flex items-center space-x-2 my-2">
          <img
            className="h-8 w-8 rounded-full   p-1 object-cover"
            src={product.userimg}
            alt=""
          />
          <p className="flex-1 whitespace-nowrap text-sm sm:text-base">
            {product.username}
          </p>

          <div
            className=" items-center my-2 hidden sm:inline-flex"
            onClick={() => (hasliked ? sethasliked(false) : sethasliked(true))}
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
            className="flex-1 text-gray-500 ml-2 my-2 truncate pr-5 text-xs sm:text-sm "
            fromNow
          >
            {product.createdAt}
          </Moment>

          <Link href={`/product/${product._id}`}>
            <div className="flex flex-row space-x-2 items-center cursor-pointer">
              <p className="text-xs sm:text-base">Read more</p>
              <ArrowLongRightIcon className="h-4 w-4 mr-4 animate-pulse" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductSection;
