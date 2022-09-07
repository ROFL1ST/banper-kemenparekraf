import React from "react";

export default function CardForOneBerita() {
  return (
    <>
      {" "}
      <div className="w-full h-[19rem] rounded-xl bg-gray-100 flex">
        <div className="bg-gray-200 w-1/2 rounded-xl h-full"></div>
        <div className="py-4 w-1/2 px-5 flex flex-col justify-between h-full">
          <div>
            <h3 className="xl:text-base lg:text-base max-h-16 truncate text-sm my-3 font-bold capitalize">
              No Data
            </h3>
            <small className="xl:text-base lg:text-base text-xs text-ellipsis ">
              The News Only One
            </small>
          </div>
          <small className="text-xs font-semibold text-blue-900">
            Somewhere
          </small>
        </div>
      </div>
    </>
  );
}
