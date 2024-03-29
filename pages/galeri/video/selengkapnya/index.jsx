/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { getGaleri } from "../../../api/restApi";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import Loading from "../loading";
import { Transition } from "@headlessui/react";
import Router from "next/router";
import MenuProvinsi from "./menu/menuProvinsi";
import MenuSubsector from "./menu/menuSubsector";
import { useSelector } from "react-redux";
import empty from "../../../assets/Empty-amico.png";
export default function Selengkapnya() {
  const [videoData, setVideoData] = React.useState({ data: {}, loading: true });
  const state = useSelector((state) => state.data);

  async function getVideo(
    subsektor_id = state?.subsektor_id?.toString(),
    provinsi_id = state?.provinsi_id?.toString(),
    kota_id = state?.kota_id?.toString()
  ) {
    try {
      await getGaleri(
        `video?offset=0&limit=10&${
          subsektor_id !== undefined ? `subsektorId=${subsektor_id}` : ""
        }&${provinsi_id !== undefined ? `ProvinsiID=${provinsi_id}` : ""}&${
          kota_id !== undefined ? `kotaId=${kota_id}` : ""
        }`
      ).then((result) => {
        setVideoData((s) => ({ ...s, data: result.data.data, loading: false }));
      });
    } catch (error) {
      console.log(error);
      setVideoData((s) => ({ ...s, loading: true }));
    }
  }

  useEffect(() => {
    getVideo();
  }, [
    state?.subsektor_id?.length,
    state?.provinsi_id?.length,
    state?.kota_id?.length,
  ]);

  React.useEffect(() => {
    const ac = new AbortController();
    getVideo();
    document.title = "Video";

    return () => {
      ac.abort();
    };
  }, []);

  const { data, loading } = videoData;
  const [sort, setSort] = React.useState(false);
  return (
    <>
      <Navbar />
      <div className="fixed w-full mt-[104px] flex items-center z-20  bg-white lg:px-40 py-[19px] px-5">
        <div
          onClick={() => {
            setSort(true);
          }}
          className="flex border border-gray-400 rounded-xl px-5 py-3 gap-x-2"
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
          <p className="text-md text-gray-400">Filter</p>
        </div>
      </div>
      <div className="pt-40 lg:px-20 px-5">
        <div className="grid xl:grid-cols-3 mb-10 gap-4  mt-10">
          {data && !loading ? (
            videoData?.data.length != 0 ||
            videoData?.data.length != undefined ? (
              data?.map((i, key) => <CardVideo key={key} data={i} />)
            ) : (
              <>
                <div className="relative  justify-center items-center flex flex-col mt-10 pb-20"></div>
                <div className="relative  justify-center items-center flex flex-col mt-10 pb-20">
                  <img src={empty.src} className="lg:h-96 h-72 w-auto" alt="" />
                  <p className="font-bold">Berita Tidak Tersedia</p>
                </div>
                <div className="relative  justify-center items-center flex flex-col mt-10 pb-20"></div>
              </>
            )
          ) : (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          )}
        </div>
      </div>
      <Footer />
      <Sidebar sort={sort} setSort={setSort} />
    </>
  );
}

function CardVideo({ data }) {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);
  const viewss = async () => {
    // const url = `http://128.199.242.242/api/video/${data.id}`;
    try {
      let respond = await PutViews(`video/${data.id}`).then((result) => result);
     
    } catch (error) {
      console.log(error);
    }
  };

  const [kota, setKota] = React.useState({});
  const [load, setLoad] = React.useState(true);
  async function detail() {
    try {
      await getGaleri(`video/${data.id}`).then((result) => {
        setKota(result.data.data[0]);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  }

  React.useEffect(() => {
    detail();
  }, []);

  // hover
  const [isHovering, setIsHovering] = React.useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <>
      <div
        onClick={() => {
          Router.push(`/galeri/video/Detail/${data.id}`);
          viewss();
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="my-auto items-center"
      >
        <div
          className=" rounded-lg mx-auto max-h-96 min-w-full bg-no-repeat bg-cover relative"
          style={{ backgroundImage: `url(${data.thumbnail})` }}
        >
          <div
            className={` rounded-lg   bg-black xl:p-28 md:p-20 sm:p-36 p-20 cursor-pointer  ${
              isHovering
                ? "hover:bg-gradient-to-t hover:from-black bg-black bg-opacity-25 transition ease-in-out "
                : "bg-black bg-opacity-25 transition ease-in-out "
            }`}
          >
            <div className="mx-auto flex justify-center items-center ">
              <div className="bg-white bg-opacity-25 rounded-full xl:p-5 p-2 border-white border flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="lg:w-10 lg:h-10 w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </div>
            </div>
            {isHovering && (
              <Transition show={isHovering} appear={true}>
                <Transition.Child
                  enter="transition-opacity ease-linear duration-300 "
                  enterFrom="opacity-0 "
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute justify-start lg:flex hidden flex-col bottom-10 left-10 ">
                    {!load && kota ? (
                      <p className="uppercase font-bold text-white xl:text-base lg:text-base md:text-sm text-sm truncate">
                        {kota.NamaKota}
                      </p>
                    ) : (
                      <>
                        <div className="animate-pulse">
                          <div className="text-xs font-bold h-2 w-1/4 bg-gray-500 rounded-full"></div>
                        </div>
                      </>
                    )}
                    {/* <p className="text-blue-300">video</p> */}
                  </div>
                </Transition.Child>
              </Transition>
            )}
            <div className="lg:hidden absolute justify-start flex flex-col bottom-5 left-5 ">
              {!load && kota ? (
                <p className="uppercase font-bold text-white xl:text-base lg:text-base md:text-sm text-sm truncate">
                  {kota.NamaKota}
                </p>
              ) : (
                <>
                  <div className="animate-pulse">
                    <div className="text-xs font-bold h-2 w-1/4 bg-gray-500 rounded-full"></div>
                  </div>
                </>
              )}
              {/* <p className="text-blue-300">video</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Sidebar({ setSort, sort, getData }) {
  return (
    <>
     <div
          className={`${
            sort ? "flex" : "hidden"
          } top-0 fixed  flex-col z-30 bg-black  bg-opacity-60 backdrop-blur-lg drop-shadow-lg 2xl:w-1/4 xl:w-1/3 lg:w-1/2 w-full h-full mt-[104px] px-10 py-10 pb-10 overflow-y-auto`}
        >
          {/* Top */}
          <div className="flex justify-between items-center mb-7">
            <div
              onClick={() => {
                setSort(false);
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
                  setSort(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
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
