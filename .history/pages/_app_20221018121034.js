import "../styles/globals.css";
import { persistor, store } from "../redux/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

import { AnimatePresence, motion } from "framer-motion";
const progress = new ProgressBar({
  size: 4,
  color: "#4D80E4",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RecoilRoot>
            <AnimatePresence mode="wait">
              <motion.div
                key={router.route}
                initial="initialState"
                animate="animateState"
                exit="exitState"
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                }}
                variants={{
                  initialState: {
                    opacity: 0.8,
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                    backgroundColor: "black",
                  },
                  animateState: {
                    opacity: 1,
                    clipPath: "polygon(50% 0, 100% 0, 100% 100%, 100% 100%)",
                    backgroundColor: "black",
                  },

                  exitState: {},
                }}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </RecoilRoot>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
