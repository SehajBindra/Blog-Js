import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
// import { connectToDatabase } from "../lib/mongodb";

export default function MovieDetails({ movies }) {
  const router = useRouter();
  const movieId = router.query;
  console.log(movieId);
  <div className="">
    <Head>
      <title>Nextbnb</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {movies && (
      <div
        key={movies._id}
        className="flex flex-col  cursor-pointer  items-center sm:flex-row py-7 px-2 border-b pr-4 rounded-xl  hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t"
      >
        <div className="relative my-24 h-32 w-72 md:h-52 md:w-80 flex-shrink-0  sm:my-8">
          <img
            className="rounded-xl h-[8rem] cursor-pointer object-cover flex-shrink-0"
            src={movies.poster}
          />
        </div>

        <div className="flex flex-col flex-grow mt-2 pl-5">
          <div className="flex justify-between items-center">
            {/* <p> {location} </p> */}
            {/* <HeartIcon className="  h-7 cursor-pointer " /> */}
          </div>

          <h4 className="text-xl mt-2 text-left sm:text-left">
            {" "}
            {movies.title}{" "}
          </h4>

          {/* <div className="border-b w-10 pt-2" /> */}

          <p className="pt-2 text-xs text-gray-500 flex-grow line-clamp-2 sm:text-base">
            {" "}
            {movies.plot}{" "}
          </p>

          <div className="flex justify-between items-end pt-5">
            <p className="flex items-center">
              {/* <StarIcon className="h-5 text-red-400" /> {star} */}
            </p>

            <div>
              {/* <p className="pb-2 font-semibold text-lg lg:text-2xl">
                  {" "}
                  ${property.price}{" "}
                </p> */}

              <a className="px-4 py-2 text-red-400 bg-black rounded-lg cursor-pointer">
                Details
              </a>
              {/* <p className="text-right font-extralight"> {total} </p> */}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>;
}

export async function getServerSideProps(context) {
  // const { db } = await connectToDatabase();
  const data = await fetch(
    `http://localhost:3000/api/listingdetails?movie_id${context.query.movie_id}`
  );

  const movies = await data.json();
  // .collection("movies")
  // .find({ year: 2014, "imdb.rating": { $gt: 7.5 }, languages: "English" })
  // .limit(40)
  // .toArray();

  // const properties = data.map((property) => {
  // const movies = JSON.parse(JSON.stringify(data));

  //   let cleaningFee = 0;
  //   if (property.cleaning_fee !== undefined) {
  //     cleaningFee = JSON.parse(JSON.stringify(property.cleaning_fee));
  //     cleaningFee = cleaningFee.$numberDecimal;
  //   }

  // return {
  //   price: price.$numberDecimal,
  //   _id: property._id,
  //   cleaning_fee: cleaningFee,
  //   name: property.name,
  //   description: property.description,
  //   image: property.images.picture_url,
  // };
  // });

  // console.log(properties);

  return {
    props: {
      movies: movies,
    },
  };
}
