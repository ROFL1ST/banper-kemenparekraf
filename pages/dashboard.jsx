/* eslint-disable react/no-unescaped-entities */
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { Disclosure } from "@headlessui/react";
import Footer from "./components/footer";
import Modal from "./components/modal";
import Navbar from "./components/navbar";
import React, { useEffect } from "react";

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);

  useEffect(() => {
    document.title = "Dashboard";
  });

  return (
    <>
      <div className="overflow-x-hidden">
      <Navbar />
      <div
        className="xl:pt-48 lg:pt-48 md:pt-32 pt-32 w-screen h-[90vh] bg-cover bg-center text-white xl:px-20 lg:px-20 md:px-16 sm:px-14 px-12 capitalize rounded-b-2xl"
        style={{ backgroundImage: "url(assets/building.png)" }}
      >
        <div className="xl:w-1/2 lg:w-1/2 md:w-3/4">
          <h1 className="xl:text-4xl lg:text-4xl md:text-2xl text-3xl font-bold">
            Banper Infrastruktur Ekraf
          </h1>
          <p className="mt-7 mb-3">
            {" "}
            Fasilitasi Revitalisasi Infrastruktur Fisik Ruang Kreatif dan Sarana
            Ruang Kreatif.
          </p>
          <p>
            Pengajuan dan penerimaan proposal mulai tanggal 08 November sampai
            dengan 08 Desember 2021 jam 23.59
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          setOpen(true);
        }}
        className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white xl:px-28 lg:px-28 md:px-20 sm:px-16 px-14 rounded-xl text-xl py-6 relative xl:bottom-11 lg:bottom-11 md:bottom-36 sm:bottom-28 bottom-28"
      >
        daftar sekarang
      </button>
      <div className="xl:px-20 lg:px-20 px-5">
        <Section text={"mekanisme pendaftaran"} />
        <p className="text-center xl:px-24 lg:px-24 md:px-14 sm:px-12 px-5 lg:text-sm my-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In
          voluptatibus rem illo accusamus, earum adipisci aliquam dolorem dolor
          assumenda aperiam sed vel molestiae eos quibusdam explicabo
          consequatur libero. Necessitatibus, consequatur?
        </p>
        <Section text={"Berita"} />
        <div className="flex xl:flex-row lg:flex-row md:flex-col flex-col items-center xl:gap-x-5 lg:gap-x-5 xl:space-y-0 lg:space-y-5 space-y-5 mt-10 2xl:w-full xl:w-1/2 lg:w-1/2">
          <CardBerita />
          <CardBerita />
        </div>
        <div className="flex justify-center text-blue-700 underline mt-5 mb-10 text-sm">
          <a href="#">see more</a>
        </div>
        <Section text={"Galeri"} />
        <div className="grid xl:grid-cols-4 mb-10 gap-4 mt-10">
          <div className="col-span-2 bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
          <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
          <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
          <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
          <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate ">
              lorem ipsum
            </p>
          </div>
          <div className="col-span-2 bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
              lorem ipsum
            </p>
          </div>
        </div>
      </div>
      {/* faq */}
      <div
        className="h-full w-full bg-gray-200 bg-cover bg-bottom "
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2018/03/04/09/51/space-3197611_960_720.jpg)",
        }}
      >
        <div className="bg-gray-200 w-full h-full bg-opacity-20 backdrop-blur-md drop-shadow-lg py-16 2xl:px-80 xl:px-60 lg:px-20 md:px-10 px-3">
          <Section
            text={"Pertanyaan yang sering diajukan (F.A.Q)"}
            color="bg-blue-900"
          />
          <div className="gap-y-7 flex xl:flex-row lg:flex-row md:flex-col flex-col items-center w-full h-full justify-between mt-10">
            <div className="flex flex-col xl:w-1/2 lg:w-1/2 md:w-3/4 w-3/4 space-y-4">
              <Question text={"Bagaimana cara mengajukan pertanyaan?"} />
              <Question text={"Bagaimana cara mengajukan pertanyaan?"} />
              <Question text={"Bagaimana cara mengajukan pertanyaan?"} />
              <Question text={"Bagaimana cara mengajukan pertanyaan?"} />
              <Question text={"Bagaimana cara mengajukan pertanyaan?"} />
              <Question text={"Bagaimana cara mengajukan pertanyaan?"} />
              <Question text={"Bagaimana cara mengajukan pertanyaan?"} />
              <Question text={"Bagaimana cara mengajukan pertanyaan?"} />
              <Question text={"Bagaimana cara mengajukan pertanyaan?"} />
            </div>
            <div className="xl:w-96 lg:w-96 md:w-3/4 w-3/4 h-[29rem] bg-gray-100 rounded-tr-[7rem] rounded-br-2xl rounded-bl-[7rem]"></div>
          </div>
          <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-row  flex-col justify-center gap-y-5 gap-x-5 mt-10 xl:px-0 lg:px-0 md:px-0 sm:px-16 px-16">
            <button className="text-white bg-blue-900 px-5 py-1.5 rounded-full">
              Unduh Juknis
            </button>
            <button className="text-white bg-blue-900 px-5 py-1.5 rounded-full">
              Unduh Template
            </button>
          </div>
        </div>
      </div>
      {/* faq */}
      <Footer />
      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      ></Modal>
      </div>
    </>
  );
}

function Question({ text }) {
  return (
    <>
      <div className="mx-auto w-full  rounded-md  bg-white ">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between  px-4 py-2 text-left text-sm font-medium  ">
                <span>{text}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-blue-900 `}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}

function Section({ text, color }) {
  return (
    <>
      <div className="text-center text-blue-900 capitalize text-2xl font-bold">
        {text}
      </div>
      <div
        className={`flex mx-auto my-3 h-0.5 w-44 ${
          color === undefined ? "bg-yellow-400" : color
        }`}
      ></div>
    </>
  );
}

function CardBerita() {
  return (
    <>
      <div className="w-full h-[19rem] rounded-xl bg-gray-100 flex">
        <div className="bg-gray-200 w-1/2 rounded-xl h-full"></div>
        <div className="py-4 w-1/2 px-5 flex flex-col justify-between h-full">
          <div>
            <small className="font-semibold xl:text-base lg:text-sm text-xs text-gray-500">
              23 Desember 2021
            </small>
            <h3 className="xl:text-base lg:text-base max-h-16 truncate text-sm my-3 font-bold capitalize">
              Menkeparekraf dorong pengembangan potensi ekonomi Kreatif kuliner
              magelang
            </h3>
            <small className="xl:text-base lg:text-base text-xs text-ellipsis ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
              laudantium culpa ullam minima alias quis mollitia praesentium
              sunt!
            </small>
          </div>
          <small className="text-xs font-semibold text-blue-900">
            Kota Magelang
          </small>
        </div>
      </div>
    </>
  );
}
