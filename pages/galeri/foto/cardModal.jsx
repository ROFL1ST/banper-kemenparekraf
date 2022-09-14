/* eslint-disable @next/next/no-img-element */
import React from "react";
const MAX_LENGTH = 150;

export default function CardModal({ img, tgl, summary, place }) {
  console.log(summary);
  return (
    <>
      <div className="my-auto items-center flex flex-col justify-center">
        <img
          className=" rounded-lg  2xl:min-w-[680px] 2xl:min-h-[443px] 2xl:max-h-[443px] md:min-w-[490px] md:min-h-[318px] md:max-h-[318px] min-w-[353px] min-h-[215px] max-h-[215px]"
          src={img}
          alt=""
        />
        <div className=" items-center gap-y-5 flex flex-col mt-10 xl:w-1/2 lg:w-3/4 md:w-1/2  w-11/12">
          <h1 className="font-semibold text-white lg:text-lg">
            {tgl} | {place}
          </h1>
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
