/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { getGaleri } from "../../../api/restApi";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import Loading from "./loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import MenuProvinsi from "./menu/menuProvinsi";
import MenuSubsector from "./menu/menuSubsector";
import { useSelector } from "react-redux";
import empty from "../../../assets/Empty-amico.png";

export default function Selengkapnya() {
  const [panjang, setPanjang] = React.useState(0);
  const [images, setImages] = React.useState({ data: {}, loading: true });
  const state = useSelector((state) => state.data);

  async function imageList(
    subsektor_id = state?.subsektor_id?.toString(),
    provinsi_id = state?.provinsi_id?.toString(),
    kota_id = state?.kota_id?.toString()
  ) {
    try {
      await getGaleri(
        `gallery?${
          subsektor_id !== undefined && `subsektorId=${subsektor_id}`
        }&${provinsi_id !== undefined && `ProvinsiID=${provinsi_id}`}&${
          kota_id !== undefined && `kotaId=${kota_id}`
        }`
      ).then((result) => {
        setImages((s) => ({ ...s, data: result.data.data, loading: false }));
        setPanjang(result.data.data.length);
      });
    } catch (er) {
      setImages((s) => ({ ...s, loading: false }));
      console.log(er);
    }
  }
  useEffect(() => {
    imageList();
  }, [
    state?.subsektor_id?.length,
    state?.provinsi_id?.length,
    state?.kota_id?.length,
  ]);

  React.useEffect(() => {
    imageList();
    document.title = "Foto";
  }, []);

  const { data, loading } = images;

  // const shuffledPosts = shuffleArray(data);

  // sort
  const [sort, setSort] = React.useState(false);
  return (
    <>
      <Navbar />
      <div className="fixed w-full mt-[104px] flex items-center  bg-white lg:px-40 py-[19px] px-5 z-10">
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
        {data.length != 0 ? (
          images && !loading ? (
            <div className="grid xl:grid-cols-4 mb-10 gap-4 mt-10">
              {data.map((i, key) => (
                <Foto
                  key={key}
                  foto={key}
                  i={i}
                  loading={loading}
                  panjang={panjang}
                />
              ))}
            </div>
          ) : (
            <>
              <Loading />
            </>
          )
        ) : (
          <>
            <div className="relative justify-center mx-auto   items-center flex flex-col py-60 z-10">
              <img src={empty.src} className="h-96 w-auto" alt="" />
              <p className="font-bold">Foto Tidak Tersedia</p>
            </div>
          </>
        )}
      </div>
      <Footer />
      <Sidebar sort={sort} setSort={setSort} setImages={setImages} />
    </>
  );
}
function Foto({ i, foto }) {
  const [open2, setOpen2] = React.useState(false);
  const cancelButtonRef = React.useRef(null);
  return (
    <>
      <div
        style={{ backgroundImage: `url(${i.images[0].images})` }}
        className={`${
          foto === 0 && "col-span-2 row-span-2 max-h-[650px] min-h-[650px]"
        } bg-gray-300  w-full lg:min-h-[650px] min-h-[310px] bg-cover bg-center object-contain ${
          foto === 7 && "col-span-2 row-span-2 max-h-[650px] min-h-[650px]"
        }`}
      >
        <div
          onClick={() => {
            setOpen2(true);
          }}
          className="bg-gradient-to-t from-black w-full h-full flex flex-col justify-end p-7"
        >
          <p className="uppercase font-bold text-white xl:text-base lg:text-base md:text-sm text-sm truncate">
            {i.title}
          </p>
        </div>
      </div>

      <Modal
        open2={open2}
        setOpen2={setOpen2}
        cancelButtonRef={cancelButtonRef}
        foto={i}
      />
    </>
  );
}

function Modal({ foto, open2, setOpen2, cancelButtonRef }) {
  const swiperRef = React.useRef();

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const [fotoData, setFotoData] = React.useState({ data: {}, loading: true });
  const getList = async () => {
    try {
      let respond = await getGaleri(`gallery/${foto.id}`).then(
        (result) => result
      );
      setFotoData((s) => ({
        ...s,
        data: respond.data.data,
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      setFotoData((s) => ({ ...s, loading: false }));
    }
  };
  React.useEffect(() => {
    const ac = new AbortController();
    getList();

    return () => {
      ac.abort();
    };
  }, []);
  const { data, loading } = fotoData;

  return (
    <>
      <Transition.Root show={open2} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          initialFocus={cancelButtonRef}
          onClose={setOpen2}
        >
          <Transition.Child
            as={React.Fragment}
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
            <div className="flex items-end md:pt-32 md:pb-28 md:my-0 py-32 justify-center min-h-full p-4 text-center ">
              <div className="cursor-pointer flex absolute xl:right-[19.5rem] lg:right-10 right-5 2xl:top-16 top-10 text-white">
                <svg
                  onClick={() => {
                    setOpen2(false);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className=" relative flex lg:gap-x-20 lg:space-y-0 space-y-20  text-center overflow-hidden transform transition-all  justify-center ">
                  {foto && !loading ? (
                    <div
                      className={`${
                        data[0]["images"].length !== 1 ? "flex" : "hidden"
                      } justify-center items-center`}
                    >
                      <ArrowLeftCircleIcon
                        onClick={() => swiperRef.current.slidePrev()}
                        className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-white"
                        strokeWidth={1}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <Swiper
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    spaceBetween={30}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    className="modalSwiper"
                  >
                    {foto && !loading ? (
                      data[0]["images"].map((i, key) => (
                        <SwiperSlide className="modalGalery" key={key}>
                          <CardModal
                            img={i.images}
                            tgl={formatter.format(Date.parse(foto.CreatedAt))}
                            summary={i.summary}
                            place={foto.NamaKota}
                          ></CardModal>
                        </SwiperSlide>
                      ))
                    ) : (
                      <></>
                    )}
                  </Swiper>
                  {foto && !loading ? (
                    <div
                      className={`${
                        data[0]["images"].length !== 1 ? "flex" : "hidden"
                      } justify-center items-center`}
                    >
                      <ArrowRightCircleIcon
                        onClick={() => swiperRef.current.slideNext()}
                        className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-white"
                        strokeWidth={1}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function CardModal({ img, tgl, summary, place }) {
  return (
    <>
      <div className="my-auto items-center flex flex-col justify-center">
        <img
          className=" rounded-lg  2xl:min-w-[680px] 2xl:min-h-[443px] 2xl:max-h-[443px] md:min-w-[490px] md:min-h-[318px] md:max-h-[318px] min-w-[353px] min-h-[215px] max-h-[215px]"
          src={img}
          alt={img}
        />
        <div className=" items-center gap-y-5 flex flex-col mt-10 xl:w-1/2 lg:w-3/4 md:w-1/2  w-11/12">
          <h1 className="font-semibold text-white lg:text-lg">
            {tgl} | {place}
          </h1>

          <p className="text-white lg:w-3/4 lg:text-sm text-sm">
            {summary}
          </p>
        </div>
      </div>
    </>
  );
}

function Sidebar({ setSort, sort, getData, setImages }) {
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
            <MenuSubsector getData={getData} type={"Subsector"} show={true} />
          </div>
        </div>
        {/* Filter */}
      </div>
    </>
  );
}
