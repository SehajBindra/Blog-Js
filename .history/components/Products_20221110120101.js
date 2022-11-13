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
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoBasket,
  removefromBasket,
  selectItems,
} from "../redux/slices/basketSlice";

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
    toast.error("Removed from saved");
  };
  const { data: session, status } = useSession();
  const settings = {
    dots: true,
    infinite: true,
    speed: 5,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  // const handleDelete = async (id) => {
  //   console.log(id);
  //   try {
  //     const res = await axios
  //       .delete(`http://localhost:3000/api/products/${id}`, {
  //         data: { username: session?.user.name },
  //       })
  //       .then((res) => {
  //         res && router.push("/");
  //         toast.success("Deleted");
  //       });
  //   } catch (error) {
  //     toast.error("You can only delete your post!");
  //     console.log(error);
  //   }
  // };

  return (
    <Slider {...settings}>
      <div
        key={product._id}
        className="flex flex-col  justify-center align-middle    items-center sm:flex-col py-8 px-8  pr-2 "
      >
        <div className=" my-20 h-60 w-72 md:h-80 md:w-80    sm:my-8">
          <Link href={`/product/${product._id}`}>
            <img
              className="rounded-md  hover:opacity-80 hover:shadow-lg w-[30rem] h-[20rem] transition duration-200 ease-out  cursor-pointer object-cover flex-shrink-0"
              src={product.img}
            />
          </Link>
        </div>

        <div className="flex flex-col flex-grow   pl-2">
          <div className="flex justify-between items-center"></div>

          <h4 className="text-lg line-clamp-1 max-w-xs flex-grow mt-2 text-left sm:text-left">
            {product.title}{" "}
          </h4>

          {/* <div className="border-b w-10 pt-2" /> */}

          <p className=" max-w-xs  text-xs text-gray-500 flex-grow line-clamp-2 sm:text-base">
            {" "}
            {Parser(`${product.desc}`)}{" "}
          </p>

          <div className="flex max-w-xs items-center my-2 space-x-2">
            <img
              className="h-8 w-8 rounded-full  p-1 object-cover"
              src={product.userimg}
              alt=""
            />
            <p className="flex-1">{product.username}</p>

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
    </Slider>
  );
}

export default Products;
