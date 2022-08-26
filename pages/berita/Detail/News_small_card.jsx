import React from "react";

export default function News_small_card({ data }) {
  return (
    <>
      <div className="flex justify-center items-center ">
        <div
          className="flex w-full h-full px-3 py-3 bg-no-repeat bg-cover justify-center rounded-xl "
          style={{ backgroundImage: `url(${data.urlToImage})` }}
        >
          <div className="lg:flex-grow md:w-11/12 w-5/6  flex flex-col md:items-start md:text-left pt-28 text-white">
            <h1 className="title-font sm:text-sm text-sm  font-medium ">
              {data.title}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
