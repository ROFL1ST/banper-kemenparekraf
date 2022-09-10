import React from "react";

export default function CardBeritaLoading() {
  return (
    <>
      <div className="w-full h-[19rem] rounded-xl bg-gray-100 flex animate-pulse">
        <div className="bg-gray-200 w-1/2 rounded-xl h-full"></div>
        <div className="py-4 w-1/2 px-5 flex flex-col justify-between h-full">
          <div className="space-y-3">
            <div className="text-xs font-bold h-2 w-1/4 bg-gray-500 rounded-full"></div>
            <div className="text-xs font-bold h-3 w-3/4 bg-gray-500 rounded-full"></div>
            <div className="text-xs font-bold h-3 w-3/5 bg-gray-500 rounded-full"></div>
            <div className="text-xs font-bold h-3 w-1/2 bg-gray-500 rounded-full"></div>
          </div>
          <div className="text-xs font-bold h-2 w-1/4 bg-blue-300 rounded-full"></div>
        </div>
      </div>
    </>
  );
}
