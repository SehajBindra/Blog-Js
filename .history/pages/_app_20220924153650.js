import "../styles/globals.css";
import { persistor, store } from "../redux/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RecoilRoot>
            <Component {...pageProps} />;
          </RecoilRoot>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
