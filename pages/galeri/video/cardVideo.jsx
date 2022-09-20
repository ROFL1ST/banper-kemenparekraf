import React from "react";
import VideoModal from "./modal";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { PutViews } from "../../api/restApi";

export default function CardVideo({ data }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const viewss = async () => {
    // const url = `http://128.199.242.242/api/video/${data.id}`;
    try {
      let respond = await PutViews(`video/${data.id}`).then((result) => result);
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
          <div className=" bg-black xl:p-28 md:p-20 sm:p-36 p-20 bg-opacity-25 rounded-lg ">
            <div className="mx-auto flex justify-center items-center ">
              <div className="bg-white bg-opacity-25 rounded-full xl:p-5 p-2 border-white border flex justify-center items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="lg:w-10 lg:h-10 w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoModal
        data={data}
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </>
  );
}
