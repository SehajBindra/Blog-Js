import { GetServerSideProps } from "next";
import Head from "next/head";

import { connectToDatabase } from "../lib/mongodb";

interface Props {
  properties: [];
}

export default function Home({ properties }: Props) {
  console.log(properties);
  return (
    <div className="container">
      <Head>
        <title>Nextbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className=" text-2xl">lets build Something</h1>

      {properties.map((_property: any) => (
        <div key={_property._id}>
          <h1>{_property.summary}</h1>
          <p className="text-red-400">{_property.description}</p>
          <img src={_property.picture_url} alt="" />
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
  console.log(properties);

  return {
    props: {
      properties: properties,
    },
  };
};
