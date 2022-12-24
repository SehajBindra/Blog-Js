import React from "react";
import Image from "next/image";
import { Zoom } from "react-awesome-reveal";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removefromBasket, selectItems } from "./../redux/slices/SavedSlice";
import { toast } from "react-hot-toast";

function Saved({ items }) {
  // const { data: session } = useSession();
  // console.log(id);
  const addItemToBasket = () => {
    const post = {
      id: product._id,
      title: product.title,
      img: product.img,
      userimg: product.userimg,
      username: product.username,
    };
    //  sending the product as an action to redux store.. the basket slice
    dispatch(addtoBasket(post));

    toast.success("saved");
  };

  // const items = useSelector(selectItems);
  // const dispatch = useDispatch();
  // console.log(items);

  const RemoveItemFromBasket = (id) => {
    // removing the item from Redux
    dispatch(removefromBasket({ id: id }));

    // router.push("/saved");
    toast.error("Removed from saved");
  };
  const router = useRouter();
  return (
    <div>
      {items ? (
        <>
          <div
            onClick={() => router.push(`product/${id}`)}
            className="flex flex-row bg-black text-white   justify-center align-middle cursor-pointer  items-center sm:flex-row py-4 px-8 sm:pr-4 pr-2 "
          >
            <Zoom>
              <div className=" my-4  flex-shrink-0  sm:my-8">
                <Image
                  width={120}
                  height={120}
                  className="image "
                  src={items.img}
                  alt="something went wrong"
                />
              </div>

              <div className="flex flex-col  pl-4">
                <h2 className="text-base max-w-[10rem] tracking-normal leading-relaxed sm:text-lg  font-semibold sm:max-w-xs  md:max-w-sm line-clamp-2  mt-2 ">
                  {items.title}{" "}
                </h2>

                <div className="flex items-center space-x-2 my-2">
                  <Image
                    height={24}
                    width={24}
                    className="rounded-full  pointer-events-none  p-1 object-cover"
                    src={items.userimg}
                    alt="something went wrong"
                  />
                  <h3 className="flex-1 whitespace-nowrap text-sm sm:text-base">
                    {items.username}
                  </h3>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-row space-x-2 items-center cursor-pointer">
                    <h4 className="text-sm sm:text-base">Read more</h4>
                    <ArrowLongRightIcon className="arrow mr-4 animate-pulse" />
                  </div>
                </div>
              </div>
            </Zoom>
          </div>
        </>
      ) : (
        <h2 className="flex justify-center align-middle pt-40 font-extralight  text-xl ">
          you don't have any save posts
        </h2>
      )}
    </div>
  );
}

export default Saved;
