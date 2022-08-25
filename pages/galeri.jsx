import React from "react";
import Footer from "./components/footer";
import Foto from "./components/foto";
import Navbar from "./components/navbar";
import Video from "./components/video";

export default function Galeri() {
  React.useEffect(() => {
    document.title = "Galeri";
  });
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <Foto />
        <Video/>
      </div>
      <Footer/>
    </>
  );
}
