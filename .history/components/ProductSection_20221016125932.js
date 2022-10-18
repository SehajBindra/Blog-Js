import {
  BookmarkIcon,
  BookmarkSlashIcon,
  BookmarkSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import BookmarkSlash from "@heroicons/react/24/solid";
import Moment from "react-moment";
import axios from "axios";
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
import { currentPost } from "../redux/slices/postSlice";
import { User } from "../redux/slices/userSlice";

function ProductSection({ product }) {
  // const user = useSelector(User);
  // console.log(user);
  const [hasliked, sethasliked] = useState(true);
  // const CurrentPost = useSelector(currentPost);
  // console.log(CurrentPost);
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
    <div
      key={product._id}
      className="flex flex-row   justify-center align-middle cursor-pointer  items-center sm:flex-row py-8 px-8  pr-2 "
    >
      <div className=" my-4  flex-shrink-0   sm:my-8">
        <Link href={`/product/${product._id}`}>
          <img
            className="rounded-md h-[10rem]  w-[10rem] hover:opacity-80 hover:shadow-lg  transition duration-200 ease-out  cursor-pointer object-cover flex-shrink-0"
            src={product.img}
          />
        </Link>
      </div>

      <div className="flex flex-col flex-grow    pl-2">
        <div className="flex justify-between items-center"></div>

        <h4 className="text-lg  line-clamp-1 flex-grow mt-2 text-left sm:text-left">
          {product.title}{" "}
        </h4>

        {/* <div className="border-b w-10 pt-2" /> */}

        <p className="  text-xs text-gray-500 flex-grow line-clamp-2 sm:text-base">
          {" "}
          {product.desc}{" "}
        </p>

        <div className="flex  items-center my-2 space-x-2">
          <img
            className="h-8 w-8 rounded-full border p-1 object-cover"
            src={product.userimg}
            alt=""
          />
          <p className="flex-1">{product.username}</p>
        </div>

        <div className="flex items-center">
          <Moment
            className="flex-1 text-gray-500 ml-2 my-2 truncate pr-5 text-sm "
            fromNow
          >
            {product.createdAt}
          </Moment>

          <div
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

        {/* {session && (
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
        )} */}

        {/* <p className="my-8" onClick={addItemToBasket}>
            {" "}
            save
          </p> */}

        {/* <div>
            <div className="my-8">
              <a
                onClick={() => handlesave(product._id)}
                className="px-4 my-4 py-2 text-white bg-red-400 rounded-lg cursor-pointer"
              >
                save
              </a>
            </div>
          </div> */}
      </div>
    </div>
  );
}

export default ProductSection;
