import { GetServerSideProps } from "next";
import Head from "next/head";

import { connectToDatabase } from "../lib/mongodb";

interface Props {
  properties: [];
}

export default function Home({ properties }: Props) {
  console.log(properties);
  return (
    <div className="">
      <Head>
        <title>Nextbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {properties.map((_property: any) => (
        <div
          className="flex flex-col  flex-shrink-0  items-center sm:flex-row py-7 px-2 border-b pr-4 rounded-xl cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t"
          key={_property._id}
        >
          <div className="relative my-24 h-32 w-72 md:h-52 md:w-80 flex-shrink-0 ">
            <img
              className=" flex-shrink-0  object-cover rounded-lg"
              src={_property.image}
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="flex flex-col sm:mx-16 items-center mx-4 py-2 text-lg font-semibold">
              {_property.name}
            </h2>
          </div>

          {/* <h1 className="mx-8 text-xs ">{_property.summary}</h1> */}
          <p className="text-sm line-clamp-3 mx-4">{_property.description}</p>

          <p className="text-sm font-extralight">${_property.price} </p>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("listingsAndReviews")
    .find({})
    .limit(20)
    .toArray();

  const properties = JSON.parse(JSON.stringify(data));

  const filtered = properties?.map((_property: any) => {
    const price = JSON.parse(JSON.stringify(_property.price));
    return {
      price: price.$numberDecimal,
      _id: _property._id,
      name: _property.name,
      description: _property.description,
      image: _property.images.picture_url,
    };
  });
  console.log(properties);

  return {
    props: {
      properties: filtered,
    },
  };
};
