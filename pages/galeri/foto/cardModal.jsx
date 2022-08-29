import React from "react";

export default function CardModal({ img, tgl }) {
  console.log(tgl);
  return (
    <>
      <div>
        <img className=" rounded-lg mx-auto" src={img} alt="" />
        <div className=" items-center gap-y-5 flex flex-col mt-10">
          <h1 className="font-bold text-white text-lg">{tgl}</h1>
          <p className="text-white w-3/4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam itaque
            harum quae expedita tempore ab vel obcaecati adipisci libero unde.
          </p>
        </div>
      </div>
    </>
  );
}
