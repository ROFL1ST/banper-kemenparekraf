/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function Banner({ data, loading2 }) {
  return (
    <>
      {/* Banner For Dekstop */}
      {data && !loading2 ? (
        <div
          className="xl:flex bg-no-repeat bg-cover bg-bottom hidden lg:h-[26rem] 2xl:h-[34rem] w-full justify-center rounded-3xl"
          style={{
            backgroundImage: `url("http://128.199.242.242/dashboard/assets/images/blog/${data.foto}")`,
          }}
        >
          <div className="h-full w-full bg-black bg-opacity-60 rounded-3xl flex flex-col justify-end p-8">
            <h1 className="title-font sm:text-4xl text-white text-3xl mb-4 font-medium w-3/4">
              {data.Judul}
            </h1>
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
