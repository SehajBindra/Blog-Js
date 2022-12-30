import React from "react";
import Header from "../components/Header";

function PrivacyPolicy() {
  return (
    <>
      <div className="scrollbar-hide">
        <Header />
      </div>
      <div className="bg-black overflow-y-scroll scrollbar-hide py-4  max-h-screen text-white">
        This Privacy Policy describes Our policies and procedures on the
        collection, use and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You.
        <p>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </p>
        Interpretation and Definitions Interpretation The words of which the
        initial letter is capitalized have meanings defined under the following
        conditions. The following definitions shall have the same meaning
        regardless of whether they appear in singular or in plural.
      </div>
    </>
  );
}

export default PrivacyPolicy;
