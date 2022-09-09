/* eslint-disable @next/next/no-img-element */
import React from "react";
const MAX_LENGTH = 150;

export default function CardModal({ img, tgl, summary }) {
  console.log(summary);
  return (
    <>
      <div className="my-auto items-center flex flex-col justify-center">
        <img className=" rounded-lg mx-auto  " src={img} alt="" />
        <div className=" items-center gap-y-5 flex flex-col mt-10">
          <h1 className="font-bold text-white lg:text-lg">{tgl}</h1>
          {summary.length > MAX_LENGTH ? (
            <p className="text-white lg:w-3/4 lg:text-xs text-xs">{summary}</p>
          ) : (
            <p className="text-white lg:w-3/4 lg:text-base text-sm">
              {summary}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
