import { ArrowRightIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useSession } from "next-auth/react";

import Parser from "html-react-parser";

import { removefromBasket, selectItems } from "../redux/slices/basketSlice";
import { connectToDatabase } from "../util/mongodb2";

function saved({ category }) {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(category);

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
        <Toaster />
        {/* <Sidebar /> */}
      </div>

      <div className="flex bg-black text-white h-screen flex-col overflow-x-scroll  scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, i) => (
          <div className="flex flex-row px-8  my-8 " key={i}>
            <div className=" cursor-pointer md:mt-4">
              <h2 className="line-clamp-1 "> {item.title} </h2>

              <h3 className="line-clamp-2 text-xs text-gray-500 my-2">
                {" "}
                {Parser(`${item.description}`)}
              </h3>

              <div className="flex flex-row items-center space-x-2">
                <img className="rounded-full h-5" src={item.userimg} alt="" />
                <p className="flex-1 text-base whitespace-nowrap ">
                  {item.username}
                </p>

                <div className="flex ">
                  <BookmarkSlashIcon
                    onClick={() => RemoveItemFromBasket(item._id)}
                    className="h-4 cursor-pointer"
                  />
                </div>
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

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const { data: session } = useSession();

  const category = await db
    .collection("products")
    .find({ username: `${session.user.name}` })
    .sort({ $natural: -1 })
    .toArray();

  // finding multiple items from an array using an $in operator
  // const category = await db
  //   .collection("products")
  //   .find({
  //     category: {
  //       $in: [
  //         { name: "Technology" },
  //         { name: "Programing" },
  //         { name: "React js" },
  //       ],
  //     },
  //   })

  return {
    props: {
      category: category.map((category) => ({
        _id: category._id.toString(),
        title: category.title.trim(),
        img: category.img,
        username: category.username,
        userimg: category.userimg,
        createdAt: category.createdAt.toISOString(),
      })),
    },
  };
}
