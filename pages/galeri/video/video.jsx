import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState, useEffect, Fragment } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Pagination } from "swiper";
import { Link } from "@mui/material";
import Loading from "./loading";
import { getGaleri, PutViews } from "../../api/restApi";
import { Dialog, Transition } from "@headlessui/react";
import bg from "../../assets/video.png";

export default function Video() {
  const swiperRef2 = useRef();
  const [videoData, setVideoData] = useState({ data: {}, loading: true });
  const getList = async () => {
    // const url = "http://128.199.242.242/api/video";
    try {
      // let respond = await axios.get(url);
      let respond = await getGaleri("video").then((result) => result);
      setVideoData((s) => ({
        ...s,
        data: respond.data.data,
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      setVideoData((s) => ({ ...s, loading: false }));
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    getList();

    return () => {
      ac.abort();
    };
  }, []);
  const { data, loading } = videoData;
  return (
    <>
      <div
        className="w-full h-full  bg-no-repeat bg-cover bg-bottom rounded-b-3xl"
       style={{backgroundImage: `url(${bg.src})`}}
      >
        <div className="bg-black bg-opacity-20 h-full w-full 2xl:py-40 lg:py-16 py-16 md:p-0 p-5 rounded-b-3xl">
          <h1 className="text-6xl font-semibold text-white text-center">
            Video
          </h1>
          <p className="text-white text-center my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            repudiandae officia veritatis dignissimos fugit nihil error
          </p>
          <div className="flex justify-center space-x-3 mb-7">
            <button onClick={() => swiperRef2.current.slidePrev()}>
              <ArrowLeftCircleIcon
                className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-white"
                strokeWidth={1}
              />
            </button>
            <button onClick={() => swiperRef2.current.slideNext()}>
              <ArrowRightCircleIcon
                className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-white"
                strokeWidth={1}
              />
            </button>
          </div>
          <div className="md:px-5">
            {" "}
            <Swiper
              onSwiper={(swiper2) => (swiperRef2.current = swiper2)}
              // className="mySwiper"
              spaceBetween={20}
              slidesPerView={1}
              modules={{ Pagination }}
              scrollbar={{ draggable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {data && !loading ? (
                videoData.data.map((i, key) => (
                  <SwiperSlide key={key}>
                    <CardVideo data={i} />
                  </SwiperSlide>
                ))
              ) : (
                <>
                  <SwiperSlide>
                    <Loading />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Loading />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Loading />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Loading />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Loading />
                  </SwiperSlide>
                </>
              )}
            </Swiper>
          </div>
          <div className="flex justify-center 2xl:mt-16 mt-5">
            <Link href={"/galeri/video/selengkapnya"}>
              <button className="bg-[#2e619c] bg-opacity-90 text-white px-5 py-2 2xl:py-3 rounded-full">
                Selengkapnya
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


function CardVideo({ data }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const viewss = async () => {
    // const url = `http://128.199.242.242/api/video/${data.id}`;
    try {
      let respond = await PutViews(`video/${data.id}`).then((result) => result);
      console.log("berhasil");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
          viewss();
        }}
        className="my-auto items-center"
      >
        <div
          className=" rounded-lg mx-auto max-h-80 min-w-full bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${data.thumbnail})` }}
        >
          <div className=" bg-black xl:p-28 md:p-20 sm:p-36 p-20 bg-opacity-25 rounded-lg ">
            <div className="mx-auto flex justify-center items-center ">
              <div className="bg-white bg-opacity-25 rounded-full xl:p-5 p-2 border-white border flex justify-center items-center">
                {" "}
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
          </div>
        </div>
      </div>
      <VideoModal
        data={data}
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </>
  );
}
function VideoModal({ open, setOpen, cancelButtonRef, data }) {
 
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
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div className="lg:hidden flex absolute right-5 top-20 text-white">
                <svg
                  onClick={() => {
                    setOpen(false);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
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
                <Dialog.Panel className="my-auto relative  overflow-hidden transform transition-all lg:w-1/2 w-11/12 h-full ">
                  <CardModal data={data}></CardModal>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
function CardModal({ data }) {
  // console.log(tgl);
  return (
    <>
      <div className="my-auto items-center">
        <iframe
          className="lg:h-[500px] h-[250px] w-full"
          title="yt"
          src={data.url}
          frameBorder={1}
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
