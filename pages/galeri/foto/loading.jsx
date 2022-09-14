import React from "react";

export default function Loading() {
  return (
    <>
      <div className=" h-96 rounded-2xl bg-gray-300 animate-pulse">
        <div className="w-full h-full flex flex-col justify-end p-10">
          <div className="text-xs font-bold h-4 w-1/4 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </>
  );
}
