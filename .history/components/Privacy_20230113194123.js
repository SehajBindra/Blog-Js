import React from "react";

function Privacy() {
  return (
    <div>
      <div className="max-w-4xl flex flex-col items-center mx-auto space-y-5  px-12 py-4 align-middle justify-center ">
        <div className="space-y-5 break-all">
          <h1 className="text-3xl text-center underline decoration-sky-500 my-2">
            Privacy Policy
          </h1>

          <h2 className="h2pp whitespace-nowrap translate">
            Security of Your Personal Data
          </h2>
          <p>
            The security of Your Personal Data is important to Us, but remember
            that no method of transmission over the Internet, or method of
            electronic storage is 100% secure. While We strive to use
            commercially acceptable means to protect Your Personal Data, We
            cannot guarantee its absolute security.
          </p>

          <h1 className="h2pp">Changes to this Privacy Policy</h1>
          <p>
            We may update Our Privacy Policy from time to time. We will notify
            You of any changes by posting the new Privacy Policy on this page.
          </p>

          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
          <h1 className="h2pp">Contact Us</h1>
          <p>
            If you have any questions about this Privacy Policy, You can contact
            us:
          </p>
          <ul>
            <li className="h2pp text-base font-semibold decoration-sky-500">
              By email: blogjs.tech@gmail.com
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
