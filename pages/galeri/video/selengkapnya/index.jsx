import React from "react";
import Footer from "../../../components/footer";
import Modal from "../../../components/modal";
import Navbar from "../../../components/navbar";

export default function Selengkapnya() {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />

      <div className="pt-24 lg:px-20 px-8">
        <div className="grid xl:grid-cols-3 mb-10  mt-10">
          <iframe
            className="h-96 w-full"
            title="yt"
            src="https://www.youtube.com/embed/N9XIaxhe_EM"
            frameBorder={0}
            allowFullScreen
          ></iframe>
          <iframe
            className="h-96 w-full"
            title="yt"
            src="https://www.youtube.com/embed/N9XIaxhe_EM"
            frameBorder={0}
            allowFullScreen
          ></iframe>
          <iframe
            className="h-96 w-full"
            title="yt"
            src="https://www.youtube.com/embed/N9XIaxhe_EM"
            frameBorder={0}
            allowFullScreen
          ></iframe>
          <iframe
            className="h-96 w-full"
            title="yt"
            src="https://www.youtube.com/embed/N9XIaxhe_EM"
            frameBorder={0}
            allowFullScreen
          ></iframe>
          <iframe
            className="h-96 w-full"
            title="yt"
            src="https://www.youtube.com/embed/N9XIaxhe_EM"
            frameBorder={0}
            allowFullScreen
          ></iframe>
          <iframe
            className="h-96 w-full"
            title="yt"
            src="https://www.youtube.com/embed/N9XIaxhe_EM"
            frameBorder={0}
            allowFullScreen
          ></iframe>
          <iframe
            className="h-96 w-full"
            title="yt"
            src="https://www.youtube.com/embed/N9XIaxhe_EM"
            frameBorder={0}
            allowFullScreen
          ></iframe>
          <iframe
            className="h-96 w-full"
            title="yt"
            src="https://www.youtube.com/embed/N9XIaxhe_EM"
            frameBorder={0}
            allowFullScreen
          ></iframe>
          <iframe
            className="h-96 w-full"
            title="yt"
            src="https://www.youtube.com/embed/N9XIaxhe_EM"
            frameBorder={0}
            allowFullScreen
          ></iframe>
        </div>
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
