/* eslint-disable react/no-unescaped-entities */
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { Disclosure } from "@headlessui/react";
import Footer from "../components/footer";
import Modal from "../components/modal";
import Navbar from "../components/navbar";
import React, { useEffect } from "react";
import Section from "../components/section";
import building from "../assets/building.png";
import axios from "axios";
import CardBeritaLoading from "./component/CardBeritaLoading";
import CardForOneBerita from "./component/CardForOneBerita";
import Link from "next/link";

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);

  const [data, setData] = React.useState({ berita: {}, loading: true });
  const getData = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "true",
      },
    };
    const url = "http://128.199.242.242/api/news?limit=2";
    try {
      let respond = await axios.get(url, config);
      console.log(respond.data.data, "hai");
      setData((s) => ({ ...s, berita: respond.data.data, loading: false }));
    } catch (error) {
      console.log(error);
      setData((s) => ({ ...s, loading: false }));
    }
  };
  useEffect(() => {
    document.title = "Dashboard";
    getData();
  }, []);
  console.log(data.berita);
  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar open={open} setOpen={setOpen} />
        <div
          className="xl:pt-48 lg:pt-48 md:pt-32 pt-32 w-screen h-[90vh] bg-cover bg-center text-white xl:px-20 lg:px-20 md:px-16 sm:px-14 px-12 capitalize rounded-b-2xl"
          style={{ backgroundImage: `url(${building.src})` }}
        >
          <div className="xl:w-1/2 lg:w-1/2 md:w-3/4">
            <h1 className="xl:text-4xl lg:text-4xl md:text-2xl text-3xl font-bold">
              Banper Infrastruktur Ekraf
            </h1>
            <p className="mt-7 mb-3">
              Fasilitasi Revitalisasi Infrastruktur Fisik Ruang Kreatif dan
              Sarana Ruang Kreatif.
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
            voluptatibus rem illo accusamus, earum adipisci aliquam dolorem
            dolor assumenda aperiam sed vel molestiae eos quibusdam explicabo
            consequatur libero. Necessitatibus, consequatur?
          </p>
          <Section text={"Berita"} />
          <div className="flex xl:flex-row lg:flex-row md:flex-col flex-col items-center xl:gap-x-5 lg:gap-x-5 xl:space-y-0 lg:space-y-5 space-y-5 mt-10 2xl:w-full xl:w-1/2 lg:w-1/2">
            {data.berita.length != 0 ||
            data.berita != undefined ||
            data.berita != [] ? (
              data.loading ? (
                <>
                  <CardBeritaLoading />
                  <CardBeritaLoading />
                </>
              ) : data.berita.length != 1 ? (
                data.berita.map((i, key) => <CardBerita key={key} data={i} />)
              ) : (
                <>
                  {data.berita.map((i, key) => (
                    <CardBerita key={key} data={i} />
                  ))}
                  <CardForOneBerita />
                </>
              )
            ) : (
              <h1>No Data</h1>
            )}
          </div>
          <div className="flex justify-center text-blue-700 underline mt-5 mb-10 text-sm">
            <Link href={"/berita?type=berita&sort=terbaru"}>see more</Link>
          </div>
          <Section text={"Galeri"} />
          <div className="grid xl:grid-cols-4 mb-10 gap-4 mt-10">
            {/* foto */}
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
            {/* foto */}

            {/* video */}
            <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
              <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
                lorem ipsum
              </p>
              <p className="text-[#00f6ff]">Video</p>
            </div>
            <div className="bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
              <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate ">
                lorem ipsum
              </p>
              <p className="text-[#00f6ff]">Video</p>
            </div>
            <div className="col-span-2 bg-gray-300 h-64 w-full flex flex-col justify-end p-7">
              <p className="uppercase font-bold xl:text-base lg:text-base md:text-sm text-sm truncate">
                lorem ipsum
              </p>
              <p className="text-[#00f6ff]">Video</p>
            </div>
            {/* video */}
          </div>
        </div>
        {/* faq */}
        <div
          className="h-full w-full bg-gray-200 bg-cover bg-bottom "
          style={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_960_720.jpg)",
          }}
        >
          <div
            id="faq"
            className="bg-gray-200 w-full h-full bg-opacity-20 backdrop-blur-sm drop-shadow-lg py-16 2xl:px-80 xl:px-60 lg:px-20 md:px-10 px-3"
          >
            <Section
              text={"Pertanyaan yang sering diajukan (F.A.Q)"}
              color="bg-[#0d3361]"
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
              <button className="text-white bg-[#336ba9] px-5 py-1.5 rounded-full">
                Unduh Juknis
              </button>
              <button className="text-white bg-[#336ba9] px-5 py-1.5 rounded-full">
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

function CardBerita({ data }) {
  const MAX_LENGTHtitle = 75;
  const MAX_LENGTHdetail = 125;
  const detail =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus ligula nec ultricies faucibus. Sed eleifend accumsan turpis id semper. Morbi et faucibus nisi. Cras in mauris at est bibendum dapibus at ac metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque ultricies tincidunt aliquam. Nullam vestibulum metus sed metus bibendum porttitor. Nunc venenatis libero eget ante mollis gravida. Ut dictum ac justo nec molestie. Donec nec felis luctus tortor egestas accumsan. Maecenas laoreet auctor porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique magna non lobortis vestibulum.";

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return (
    <>
      <Link href={`/berita/Detail/${data.Id}`}>
        <div className="w-full h-[19rem] rounded-xl bg-gray-100 flex">
          <div
            style={{
              backgroundImage: `url(${data.foto})`,
            }}
            className=" w-1/2 rounded-xl h-full bg-cover"
          ></div>
          <div className="py-4 w-1/2 px-5 flex flex-col justify-between h-full">
            <div>
              <small className="font-semibold xl:text-base lg:text-sm text-xs text-gray-500">
                {formatter.format(Date.parse(data.CreatedAt))}
              </small>
              {data.Judul.length > MAX_LENGTHtitle ? (
                <h3 className="my-3 font-bold capitalize h-16 lg:text-sm 2xl:text-base">
                  {`${data.Judul.substring(0, MAX_LENGTHtitle)}    ...`}
                </h3>
              ) : (
                <h3 className="my-3 font-bold capitalize h-16 text-ellipsis lg:text-sm 2xl:text-base">
                  {data.Judul}
                </h3>
              )}
              <small className="xl:text-base lg:text-base text-xs text-ellipsis ">
                {detail.length > MAX_LENGTHdetail ? (
                  <h3 className="my-3 font-normal capitalize h-16 text-clip lg:text-sm 2xl:text-lg">
                    {`${detail.substring(0, MAX_LENGTHdetail)}    ...`}
                  </h3>
                ) : (
                  <h3 className="my-3 font-normal capitalize h-16 text-clip lg:text-sm 2xl:text-lg">
                    {detail}
                  </h3>
                )}
              </small>
            </div>
            <small className="text-xs font-semibold text-blue-900">
              {data.NamaKota}
            </small>
          </div>
        </div>
      </Link>
    </>
  );
}
