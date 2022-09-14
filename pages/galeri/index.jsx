import React from "react";
import Footer from "../components/footer";
import Modal from "../components/modal";
import Navbar from "../components/navbar";
import Foto from "./foto/foto";
import Video from "./video/video";

export default function Berita() {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);
  React.useEffect(() => {
    document.title = "Gallery"
  })

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />

      <div className="pt-24 pb-16">
        <Foto />
        <Video />
      </div>
      <Footer />
      <Modal
          open={open}
          setOpen={setOpen}
          cancelButtonRef={cancelButtonRef}
        ></Modal>
    </>
  );
}
