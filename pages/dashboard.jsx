import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Footer from "./components/footer";
import Modal from "./components/modal";
import Navbar from "./components/navbar";
import React from "react";

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);

  const cancelButtonRef = React.useRef(null);
  return (
    <>
      <Navbar />
      <div
        className="pt-48 w-full h-[90vh] bg-cover text-white px-20 capitalize"
        style={{ backgroundImage: "url(assets/building.png)" }}
      >
        <div className="w-1/2">
          <h1 className="text-4xl font-bold">Banper Infrastruktur Ekraf</h1>
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
        className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white px-28 rounded-xl text-xl py-6 relative bottom-11"
      >
        daftar sekarang
      </button>
      <div className="px-20">
        <Section text={"mekasnime pendaftaran"} />
        <p className="text-center px-24 lg:text-sm my-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In
          voluptatibus rem illo accusamus, earum adipisci aliquam dolorem dolor
          assumenda aperiam sed vel molestiae eos quibusdam explicabo
          consequatur libero. Necessitatibus, consequatur?
        </p>
        <Section text={"Berita"} />
        <div className="flex space-x-5 mt-10">
          <CardBerita />
          <CardBerita />
        </div>
        <div className="flex justify-center text-blue-700 underline mt-5 mb-10 text-sm">
          <a href="#">see more</a>
        </div>
        <Section text={"Galeri"} />
        <div className="grid grid-cols-4 mb-10 gap-4 mt-10">
          <div className="col-span-2 bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold">lorem ipsum</p>
          </div>
          <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold">lorem ipsum</p>
          </div>
          <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold">lorem ipsum</p>
          </div>
          <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold">lorem ipsum</p>
          </div>
          <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold">lorem ipsum</p>
          </div>
          <div className="col-span-2 bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold">lorem ipsum</p>
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
        <div className="bg-gray-200 w-full h-full bg-opacity-20 backdrop-blur-md drop-shadow-lg py-16 px-20">
          <Section
            text={"Pertanyaan yang sering diajukan (F.A.Q)"}
            color="bg-blue-900"
          />
          <div className="flex w-full h-full justify-between mt-10">
            <div className="flex flex-col space-y-4">
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
            <div className="w-96 h-[29rem] bg-gray-100 rounded-tr-[7rem] rounded-br-2xl rounded-bl-[7rem]"></div>
          </div>
          <div className="flex justify-center space-x-5 mt-10">
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
    </>
  );
}

function Question({ text }) {
  return (
    <>
      <div className="w-full px-5 py-2 bg-gray-100 text-sm border border-white bg-opacity-50 rounded-md flex space-x-2">
        <p>{text}</p> <ChevronDownIcon className="h-5 w-5 text-blue-900" />{" "}
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
            <small className="font-semibold text-gray-500">
              23 Desember 2021
            </small>
            <h3 className="text-md my-3 font-bold capitalize">
              Menkeparekraf dorong pengembangan potensi ekonomi Kreatif kuliner
              magelang
            </h3>
            <small>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
              laudantium culpa ullam minima alias quis mollitia praesentium
              sunt!
            </small>
          </div>
          <sm className="text-xs font-semibold text-blue-900">Kota Magelang</sm>
        </div>
      </div>
    </>
  );
}
