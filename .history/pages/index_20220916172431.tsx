import Head from "next/head";

import { InferGetServerSidePropsType } from "next";

export default function Home() {
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
