import React from "react";
import Modal from "./modal";
import { useRef, useState, useEffect } from "react";

export default function CardVideo({ data }) {
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
  
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="my-auto items-center"
      >
        <img className=" rounded-lg mx-auto max-h-80 max-w-xl" src={data.thumbnail} alt="" />
      </div>
      <Modal data={data} open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} />
    </>
  );
}
