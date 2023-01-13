import React, { useState } from "react";
// import { useRouter } from "next/router";
import { connectToDatabase } from "../util/mongodb2";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"));
// import Header from "../components/Header";
const Modal = dynamic(() => import("../components/Modal"), {
  ssr: false,
});
// import Modal from "../components/Modal";
const Category = dynamic(() => import("../components/Category"));

// import Category from "../components/Category";
const CategoryBtns = dynamic(() => import("../components/CategoryBtns"), {});
// import CategoryBtns from "../components/CategoryBtns";
import Explore from "../components/Explore";
// const Explore = dynamic(() => import("../components/CategoryBtns"), {
//   ssr: false,
// });

function Hello({ category }) {
  //   const router = useRouter();
  console.log(category);
  const [visible, setVisible] = useState(8);

  const showmoreItems = () => {
    setVisible((prevValue) => prevValue + 8);
  };

  return (
    <div>
      <Head>
        <title>Blog JS | Explore</title>
        <link rel="icon" href="/logo.jpeg" />

        <meta property="Explore" content="Explore-Blog JS" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <div>
        <Header />
        {/* <Toaster /> */}
      </div>

      <Explore />

      <div className="  bg-black flex flex-col justify-center items-center ">
        <CategoryBtns />
      </div>

      <div className="flex h-screen overflow-y-scroll bg-black text-white  flex-col   scrollbar-hide pb-16">
        {category.slice(0, visible).map((category) => (
          <Category category={category} key={category._id} />
        ))}
        <div
          onClick={showmoreItems}
          className="flex items-center justify-center text-center flex-row mx-auto space-x-2 pb-16"
        >
          <button className="loadMore "> Load more </button>

          <ArrowDownIcon className="arrow" />
        </div>
      </div>

      <Modal />
    </div>
  );
}

export default Hello;
// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   };
// }

export async function getServerSideProps({ ctx }) {
  //   console.log("context==>", context);

  let { name } = ctx.name;

  // if (name != "Programing" || name != "Technology") {
  //   return {
  //     redirect: {
  //       destination: "/Explore?name=Programing",
  //       permanent: false,
  //     },
  //     props: {},
  //   };
  // }

  //   console.log("context== >", name, context.query);

  const { db } = await connectToDatabase();

  const category = await db
    .collection("products")
    .find({ category: { name } })
    .sort({ $natural: -1 })
    .toArray();

  return {
    props: {
      category: category.map((category) => ({
        _id: category._id.toString(),
        title: category.title.trim(),
        img: category.img,
        slug: category.slug.trim(),
        username: category.username.trim(),
        userimg: category.userimg,
        createdAt: category.createdAt.toISOString(),
      })),
    },

    // revalidate: 8,
  };
}
