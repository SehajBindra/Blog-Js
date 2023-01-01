import Head from "next/head";

import React from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
const Modal = dynamic(() => import("../components/Modal"), {
  ssr: false,
});

const Saved = dynamic(() => import("../components/Saved"), {
  ssr: false,
});

// import Modal from "../components/Modal";
//

import { connectToDatabase } from "../util/mongodb2";

import { Toaster } from "react-hot-toast";
import { BookmarkIcon } from "@heroicons/react/24/solid";
// import { selectItems } from "../redux/app/slices/SavedSlice";
// import { useSelector } from "react-redux";

// import Saved from "../components/Saved";

function saved({ category }) {
  // const router = useRouter();

  // const { data: session } = useSession();
  // console.log(session);
  console.log(category);

  // const items = useSelector(selectItems);

  // // console.log(items);

  // const RemoveItemFromBasket = (_id) => {
  //   // removing the item from Redux
  //   dispatch(removefromBasket({ id: _id }));

  //   // router.push("/saved");
  //   toast.error("Removed from saved");
  // };

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

      <main className="bg-black text-white h-screen mx-auto">
        <div className="flex flex-row  justify-center space-x-4  align-middle items-center ">
          <h2 className="text-xl capitalize ">saved</h2>
          <BookmarkIcon className="h-5 w-5" />
        </div>
        {/* {category?.map((category) => (
          <Savepost key={category._id} category={category} />
        ))} */}

        <Saved />
      </main>

      <Modal />
    </>
  );
}

export default saved;

export async function getServerSideProps(ctx) {
  const { db } = await connectToDatabase();

  const category = await db
    .collection("products")
    .find({})
    .sort({ $natural: -1 })
    .toArray();

  // getting posts from specific users
  // let headers = [];
  // const session = await getSession({ ctx });
  // if (session) {
  //   headers = { Authorization: `Bearer ${session.user.name}` };
  // }

  // const category = await db
  //   .collection("products")
  //   .find({ username: `${session?.user.name}` })
  //   .sort({ $natural: -1 })
  //   .toArray();

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
        slug: category.slug,
        username: category.username,
        userimg: category.userimg,
        createdAt: category.createdAt.toISOString(),
      })),
    },
  };
}
