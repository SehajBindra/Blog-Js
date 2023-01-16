import Head from "next/head";

import React from "react";
import dynamic from "next/dynamic";
// import Header from "../components/Header";
const Modal = dynamic(() => import("../components/Modal"), {
  ssr: false,
});
const Header = dynamic(() => import("../components/Header"));

const Saved = dynamic(() => import("../components/Saved"));

// import Modal from "../components/Modal";
// //

// import { connectToDatabase } from "../util/mongodb2";

import { Toaster } from "react-hot-toast";
import { BookmarkIcon } from "@heroicons/react/24/solid";
// import { selectItems } from "../redux/app/slices/SavedSlice";
// import { useSelector } from "react-redux";

// import Saved from "../components/Saved";

function saved() {
  // const router = useRouter();

  // const { data: session } = useSession();
  // console.log(session);
  // console.log(category);

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <meta
          property="programing"
          content="The Blog.js saved page is a feature that allows users to save posts they are interested in and come back to them later. It has real-time functionality that updates the saved posts in real-time, so users can see their saved posts as soon as they save them. The page is easy to navigate, allowing users to view and organize their saved posts. It also allows users to delete the posts they no longer want to keep. The design is simple and clean, making it easy for users to find the posts they've saved"
        />
        <link rel="icon" href="/logo.jpeg" />
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

// export async function getServerSideProps(ctx) {
// const { db } = await connectToDatabase();

// const category = await db
//   .collection("products")
//   .find({})
//   .sort({ $natural: -1 })
//   .toArray();

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

//   return {
//     props: {
//       category: category.map((category) => ({
//         // _id: category._id.toString(),
//         // title: category.title.trim(),
//         // img: category.img,
//         slug: category.slug,
//         // username: category.username,
//         // userimg: category.userimg,
//         // createdAt: category.createdAt.toISOString(),
//       })),
//     },
//   };
// }
