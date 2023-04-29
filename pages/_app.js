import { Provider } from "react-redux";
import { store, persisitor } from "../server/slice";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/custom.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persisitor}>
        <main>
          <Component {...pageProps} />
        </main>
      </PersistGate>
    </Provider>
  );
}
