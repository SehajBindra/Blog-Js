import React from "react";
import { useRouter } from "next/router";
function Footer() {
  const router = useRouter();
  return (
    <div className="grid cursor-pointer  grid-cols-1 md:grid md:grid-cols-3 gap-y-10 px-40 py-14 pb-20 bg-black text-white">
      <div className="space-y-4 text-xs text-white">
        <h5 className="font-semibold">Contact us</h5>
        {/* <p>Facebook </p>
        <p>twitter</p>
        <p>investors</p> */}
        <p>blogjs.tech@gmail.com</p>
        <p>Blog Js</p>
      </div>
      <div className="space-y-4 text-xs  ">
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
