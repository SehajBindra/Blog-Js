import React from "react";
import Header from "../components/Header";

function privacy() {
  return (
    <div className="bg-black h-screen text-white overflow-y-scroll">
      <div>
        <Header />
      </div>

      <div className="max-w-3xl flex flex-col items-center mx-auto px-12 py-10 align-middle justify-center ">
        <h2 className="text-3xl my-4 underline decoration-sky-500 ">
          Privcy Policy
        </h2>

        <div>
          <div>
            <h2 className="text-lg underline decoration-sky-500 my-2">
              Interpretation and Definitions
            </h2>
            <p className="break-all">
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
          </div>

          <div>
            <h2 className="text-lg my-2 underline decoration-sky-500 ">
              Definations
            </h2>
            <ul className=" list-disc my-2">
              <li>
                Account means a unique account created for You to access our
                Service or parts of our Service.
              </li>
              <li>
                Company (referred to as either "the Company", "We", "Us" or
                "Our" in this Agreement) refers to Blog Js, Jankpuri New Delhi
                -110058.
              </li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default privacy;
