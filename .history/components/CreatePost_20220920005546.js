import React, { useRef, useState } from "react";

function Contact() {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  return (
    <div className=" grid max-w-[1536px] grid-cols-1 bg-black  px-8  sm:grid sm:grid-cols-1">
      <div className=" max-w-[1536px] whitespace-nowrap  px-2 py-4 text-center  text-2xl text-white   md:text-3xl">
        <h1 className="">Feel free to contact!</h1>

        <div className=" my-8  flex flex-row items-center justify-evenly ">
          <div className="my-2 flex items-center  space-x-2">
            <a
              target="blank"
              href="https://www.linkedin.com/in/sehaj-bindra-83a77721a/"
            >
              <img
                className="h-8 animate-pulse"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png"
                alt=""
              />
            </a>
          </div>
          <div className=" flex items-center space-x-2   ">
            <a target="blank" href="https://github.com/SehajBindra">
              <img
                className=" h-8 animate-pulse rounded-full"
                src="https://w7.pngwing.com/pngs/806/394/png-transparent-blue-animal-logo-github-icon-github-blue-world-social-media.png"
                alt=""
              />
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <a target="blank" href="https://www.instagram.com/sehaj_.b18/">
              <img
                className="h-8 animate-pulse"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Instagram.svg/1200px-Instagram.svg.png"
                alt=""
              />
            </a>
          </div>
          {/* <div className="flex items-center space-x-2">
            <CopyToClipboard text="sehajbindra1234@gmail.com">
              <img
                onClick={notify}
                className="h-8 animate-pulse cursor-pointer object-cover"
                src="https://www.logo.wine/a/logo/Gmail/Gmail-Logo.wine.svg"
                alt=""
              />
            </CopyToClipboard>
          </div> */}
        </div>
      </div>
      <form
        // ref={form}
        // value={input}
        onChange={(e) => setInput()}
        className="    flex   flex-col  rounded-b-xl px-8 py-4 text-sm text-white sm:text-xl "
        // onSubmit={handleSubmit(sendEmail)}
      >
        <p className="py-1 text-lg text-[#ff2369] sm:text-xl ">Name</p>
        <input
          name="name"
          //   value={input}
          //   onChange={(e) => setInput()}
          className="my-1 rounded-lg border-2 border-[#ff2369] bg-transparent py-2 px-4 focus-within:outline-none focus-within:ring-1 focus-within:ring-red-500"
          type="text"
          {...register("name", { required: true })}
        />

        <p className="my-2 text-xl text-[#ff2369] ">Email</p>
        <input
          //   value={input}
          //   onChange={(e) => setInput()}
          name="email"
          className="my-1 rounded-lg border-2 border-[#ff2369] bg-transparent py-2 px-4 focus-within:outline-none focus-within:ring-1 focus-within:ring-red-500"
          type="email"
          //   {...register('email', { required: true })}
        />

        <p className="py-2 text-lg text-[#ff2369] sm:text-xl ">Message</p>
        <textarea
          //   value={input}
          //   onChange={(e) => setInput()}
          name="message"
          minLength="8"
          className="resize-none rounded-lg border-2 border-[#ff2369]  bg-transparent py-2 px-4   placeholder:text-black focus-within:outline-none focus-within:ring-1 focus-within:ring-red-500"
          cols="10"
          rows="5"
          //   {...register("message", { required: true })}
        ></textarea>

        <button
          value="Send"
          className="my-5 cursor-pointer overflow-y-hidden rounded-xl bg-[#ff2369] px-4 py-2 font-semibold text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
