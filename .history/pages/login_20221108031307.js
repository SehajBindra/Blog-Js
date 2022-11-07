import React, { useRef, useState } from "react";

import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Head from "next/head";

function Login({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sign In | Blog JS</title>
        <link
          rel="icon"
          href="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
        />
      </Head>
      <Header />

      <div className=" flex flex-col justify-center items-center min-h-screen py-2 bg-black text-white  px-14 text-center">
        <img
          className="w-80"
          src="https://img.myloview.com/stickers/bm-b-m-letter-logo-design-initial-letter-bm-monogram-on-black-background-b-m-logo-bm-icon-logo-mb-logo-template-mb-alphabet-letter-icon-mb-icon-mb-letter-design-on-black-background-400-210159654.jpg"
          alt=""
        />

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
