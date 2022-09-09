import React from "react";

export default function Small_Card_Loading({ data }) {
  return (
    <>
      <div className="flex justify-center items-center animate-pulse">
        <div className="flex w-full h-full  bg-no-repeat bg-cover justify-center rounded-xl bg-gray-300">
          <div className="lg:flex-grow   flex flex-col md:items-start md:text-left pt-28 text-white">
            <div className="space-y-2 w-3/4 p-5">
              <div className="text-xs font-bold h-3  bg-gray-400 rounded-full"></div>
              <div className="text-xs font-bold h-3 w-1/4 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
