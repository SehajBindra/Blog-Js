import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
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
          <Image
            src="https://img.freepik.com/free-photo/email-envelope-inbox-shape-social-media-notification-icon-speech-bubbles-3d-cartoon-banner-website-ui-pink-background-3d-rendering-illustration_56104-1329.jpg?w=740&t=st=1673616632~exp=1673617232~hmac=356c0e7a430e0272c4b6e97fb933c7faaea9c7ab499cfe0d2631dd5ef6ef07eb"
            width={24}
            height={24}
          />
          <p>blogjs.tech@gmail.com</p>
        </div>

        <p>Blog Js</p>
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
