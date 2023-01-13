import React from "react";

function Footer() {
  return (
    <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-y-10 px-40 py-14 pb-20 bg-black text-white">
      <div className="space-y-4 text-xs text-white">
        <h5 className="font-semibold">Contact us</h5>
        {/* <p>Facebook </p>
        <p>twitter</p>
        <p>investors</p> */}
        <p>Gmail</p>
        <p>Instagram</p>
      </div>
      <div className="space-y-4 text-xs  ">
        <h5 className="font-semibold">Privacy</h5>
        <p>Accessibility</p>
        <p>Security of Your Personal Data</p>
      </div>
      <div className="space-y-4 text-xs ">
        <h5 className="font-semibold">Terms & Conditions</h5>
        <p>Help Center</p>
        <p>Trust & Saftey</p>

        {/* <p>it is build for educational purposes</p> */}
        <p>All rights are reserved to BlogJS @2023</p>
      </div>
    </div>
  );
}

export default Footer;
