import "../styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Head from "next/head";
import MuiAlert from "@mui/material/Alert";
import React, { forwardRef, useState } from "react";
import { Snackbar } from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function MyApp({ Component, pageProps }) {
  const [error, setError] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };
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
        <Snackbar open={error} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Website sedang dalam tahap pengembangan
          </Alert>
        </Snackbar>
      </Provider>
    </>
  );
}

export default MyApp;
