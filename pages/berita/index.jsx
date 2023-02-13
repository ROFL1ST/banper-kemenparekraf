/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Navbar from "../components/navbar";
import { Fragment, useEffect, useRef, useState } from "react";
import MenuSort from "./menu/menu";
import Footer from "../components/footer";
import CardLoading from "./cardLoading";
import { getApi, PutViews } from "../api/restApi";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import axios from "axios";
import MenuProvinsi from "./menu/menuProvinsi";
import MenuSubsector from "./menu/menuSubsector";
import empty from "../assets/Empty-amico.png";
import { useSelector } from "react-redux";
import Feedback from "../components/feedback";

const MAX_LENGTH = 60;

export default function Berita() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [open, setOpen] = useState(false);
  const loadingLength = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cancelButtonRef = useRef(null);
  const state = useSelector((state) => state.data);
  const [limit, setLimit] = useState(12);
  var router = useRouter();

  const getData = async (
    sort = state.sort,
    subsektor_id = state.subsektor_id?.toString(),
    provinsi_id = state.provinsi_id,
    kota_id = state.kota_id,
    author
  ) => {
    try {
      let respond = await getApi(
        `news?limit=${limit}&${
          subsektor_id !== undefined && `subsektorId=${subsektor_id}`
        }&sort=${sort}&${
          provinsi_id !== undefined && `ProvinsiID=${provinsi_id}`
        }&${kota_id !== undefined && `kotaId=${kota_id}`}&${
          author !== undefined && `author=${author}`
        }`
      );

      setData(respond.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [
    state?.subsektor_id?.length,
    state?.kota_id?.length,
    state?.provinsi_id?.length,
  ]);

  useEffect(() => {
    getData();
    const ac = new AbortController();
    return () => {
      ac.abort();
    };
  }, []);
  useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);

  // sidebar
  const [side, setSide] = useState(false);

  useEffect(() => {
    document.title = "Berita";
    if (side) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  const [filters, setFilters] = useState({
    prov: [],
    sub: [],
  });
  const handleFilters = (filter, category) => {
    const newFilters = { ...filters };

    newFilters[category] = filters;
  };
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <MenuSort data={data} getData={getData} setLoading={setLoading} />
      <div
        className={`pb-20 xl:px-20 lg:px-20 px-10 flex justify-between mt-10 
        `}
      >
        <div className="left lg:flex hidden flex-col py-4 px-10  2xl:w-1/4 xl:w-1/3 w-1/2 h-[600px]  bg-[#f5f5fa] rounded-lg  mr-5 scrollbar overflow-y-auto">
          <h2 className="font-semibold text-base tracking-widest text-gray-900 mb-10  text-center sm:text-left">
            Filter By
          </h2>
          <div className="flex flex-col gap-y-3 pb-20">
            <MenuProvinsi
              getData={getData}
              type={"Provinsi"}
              show={false}
              handleFilters={(filters) => handleFilters(filters, "")}
              setLoading={setLoading}
            />
            <MenuSubsector
              getData={getData}
              type={"Subsektor"}
              show={true}
              setLoading={setLoading}
            />
          </div>
        </div>

        <div className="right  2xl:w-3/5 w-full">
          <div className="flex lg:justify-end justify-between items-center mb-10">
            <div className=" flex lg:flex-row flex-col lg:items-center relative lg:justify-end gap-x-2">
              <label htmlFor="" className="font-bold text-sm">
                Sumber:
              </label>
              <select
                onChange={(e) => {
                  getData(
                    state.sort,
                    state.subsektor_id,
                    state.provinsi_id,
                    state.kota_id,
                    e.target.value
                  );
                }}
                defaultValue={"Pilih"}
                className="outline-none border px-3 py-1.5 rounded-lg "
              >
                <option value="Pilih">Semua</option>
                <option value="admin">Pengumuman</option>
                <option value="user">UMKM</option>
              </select>
            </div>
            <div
              onClick={() => {
                setSide(true);
              }}
              className="lg:hidden mt-5 flex close justify-center items-center border border-gray-400 rounded-xl px-3 py-2 gap-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              <p className="text-sm text-gray-400">Filter</p>
            </div>
          </div>
          <div className="grid xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-3 lg:mt-0 mt-10">
            {/* Bikin Disini Sidebar buat filter */}

            {/* Bikin Disini Sidebar buat filter */}
            {loading ? (
              loadingLength.map((i, key) => <CardLoading key={key} />)
            ) : data.length != 0 ? (
              data?.map((i, key) => <Card data={i} key={key} />)
            ) : (
              <>
                <div className="lg:absolute relative justify-center mx-auto lg:ml-32  items-center flex flex-col mt-10 pb-20">
                  <img src={empty.src} className="lg:h-96 h-72 w-auto" alt="" />
                  <p className="font-bold">Berita Tidak Tersedia</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {data.length >= 15 ? (
        <button
          onClick={() => {
            getData(
              state.subsektor_id?.toString(),
              state.provinsi_id,
              state.kota_id,
              setLimit(limit + 12)
            );
          }}
          className="text-blue-700 underline mt-5 mb-10 text-sm text-center w-full"
        >
          more
        </button>
      ) : (
        <></>
      )}
      <Footer />
      <Feedback />

      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      ></Modal>
      <Sidebar side={side} setSide={setSide} getData={getData} />
    </>
  );
}

function Card({ data }) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const viewss = async () => {
    try {
      let respond = await PutViews(`news/${data.Id}`).then((result) => result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link href={`/berita/Detail/${data.Id}`}>
        <div
          onClick={() => {
            viewss();
          }}
          draggable="true"
          className="bg-[#f5f5fa] w-full h-80 rounded-2xl"
        >
          <div
            className="w-full h-1/2 bg-cover rounded-t-2xl bg-center"
            style={{
              backgroundImage: `url(${data.foto})`,
            }}
          ></div>
          <div className="px-5 py-1">
            <small className="text-xs font-bold text-gray-500">
              {formatter.format(Date.parse(data.CreatedAt))}
            </small>
            {data.Judul.length > MAX_LENGTH ? (
              <h3 className="my-3 font-bold capitalize h-16 lg:text-sm 2xl:text-base">
                {`${data.Judul.substring(0, MAX_LENGTH)}    ...`}
              </h3>
            ) : (
              <h3 className="my-3 font-bold capitalize h-16 text-ellipsis lg:text-sm 2xl:text-base">
                {data.Judul}
              </h3>
            )}
            <small className="text-xs font-bold text-blue-900">
              {data.NamaKota}
            </small>
          </div>
        </div>
      </Link>
    </>
  );
}

function Modal({ open, setOpen, cancelButtonRef }) {
  const [check, setCheck] = useState(false);

  const handleChange = async () => {
    // await getDown(
    //   "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf"
    // );
    // await getDown(
    //   "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip"
    // );

    setCheck((current) => !current);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative bg-white rounded-[30px] text-center overflow-hidden shadow-xl transform transition-all sm:my-8  xl:w-1/5 lg:w-1/4 md:w-2/5 sm:w-1/2 w-3/4  p-3">
                  <div className="bg-white px-4 lg:px-1  pt-5 pb-4 ">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                      <Dialog.Title
                          as="h3"
                          className="text-lg md:text-sm leading-6 pb-3 font-medium text-gray-900"
                        >
                          Pengumuman
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm md:text-xs text-gray-500 justify-start text-start ">
                            Sebelum mendaftar, kami sarankan anda untuk
                            mempelajari petunjuk teknis dan templat proposal
                            program ini. Dengan mencentang ceklis di bawah dan
                            klik lanjutkan, maka petunjuk teknis dan templat
                            proposal akan diunduh ke perangkat anda. Setelahnya,
                            anda akan langsung diarahkan menuju pendaftaran akun
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start px-8 lg:px-6 items-center gap-x-3 pb-5">
                    <input
                      type="checkbox"
                      id=""
                      name=""
                      defaultChecked={false}
                      value={check}
                      onChange={handleChange}
                      required
                      className="form-check-input appearance-none h-4 w-4 lg:h-3 lg:w-3 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                    />
                    <p className="font-normal  text-xs text-red-600">
                      Unduh Juknis dan Template
                    </p>
                  </div>
                  <div className="bg-gray-50 gap-x-10 px-4 py-5 lg:px-2 lg:py-3 sm:px-6 sm:flex justify-center ">
                    <button
                      type="button"
                      className="close w-full inline-flex justify-center rounded-[30px] border border-gray-300 shadow-sm px-7 lg:px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto lg:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Decline
                    </button>
                    {check ? (
                      <Downloader setOpen={setOpen} setCheck={setCheck} />
                    ) : (
                      <button
                        type="submit"
                        disabled={true}
                        className="close mt-3 sm:mt-0 md:mt-0 lg:mt-0 22xl:mt-0 2xl:mt-0 w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-7 lg:px-6 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto lg:text-sm"
                      >
                        Accept
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function Downloader({ setOpen, setCheck }) {
  const { pathname } = useRouter();

  const juknisUrl =
    "https://banper.kemenparekraf.go.id/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf";
  const TemplateUrl =
    "https://banper.kemenparekraf.go.id/dashboard/assets/Dokumen_Banper_TA_2023.zip";
  const handleClick = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  const handleClick2 = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  return (
    <Link href={`${pathname === "/auth/login" ? "daftar" : "auth/daftar"}`}>
      <button
        onClick={() => {
          setOpen(false);
          setCheck(false);
          handleClick(juknisUrl);
          handleClick2(TemplateUrl);
        }}
        type="submit"
        className="close mt-3 sm:mt-0 md:mt-0 lg:mt-0 22xl:mt-0 2xl:mt-0 w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-7 lg:px-6 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto lg:text-sm"
      >
        Accept
      </button>
    </Link>
  );
}
function Sidebar({ setSide, side, getData }) {
  return (
    <>
      <div
        className={`${
          side ? "lg:hidden flex" : "hidden"
        } top-0 fixed  flex-col z-30 bg-black  bg-opacity-60 backdrop-blur-lg drop-shadow-lg 2xl:w-1/4 xl:w-1/3 lg:w-1/2 w-full h-full mt-[104px] px-10 py-10 pb-10 overflow-y-auto`}
      >
        {/* Top */}
        <div className="flex justify-between items-center mb-7">
          <div
            onClick={() => {
              setSide(false);
            }}
            className="flex  px-5 py-3 gap-x-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            <p className="text-lg text-white">Filter</p>
          </div>
          <div className="flex justify-center ">
            <div
              onClick={() => {
                setSide(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
             

             

            </div>
          </div>
        </div>
        {/* Top */}
        <div className="border-b-white border-b mb-7"></div>
        {/* Filter */}
        <div className="bg-[#f5f5fa] rounded-xl py-7 px-12  overflow-auto scrollbar h-3/4">
          <h2 className="font-semibold text-base tracking-widest text-gray-900 mb-10  text-center sm:text-left">
            Filter By
          </h2>
          <div className="flex flex-col gap-y-3 pb-20">
            <MenuProvinsi
              type={"Provinsi"}
              show={false}
              handleFilters={(filters) => handleFilters(filters, "")}
            />
            <MenuSubsector getData={getData} type={"Subsektor"} show={true} />
          </div>
        </div>
        {/* Filter */}
      </div>
    </>
  );
}
