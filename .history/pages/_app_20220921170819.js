import "../styles/globals.css";
import { persistor, store } from "../redux/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RecoilRoot>
          <Component {...pageProps} />;
        </RecoilRoot>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
