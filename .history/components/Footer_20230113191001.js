import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
function Footer() {
  const router = useRouter();
  return (
    <div className="grid cursor-pointer  grid-cols-1 md:grid md:grid-cols-3 gap-y-10 px-40 py-14 pb-20 bg-black text-white">
      <div className="space-y-4 text-xs text-white">
        <h5 className="font-semibold">Contact us</h5>
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
          <div className="navbar">
            <Image
              src="/instagram.svg"
              height={8}
              width={8}
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
        <h5 className="font-semibold link">Privacy</h5>
        <p className="link">Accessibility</p>
        <p className="link">Security of Your Personal Data</p>
      </div>
      <div className="space-y-4 text-xs ">
        <h5 className="font-semibold">Terms & Conditions</h5>

        <p className="link">Trust & Saftey</p>

        {/* <p>it is build for educational purposes</p> */}
        <p>All rights are reserved to BlogJS @2023</p>
      </div>
    </div>
  );
}

export default Footer;
