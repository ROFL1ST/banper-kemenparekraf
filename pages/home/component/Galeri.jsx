/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, Fragment } from "react";
import { getGaleri } from "../../api/restApi";
import GaleryLoading from "./GaleryLoading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import empty from "../../assets/Empty-amico.png";
export default function Galeri() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function imageList() {
    try {
      await getGaleri("gallery?offset=0&limit=3").then((result) => {
        setImages(result.data.data);
      });
    } catch (er) {
      console.log(er);
    }
  }
  async function videoList() {
    try {
      await getGaleri("video?offset=0&limit=3").then((result) => {
        setVideos(result.data.data);
        setLoading(false);
      });
    } catch (er) {
      setLoading(false);

      console.log(er);
    }
  }

  useEffect(() => {
    imageList();
    videoList();
  }, []);

  console.log(images.length);

  return (
    <>
      {!loading ? (
        images.length != 0 && videos.length != 0 ? (
          <div className="xl:grid flex flex-col xl:grid-cols-4 mb-10 gap-4 mt-10">
            {/* foto */}
            {images?.map((i, key) => (
              <Foto key={key} foto={key} data={i} />
            ))}
            {/* foto */}

            {/* video */}
            {videos?.map((i, vid) => (
              <Video video={i} vid={vid} key={vid} />
            ))}
            {/* video */}
          </div>
        ) : (
          <>
            <div className="flex relative flex-col justify-center items-center mb-10 mt-5">
              <img src={empty.src} className="lg:h-96 h-72 w-auto" alt="" />
              <p className="font-bold">Galeri Tidak Tersedia</p>
            </div>
          </>
        )
      ) : (
        <>
          <GaleryLoading />
        </>
      )}
      {images.length < 2 && videos.length < 2 ? (
        <></>
      ) : (
        <div className="flex justify-center text-blue-700 underline mt-5 mb-10 text-sm">
          <Link href={"/galeri"}>see more</Link>
        </div>
      )}
    </>
  );
}

function Foto({ data, foto }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${data.images[0].images})` }}
        className={`${
          foto === 0 && "col-span-2"
        } bg-gray-300 xl:h-80 h-72 lg:w-full bg-cover bg-center`}
      >
        <div
          onClick={() => {
            setOpen(true);
          }}
          className="bg-gradient-to-t from-black w-full h-full flex flex-col justify-end p-7"
        >
          <p className="uppercase font-bold text-white xl:text-base lg:text-base md:text-sm text-sm truncate">
            {data.title}
          </p>
        </div>
      </div>

      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        foto={data}
      />
    </>
  );
}

function Video({ video, vid, loading }) {
  const [kota, setKota] = useState({});
  const [load, setLoad] = useState(true);
  async function detail() {
    try {
      await getGaleri(`video/${video.id}`).then((result) => {
        setKota(result.data.data[0]);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  }

  useEffect(() => {
    detail();
  }, []);
  // modal video
  const [open1, setOpen1] = useState(false);
  const cancelButtonRef = useRef(null);
  return (
    <>
      <div
        style={{ backgroundImage: `url(${video.thumbnail})` }}
        className={`${
          vid === 2 && "col-span-2"
        } bg-gray-300 xl:h-80 h-72 w-full bg-cover bg-center`}
      >
        <div className="bg-gradient-to-t from-black w-full h-full flex flex-col justify-end p-7">
          <div className="mx-auto text-white my-auto">
            <Link href={`/galeri/video/Detail/${video.id}`}>
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
            </Link>
          </div>
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
          <p className="text-blue-300">video</p>
        </div>
      </div>
    </>
  );
}

function Modal({ foto, open, setOpen, cancelButtonRef }) {
  const swiperRef = useRef();

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const [fotoData, setFotoData] = useState({ data: {}, loading: true });
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
  useEffect(() => {
    const ac = new AbortController();
    getList();

    return () => {
      ac.abort();
    };
  }, []);
  const { data, loading } = fotoData;

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
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
            <div className="flex items-end md:pt-32 md:pb-28 md:my-0 py-32 justify-center min-h-full p-4 text-center ">
              <div className="cursor-pointer flex absolute xl:right-[19.5rem] lg:right-10 right-5 2xl:top-16 top-10 text-white">
                <svg
                  onClick={() => {
                    setOpen(false);
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
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className=" relative flex lg:gap-x-20 lg:space-y-0 space-y-20  text-center overflow-hidden transform transition-all  justify-center ">
                  {data && !loading ? (
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
      <div className=" items-center flex flex-col justify-center">
        <img
          className=" rounded-lg  2xl:min-w-[680px] 2xl:min-h-[443px] 2xl:max-h-[443px] md:min-w-[490px] md:min-h-[318px] md:max-h-[318px] min-w-[353px] min-h-[215px] max-h-[215px]"
          src={img}
          alt=""
        />
        <div className=" items-center gap-y-5 flex flex-col mt-10 xl:w-1/2 lg:w-3/4 md:w-1/2  w-11/12">
          <h1 className="font-semibold text-white lg:text-lg">
            {tgl} | {place}
          </h1>

          <p className="text-white lg:w-3/4 md:w-full sm:w-1/2 w-4/5  2xl:text-sm text-xs font-extralight">
            {summary}
          </p>
        </div>
      </div>
    </>
  );
}
