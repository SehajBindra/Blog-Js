import React from "react";
import { connectToDatabase } from "../../lib/mongodb";

export default async function Listings({ property }) {
  console.log(property);
  return (
    <>
      {property && (
        <div>
          <div>
            <div className="flex flex-col  cursor-pointer  items-center sm:flex-row py-7 px-2 border-b pr-4 rounded-xl  hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
              <div className="relative my-24 h-80 w-80 md:h-52 md:w-80 flex-shrink-0  sm:my-8">
                <img
                  className="rounded-xl cursor-pointer object-cover flex-shrink-0"
                  src={property.imags.picture_url}
                />
              </div>

              <div className="flex flex-col flex-grow mt-2 pl-5">
                <div className="flex justify-between items-center">
                  {/* <p> {location} </p> */}
                  {/* <HeartIcon className="  h-7 cursor-pointer " /> */}
                </div>

                <h4 className="text-xl mt-2 text-left sm:text-left">
                  {" "}
                  {property.name}{" "}
                </h4>

                {/* <div className="border-b w-10 pt-2" /> */}

                <p className="pt-2 text-xs text-gray-500 flex-grow  sm:text-base">
                  {" "}
                  {property.description}{" "}
                </p>

                <div className="flex justify-between items-end pt-5">
                  <p className="flex items-center">
                    {/* <StarIcon className="h-5 text-red-400" /> {star} */}
                  </p>

                  <div>
                    {/* <p className="pb-2 font-semibold text-lg lg:text-2xl">
      {" "}
      ${_property.price}{" "}
    </p> */}
                    <a href="/">back</a>
                    {/* <p className="text-right font-extralight"> {total} </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
  const data = await db.collection("listingsAndReviews").findOne(
    {
      _id: params._id,
    },
    {
      projection: {
        name: 1,
        images: 1,
        description: 1,
      },
    }
  );

  return {
    props: {
      property: JSON.parse(JSON.stringify(data)),
    },

    revalidate: 1,
  };
}
