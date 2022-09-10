import React from "react";
import Footer from "../../../components/footer";
import Modal from "../../../components/modal";
import Navbar from "../../../components/navbar";

export default function Selengkapnya() {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);


  return (
    <>
      <Navbar open={open} setOpen={setOpen} />

      <div className="pt-24 px-20">
        <div className="grid xl:grid-cols-4 mb-10 gap-4 mt-10">
          <div className="col-span-2 row-span-2 bg-gray-300 h-[650px] w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
          <div className="bg-gray-300 h-[310px] w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
          <div className="bg-gray-300 h-[310px] w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
          <div className="bg-gray-300 h-[310px] w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
          <div className="bg-gray-300 h-[310px] w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>

          <div className="bg-gray-300 h-[310px] w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
          <div className="bg-gray-300 h-[310px] w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate ">
              lorem ipsum
            </p>
          </div>

          <div className="col-span-2 row-span-2 bg-gray-300 h-[650px] w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
          <div className="bg-gray-300 h-[310px] w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
          <div className="bg-gray-300 h-[310px] w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate ">
              lorem ipsum
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      ></Modal>
    </>
  );
}
