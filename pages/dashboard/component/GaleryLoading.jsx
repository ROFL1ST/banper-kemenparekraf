import React from "react";

export default function GaleryLoading() {
  return (
    <>
      <div className="grid xl:grid-cols-4 mb-10 gap-4 mt-10 animate-pulse">
        {/* foto */}
        <div className="col-span-2 bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
          <div className="text-xs font-bold h-4 w-1/4 bg-gray-500 rounded-full"></div>
        </div>
        <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
          <div className="text-xs font-bold h-4 w-1/2 bg-gray-500 rounded-full"></div>
        </div>
        <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
          <div className="text-xs font-bold h-4 w-1/2 bg-gray-500 rounded-full"></div>
        </div>
        {/* foto */}

        {/* video */}
        <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7 space-y-2">
          <div className="text-xs font-bold h-4 w-1/2 bg-gray-500 rounded-full"></div>

          <div className="text-xs font-bold h-4 w-1/4 bg-[#00f6ff] rounded-full"></div>
        </div>
        <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7 space-y-2">
          <div className="text-xs font-bold h-4 w-1/2 bg-gray-500 rounded-full"></div>

          <div className="text-xs font-bold h-4 w-1/4 bg-[#00f6ff] rounded-full"></div>
        </div>
        <div className="col-span-2 bg-gray-300 h-64 w-full flex flex-col justify-end p-7 space-y-2">
          <div className="text-xs font-bold h-4 w-1/2 bg-gray-500 rounded-full"></div>

          <div className="text-xs font-bold h-4 w-1/4 bg-[#00f6ff] rounded-full"></div>
        </div>
        {/* video */}
      </div>
    </>
  );
}
