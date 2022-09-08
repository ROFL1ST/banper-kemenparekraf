import React from "react";

export default function News_small_card({ data }) {
  return (
    <>
      <div className="flex justify-center items-center ">
        <div
          className="flex w-full h-full  bg-no-repeat bg-cover bg-center justify-center rounded-xl "
          style={{ backgroundImage: `url(${data.foto})` }}
        >
          <div className="bg-black bg-opacity-25 px-3 w-full py-3 rounded-xl">
            <div className="lg:flex-grow   flex flex-col md:items-start md:text-left pt-28 text-white">
              <h1 className="title-font sm:text-sm text-sm  font-medium ">
                {data.Judul}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
