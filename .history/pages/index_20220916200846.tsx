import { GetServerSideProps } from "next";
import Head from "next/head";
import { json } from "node:stream/consumers";
import { connectToDatabase } from "../lib/mongodb";

interface Props {
  properties: object;
}

export default function Home({ properties }: Props) {
  console.log(properties);
  return (
    <div className="container">
      <Head>
        <title>Nextbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>lets build Something</h1>
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
