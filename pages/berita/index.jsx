/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Navbar from "../components/navbar";
import { Fragment, useEffect, useRef, useState } from 'react'
import MenuSort from "./menu/menu";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/solid";

import Footer from "../components/footer";
import CardLoading from "./cardLoading";
import { getApi, PutViews } from "../api/restApi";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import axios from "axios";
const MAX_LENGTH = 60;

export default function Berita() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [menu1, setMenu1] = React.useState(false);
  const [menu2, setMenu2] = React.useState(false);
  const [open, setOpen] = useState(false);
  const loadingLength = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cancelButtonRef = useRef(null);
  const { query } = useRouter();
  const { sort, type, sub_id } = query;
  var router = useRouter();
  

  const getData = async (sort, sub_id, prov_id, limit = 15) => {
    try {
      let respond = await getApi(
        `news?limit=${limit}&${
          sub_id !== undefined && `subsektorId=${sub_id}`
        }&sort=${sort}&${prov_id !== undefined && `ProvinsiID=${prov_id}`}`
      );
      setData(respond.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    getData();

    return () => {
      ac.abort();
    };
  }, []);
  useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);
  useEffect(() => {
    document.title = "Berita";
  });

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <MenuSort data={data} getData={getData} setLoading={setLoading} />
      <div className="pb-20 xl:px-20 lg:px-20 px-10 flex justify-between ">
        <div className="p-4  w-1/2 h-80 bg-gray-300 mr-5 rounded-lg">
          <h2 className="font-medium title-font tracking-widest text-gray-900 mb-4 text-sm text-center sm:text-left">Filter By</h2>
         <DropdownFilter/>
        </div>
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-3 mt-10">
          {loading ? (
            loadingLength.map((i, key) => <CardLoading key={key} />)
          ) : data.length == 0 ? (
            <p>TIdak Ada Data</p>
          ) : (
            data.map((i, key) => <Card data={i} key={key} />)
          )}
        </div>
      </div>
      <button
        onClick={() => {
          let limit = 15;
          getData(sort, sub_id, "", limit + 10);
        }}
        className="text-blue-700 underline mt-5 mb-10 text-sm text-center w-full"
      >
        more
      </button>
      <Footer />
      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      ></Modal>
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
                <Link
                  href={`/berita/Detail/${data.Id}`}
                  className="text-blue-600 text-sm font-medium cursor-pointer"
                >
                  Read more
                </Link>
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
  // console.log(check);

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
                          Terms Of Service
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm md:text-xs text-gray-500 justify-start text-start ">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Modi dignissimos dolor illum a recusandae
                            soluta error architecto? Placeat architecto vel enim
                            deleniti reprehenderit repudiandae, consequatur
                            natus delectus odit sed, vero distinctio officiis
                            necessitatibus. Corrupti, ut quo aperiam officia
                            ullam enim corporis recusandae, ad culpa illum,
                            tenetur maiores saepe consectetur exercitationem!
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

function DropdownFilter() {
  return (
    <>
      <div
        className={
          "z-30 rounded-b-2xl flex flex-col fixed xl:hidden lg:hidden w-full pt-32 bg-blue-400 bg-opacity-20 backdrop-blur-lg drop-shadow-lg pb-5 text-sm space-y-3 px-10 text-white" +
          (navbarOpen ? " flex" : " hidden")
        }
      >
        <Link href={"/home"}>
          <p
            className={`cursor-pointer  ${
              pathname === "/home" ? "text-blue-900 font-bold" : "font-medium "
            }`}
          >
            Home
          </p>
        </Link>
        <div onClick={() => setMenu1(!menu1)} className="flex space-x-3">
          <div
            className={
              "cursor-pointer flex items-center space-x-1" +
              (menu1
                ? "bg-white rounded-full text-blue-900 font-bold bg-opacity-70"
                : "")
            }
          >
            Mekanisme Pendaftaran
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 "
              aria-hidden="true"
            />
          </div>
        </div>
        <div
          className={`${menu1 ? "flex-col gap-y-5 list-disc px-5" : "hidden"}`}
        >
          <button className=" group flex w-full items-center rounded-md  px-2 py-2  text-sm text-white">
            {pathname != "/home" ? (
              <Link href={"/home#faq"}>F.A.Q</Link>
            ) : (
              <a href="#faq">F.A.Q</a>
            )}
          </button>

          <a href={juknisUrl}>
            <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-white">
              Unduh Juknis
            </button>
          </a>

          <a href={templateUrl}>
            <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-white">
              Unduh Template
            </button>
          </a>
        </div>

        <Link href={"/berita?type=berita&sort=terbaru"}>
          <p
            className={`cursor-pointer  ${
              pathname === "/berita" ? "text-blue-900 font-bold" : "font-medium"
            }`}
          >
            Berita
          </p>
        </Link>
        <Link href={"/galeri"}>
          <p
            className={`cursor-pointer  ${
              pathname === "/galeri" ||
              pathname === "/galeri/foto/selengkapnya" ||
              pathname === "/galeri/video/selengkapnya"
                ? "text-blue-900 font-bold"
                : "font-medium"
            }`}
          >
            Galeri
          </p>
        </Link>
        {token == null || token == "undefined" || token == undefined ? (
          <>
            <div onClick={() => setMenu2(!menu2)} className="flex space-x-3">
              <div
                className={
                  "cursor-pointer flex items-center space-x-1" +
                  (menu2
                    ? "bg-white rounded-full text-blue-900 font-bold bg-opacity-70"
                    : "")
                }
              >
                Login|Daftar
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 "
                  aria-hidden="true"
                />
              </div>
            </div>
            <div
              className={`${
                menu2 ? "flex-col gap-y-5 list-disc px-5" : "hidden"
              }`}
            >
              <Link href={"/auth/login"}>
                <button
                  className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-white  ${
                    pathname === "/auth/login" &&
                    "bg-white  text-blue-900 font-bold "
                  } `}
                >
                  Login
                </button>
              </Link>

              <button
                onClick={() => {
                  if (pathname === "/auth/daftar") {
                    return;
                  } else {
                    setOpen(true);
                  }
                }}
                className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-white  ${
                  pathname === "/auth/daftar" &&
                  "bg-white  text-blue-900 font-bold "
                } `}
              >
                Daftar
              </button>
            </div>
          </>
        ) : (
          <>
            <div onClick={() => setMenu2(!menu2)} className="flex space-x-3">
              <div
                className={
                  "cursor-pointer flex items-center space-x-1" +
                  (menu2
                    ? "bg-white rounded-full text-blue-900 font-bold bg-opacity-70"
                    : "")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-[142b51]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 "
                  aria-hidden="true"
                />
              </div>
            </div>
            <div
              className={`${
                menu2 ? "flex-col gap-y-5 list-disc px-5" : "hidden"
              }`}
            >
              <Link href={"/proposal"}>
                <button
                  className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-white  ${
                    pathname === "/proposal" &&
                    "bg-white  text-blue-900 font-bold "
                  } `}
                >
                  List Proposal
                </button>
              </Link>

              <Link href={"/editProfile"}>
                <button
                  className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-white  ${
                    pathname === "/editProfile" &&
                    "bg-white  text-blue-900 font-bold "
                  } `}
                >
                  Edit Profile
                </button>
              </Link>
              <button
                onClick={() => {
                  if (pathname === "/auth/daftar") {
                    return;
                  } else {
                    setOpen(true);
                  }
                }}
                className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-white  ${
                  pathname === "/auth/daftar" &&
                  "bg-white  text-blue-900 font-bold "
                } `}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
                    }

function Downloader({ setOpen, setCheck }) {
  const { pathname } = useRouter();

  const juknisUrl =
    "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf";
  const TemplateUrl =
    "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip";

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
