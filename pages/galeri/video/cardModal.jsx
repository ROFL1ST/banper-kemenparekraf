import React from "react";

export default function CardModal({ img, tgl }) {
  console.log(tgl);
  return (
    <>
      <div className="my-auto items-center">
        <iframe
          className="lg:h-[500px] h-[250px] w-full"
          title="yt"
          src="https://youtube.com/embed/YrtS8MESh0I"
          frameBorder={1}
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
