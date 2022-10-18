import "../styles/globals.css";
import { persistor, store } from "../redux/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />;
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
