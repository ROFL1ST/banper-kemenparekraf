import React from "react";

export default function CardModal({ img, tgl }) {
  console.log(tgl);
  return (
    <>
      <div className="my-auto items-center">
        <img className=" rounded-lg mx-auto" src={img} alt="" />
        <div className=" items-center gap-y-5 flex flex-col mt-10">
          <h1 className="font-bold text-white lg:text-lg">{tgl}</h1>
          <p className="text-white lg:w-3/4 lg:text-base text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam itaque
            harum quae expedita tempore ab vel obcaecati adipisci libero unde.
          </p>
        </div>
      </div>
    </>
  );
}
