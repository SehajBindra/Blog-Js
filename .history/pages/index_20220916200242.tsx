import { GetServerSideProps } from "next";
import Head from "next/head";
import { connectToDatabase } from "../lib/mongodb";

export default function Home({}) {
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

  console.log(data);

  return {
    props: {
      properties: data,
    },
  };
};
