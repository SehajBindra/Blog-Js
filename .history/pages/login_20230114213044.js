import React from "react";

import { getProviders, signIn } from "next-auth/react";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"));
// import Header from "../components/Header";
import Head from "next/head";
import Image from "next/image";

function Login({ providers }) {
  // const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Sign In | Blog JS</title>
        <link rel="icon" href="/logo.jpeg" />
        <meta name="description" content={`welcome to login page of Blog JS`} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Header />

      <div className=" flex flex-col justify-center items-center min-h-screen py-2 bg-black text-white  px-14 text-center">
        <Image
          height={400}
          width={400}
          className="object-cover"
          src="/logo.jpeg"
          alt="logo"
        />

        <div className="mt-8">
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className="flex flex-row items-center space-x-2   py-3 px-8 bg-transparent rounded-full text-white border border-gray-800 whitespace-nowrap"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  <Image
                    width={35}
                    height={35}
                    className=" flex items-center space-x-2 object-cover  "
                    src="/Google.png"
                    alt="google logo"
                  />
                  <p className="text-center mr-4 ">
                    {" "}
                    Continue with {provider.name}
                  </p>
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Login;

export async function getStaticProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },

    // revailidate: 1,
  };
}
