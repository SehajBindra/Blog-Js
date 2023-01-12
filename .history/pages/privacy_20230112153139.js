import React from "react";
import Header from "../components/Header";
import Privacy from "../components/Privacy";

function privacy() {
  return (
    <div className="bg-black h-screen text-white overflow-y-scroll pb-16">
      <div>
        <Header />
        <Head>
          <title>Blog JS | Privacy</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
          />
          <meta property="og:title" content="BlogJS || Privacy" />
          <meta
            property="og:description"
            content="The Company will retain Your Personal Data only for as long as is
          necessary for the purposes set out in this Privacy Policy. We will
          retain and use Your Personal Data to the extent necessary to comply
          with our legal obligations (for example, if we are required to
          retain your data to comply with applicable laws), resolve disputes,
          and enforce our legal agreements and policies."
          />
          <meta property="og:image" content="/logo.jpeg" />
          <meta property="og:url" content="https://blogjs.tech/" />
          <meta name="description" content={`Privacy policy of Blog JS `} />

          <link rel="icon" href="/logo.jpeg" />
        </Head>
      </div>

      <div>
        <Privacy />
      </div>
    </div>
  );
}

export default privacy;
