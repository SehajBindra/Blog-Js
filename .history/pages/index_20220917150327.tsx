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
        <div className="flex flex-col  cursor-pointer  items-center sm:flex-row py-7 px-2 border-b pr-4 rounded-xl  hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
          <div className="relative my-24 h-32 w-72 md:h-52 md:w-80 flex-shrink-0  sm:my-8">
            <img
              className="rounded-xl cursor-pointer object-cover flex-shrink-0"
              src={_property.image}
            />
          </div>

          <div className="flex flex-col flex-grow mt-2 pl-5">
            <div className="flex justify-between items-center">
              {/* <p> {location} </p> */}
              {/* <HeartIcon className="  h-7 cursor-pointer " /> */}
            </div>

            <h4 className="text-xl mt-2 text-left sm:text-left">
              {" "}
              {_property.name}{" "}
            </h4>

            {/* <div className="border-b w-10 pt-2" /> */}

            <p className="pt-2 text-xs text-gray-500 flex-grow line-clamp-2 sm:text-base">
              {" "}
              {_property.description}{" "}
            </p>

            <div className="flex justify-between items-end pt-5">
              <p className="flex items-center">
                {/* <StarIcon className="h-5 text-red-400" /> {star} */}
              </p>

              <div>
                <p className="pb-2 font-semibold text-lg lg:text-2xl">
                  {" "}
                  ${_property.price}{" "}
                </p>

                <a
                  className="px-4 py-2 text-red-400 bg-black rounded-lg cursor-pointer"
                  href="/listings/{_property._id}"
                >
                  Details
                </a>
                {/* <p className="text-right font-extralight"> {total} </p> */}
              </div>
            </div>
          </div>
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
