import React, { useRef, useState } from "react";

import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Header from "../components/Header";

function Login({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <Header />

      <div className=" flex flex-col justify-center items-center min-h-screen py-2 bg-black text-white  px-14 text-center">
        <img
          className="w-80"
          src="https://png.pngtree.com/element_our/20190530/ourmid/pngtree-round-ribbon-png-free-material-png_1254014.jpg"
          alt=""
        />

        <div className="mt-8">
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className="flex flex-row items-center  py-3 px-8 bg-transparent rounded-full text-white border border-gray-800"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  <img
                    className="h-8 mr-2 object-cover items-center flex"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                    alt=""
                  />
                  Continue with {provider.name}
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
