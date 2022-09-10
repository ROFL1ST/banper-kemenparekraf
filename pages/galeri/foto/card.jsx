import Modal from "./modal";
import React from "react";
export default function FotoCard({ data }) {
  // console.log(data);
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="lg:h-96 2xl:h-[30rem] h-96 rounded-2xl w-full bg-cover bg-center   "
        style={{
          backgroundImage: `url(${data.images[0]["images"]})`,
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-25 px-5 py-5 rounded-2xl flex flex-col justify-end">
          {" "}
          <h1 className="text-white font-semibold">{data.title}</h1>
        </div>
      </div>
      <Modal
        foto={data}
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </>
  );
}
