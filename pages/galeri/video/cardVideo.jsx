import React from "react";
import Modal from "./modal";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function CardVideo({ data }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const viewss = async () => {
    const url = `http://128.199.242.242/api/video/${data.id}`;
    try {
      let respond = await axios.put(url);
      console.log("berhasil");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
          viewss();
        }}
        className="my-auto items-center"
      >
        <div
          className=" rounded-lg mx-auto max-h-80 min-w-full bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${data.thumbnail})` }}
        >
          <div className=" bg-black p-40 bg-opacity-25 rounded-lg "></div>
        </div>
      </div>
      <Modal
        data={data}
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </>
  );
}
