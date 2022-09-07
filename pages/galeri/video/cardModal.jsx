import React from "react";

export default function CardModal({ data }) {
  // console.log(tgl);
  return (
    <>
      <div className="my-auto items-center">
        <iframe
          className="lg:h-[500px] h-[250px] w-full"
          title="yt"
          src={data.url}
          frameBorder={1}
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
