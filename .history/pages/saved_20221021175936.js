import { BookmarkSlashIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Modal from "../components/Modal";

import Sidebar from "../components/Sidebar";
import { removefromBasket, selectItems } from "../redux/slices/basketSlice";

function saved() {
  const router = useRouter();
  const notify = () =>
    toast.error("Removed from Saved", {
      duration: 1000,
    });
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  // console.log(items);

  const RemoveItemFromBasket = (id) => {
    // removing the item from Redux
    dispatch(removefromBasket({ id: id }));

    router.push("/saved");

    toast.error("Removed from saved");
  };
  return (
    <>
      <Head>
        <title>Blog JS | Saved</title>
        <link
          rel="icon"
          href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
        />
      </Head>
      <div>
        <Header />
        {/* <Sidebar /> */}
      </div>
      <div className="flex bg-black text-white h-screen flex-row overflow-x-scroll  scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div className="flex flex-col px-8  my-8 " key={item._id}>
            <div className=" my-8 h-20 w-72 md:h-80 md:w-80    sm:my-8">
              <img
                className="rounded-full  hover:opacity-80 hover:shadow-lg w-[20rem] h-[20rem] transition duration-200 ease-out  cursor-pointer object-cover flex-shrink-0"
                src={item.image}
                alt=""
              />
            </div>

            <div className="my-8">
              <h2 className="line-clamp-1 "> {item.title} </h2>
              <h3 className="line-clamp-2 text-xs text-gray-500 my-2">
                {item.description}
              </h3>
            </div>

            <div className="flex flex-row items-center space-x-2">
              <img className="rounded-full h-8" src={item.userimg} alt="" />
              <p className="flex-1 text-base ">{item.username}</p>

              <div onClick={notify}>
                <BookmarkSlashIcon
                  onClick={() => RemoveItemFromBasket(item._id)}
                  className="h-4 cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}

        <Modal />
      </div>
    </>
  );
}

export default saved;
