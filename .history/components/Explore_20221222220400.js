import React from "react";
import { Cursor } from "react-simple-typewriter";
import { useTypewriter } from "react-simple-typewriter";
import { connectToDatabase } from "../util/mongodb2";

function Explore({ category }) {
  console.log(category);
  const [text] = useTypewriter({
    words: ["Explore by categories", "Discover that matters to you"],
    loop: true,
    delaySpeed: 2600,
  });
  return (
    <div className="bg-black p-4">
      <h2 className="text-xl font-semibold text-[#E23E57] text-center ">
        {" "}
        <span>{text}</span>
        <Cursor cursorColor="#E23E57" />
      </h2>
    </div>
  );
}

export default Explore;

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
        username: category.username,
        userimg: category.userimg,
        createdAt: category.createdAt.toISOString(),
      })),
    },
  };
}
