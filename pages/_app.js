import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/react";

import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

const progress = new ProgressBar({
  size: 4,
  color: "#E23E57",
  // color: "#E23E57" ,"#4D80E4",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <SessionProvider session={session}>
     
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        
      <Analytics />
    </SessionProvider>
  );
}

export default MyApp;
