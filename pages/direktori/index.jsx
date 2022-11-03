import React from "react";
import Navbar from "../components/navbar";

export default function Direktori() {
  React.useEffect(() => {
    document.title = "Direktori";
  });
  return (
    <>
      <Navbar />
    </>
  );
}
