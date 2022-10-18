import "../styles/globals.css";
import { persistor, store } from "../redux/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

const progress = new ProgressBar({
  size: 4,
  color: "#4D80E4",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
