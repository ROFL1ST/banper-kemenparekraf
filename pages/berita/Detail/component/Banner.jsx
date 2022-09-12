/* eslint-disable @next/next/no-img-element */
import React from "react";
import parse from "html-react-parser";

export default function Banner({ data, loading2 }) {
  return (
    <>
      {/* Banner For Dekstop */}
      {data && !loading2 ? (
        <div
          className="xl:flex lg:flex hidden    h-full  bg-no-repeat bg-cover justify-center rounded-3xl"
          style={{
            backgroundImage: `url("http://128.199.242.242/dashboard/assets/images/blog/${data.foto}")`,
          }}
        >
          <div className="px-10 py-10 bg-black bg-opacity-25 rounded-3xl">
            <div className=" lg:flex-grow  lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left pt-96 text-white ">
              <div>
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium w-3/4">
                  {data.Judul}
                </h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex flex-col w-full h-96 rounded-2xl bg-gray-300 animate-pulse">
          <div className="space-y-2 pt-72 px-10">
            <div className="text-xs font-bold h-4 w-1/2 bg-gray-500 rounded-full"></div>
            <div className="text-xs font-bold h-4 w-1/4 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      )}
      {/* Banner For Dekstop */}
      {/* <!-- Banner For Mobile --> */}
      <div className="flex px-5 flex-col justify-center items-center pt-5 xl:hidden lg:hidden w-11/12">
        {data && !loading2 ? (
          <h1 className="flex title-font text-xl mb-4 font-bold pt-5 pb-2">
            {data.Judul}
          </h1>
        ) : (
          <>
            <div className="space-y-2 animate-pulse w-full pb-5">
              <div className="text-xs font-bold h-4 w-3/4 bg-gray-300 rounded-full"></div>
              <div className="text-xs font-bold h-4 w-1/2  bg-gray-300 rounded-full"></div>
            </div>
          </>
        )}

        {data && !loading2 ? (
          <img
            src={`http://128.199.242.242/dashboard/assets/images/blog/${data.foto}`}
            className="rounded-3xl"
            alt=""
          />
        ) : (
          <div className=" w-full h-96 rounded-2xl bg-gray-300 animate-pulse"></div>
        )}
      </div>
      {/* <!-- Banner For Mobile --> */}
    </>
  );
}
