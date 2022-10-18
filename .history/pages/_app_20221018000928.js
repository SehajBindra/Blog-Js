import "../styles/globals.css";
import { persistor, store } from "../redux/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { useRouter } from "next/router";
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

const router = useRouter();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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
                }}
                variants={{
                  initialState: {
                    opacity: 0,
                  },
                  animateState: {
                    opacity: 1,
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
