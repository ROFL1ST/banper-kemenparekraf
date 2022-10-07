import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Foto from "./foto/foto";
import Video from "./video/video";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Berita() {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);
  React.useEffect(() => {
    document.title = "Gallery"
  })

  return (
    <>
      <Navbar  />

      <div className="pt-24 pb-16">
        <Foto />
        <Video />
      </div>
      <Footer />
    
    </>
  );
}

