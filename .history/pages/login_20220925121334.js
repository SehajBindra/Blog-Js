import React, { useRef, useState } from "react";
import axios from "axios";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  loginFaliure,
  loginStart,
  loginSuccess,
} from "../redux/slices/userSlice";
import Header from "../components/Header";

function Login({ providers }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const submitForm = async (e) => {
    dispatch(loginStart());
    setError(false);
    e.preventDefault();
    try {
      const res = await axios.post("api/user/login", {
        username,
        email,
        password,
      });
      dispatch(loginSuccess(res));
      console.log(res);

      res && router.push("/");

      setUsername("");
      setPassword("");
      setEmail("");
    } catch (error) {
      dispatch(loginFaliure());
      setError(true);
    }
  };
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  return (
    <>
      <Header />

      <div className=" flex flex-col justify-center items-center min-h-screen py-2  px-14 text-center">
        <img
          className="w-80"
          src="https://png.pngtree.com/png-vector/20190303/ourmid/pngtree-modern-abstract-3d-logo-png-image_771012.jpg"
          alt=""
        />

        {/* <p className="font-xs italic">
          This is not a Real App it is Built for Education Purposes only
        </p> */}

        <div className="mt-40">
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className="flex flex-row py-3 px-8 bg-transparent rounded-full text-black border"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  <img
                    className="h-8 object-cover items-center flex"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                    alt=""
                  />
                  Sign In With {provider.name}
                </button>
              </div>
            ))}
        </div>
      </div>

      <form
        onSubmit={submitForm}
        className="    flex   flex-col  rounded-b-xl px-8 py-4 text-sm text-black sm:text-xl "
      >
        <p className="py-1 text-lg text-[#ff2369] sm:text-xl ">Name</p>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="my-1 rounded-lg border-2 border-[#ff2369] bg-transparent py-2 px-4 focus-within:outline-none focus-within:ring-1 focus-within:ring-red-500"
          type="text"
        />

        <p className="my-2 text-xl text-[#ff2369] ">Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="my-1 rounded-lg border-2 border-[#ff2369] bg-transparent py-2 px-4 focus-within:outline-none focus-within:ring-1 focus-within:ring-red-500"
          type="email"
        />
        <p className="my-2 text-xl text-[#ff2369] ">Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="my-1 rounded-lg border-2 border-[#ff2369] bg-transparent py-2 px-4 focus-within:outline-none focus-within:ring-1 focus-within:ring-red-500"
          type="password"
          name=""
          id=""
        />

        <button
          value="Send"
          className="my-5 cursor-pointer overflow-y-hidden rounded-xl bg-[#ff2369] px-4 py-2 font-semibold text-white"
          type="submit"
        >
          Submit
        </button>

        {error && (
          <h2 className="text-white  text-2xl">
            Username or Password already exists
          </h2>
        )}
      </form>
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
