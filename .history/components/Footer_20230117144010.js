import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
function Footer() {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-5 justify-center align-middle cursor-pointer gap-x-8 whitespace-nowrap  md:grid md:grid-cols-3 gap-y-10 mx-auto sm:mx-auto py-14 pb-28 bg-black text-white">
      <div className="space-y-4 text-xs text-white">
        <h2 className="font-semibold link ">Contact us</h2>
        {/* <p>Facebook </p>
        <p>twitter</p>
        <p>investors</p> */}

        <div className="navbar">
          <EnvelopeIcon className="h-5 w-5 " />
          <p>blogjs.tech@gmail.com</p>
        </div>

        <a
          href="https://www.instagram.com/blogjstech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="navbar my-4">
            <Image
              src="/Instagram.png"
              height={24}
              width={24}
              alt="Instagram Logo"
              className="rounded-full object-cover"
            />
            <p>Blog Js</p>
          </div>
        </a>
      </div>
      <div
        onClick={() => router.push("/privacy")}
        className="space-y-4 text-xs  "
      >
        <h2 className="font-semibold link">Privacy</h2>
        <p className="link">Accessibility</p>
        <p className="link">Security of Your Personal Data</p>
      </div>
      <div
        onClick={() => router.push("/privacy")}
        className="space-y-4 text-xs "
      >
        <h2 className="font-semibold">Terms & Conditions</h2>

        <p className="link">Trust & Saftey</p>

        <p className="link">All rights are reserved to BlogJS @2023</p>
      </div>
    </div>
  );
}

export default Footer;
