import "../styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <link
            rel="shortcut icon"
            href="https://banper.kemenparekraf.go.id/index.png"
          ></link>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
