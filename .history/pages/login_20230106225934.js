import React from "react";

import { getProviders, signIn } from "next-auth/react";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"));
// import Header from "../components/Header";
import Head from "next/head";

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
        <img className="w-80" src="/logo.jpeg" alt="" />

        <div className="mt-8">
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className="flex flex-row items-center   py-3 px-8 bg-transparent rounded-full text-white border border-gray-800 whitespace-nowrap"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  <img
                    className="h-8 mr-2 object-cover items-center flex"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                    alt=""
                  />
                  <p className="text-center mr-8">
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

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
