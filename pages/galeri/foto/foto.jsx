import { useRef, useState, useEffect, Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@mui/material";
import Loading from "./loading";
import { getGaleri } from "../../api/restApi";
import { Dialog, Transition } from "@headlessui/react";
import bg from "../../assets/galeri.png";
export default function Foto() {
  const swiperRef = useRef();

  // API galery
  const [items, setItem] = useState({ data: {}, loading: true });
  const getList = async () => {
    try {
      let respond = await getGaleri("gallery?offset=0&limit=10").then(
        (result) => result
      );
      setItem((s) => ({ ...s, data: respond.data.data, loading: false }));
    } catch (error) {
      console.log(error);
      setItem((s) => ({ ...s, loading: false }));
    }
  };

  useEffect(() => {
    const ac = new AbortController();

    getList();

    return () => {
      ac.abort();
    };
  }, []);
  const { data, loading } = items;
  return (
    <>
      <div
        style={{ backgroundImage: `url(${bg.src})` }}
        className="w-full bg-no-repeat bg-cover bg-bottom"
      >
        <div className="bg-black h-full w-full bg-opacity-25 md:pl-7 2xl:py-52 lg:py-10 py-16 ">
          <div className="xl:hidden lg:hidden w-11/12 mx-auto py-5">
            <h1 className="text-6xl font-semibold text-white text-center">
              Foto
            </h1>
            <p className="text-white text-center my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              repudiandae officia veritatis dignissimos fugit nihil error
            </p>
          </div>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="mySwiper"
            spaceBetween={20}
            slidesPerView={1}
            modules={{ Pagination }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            <SwiperSlide className="swiper-title">
              <h1 className="lg:text-6xl 2xl:text-8xl text-white font-semibold">
                Foto
              </h1>
              <p className="text-white my-3 lg:text-sm 2xl:text-lg 2xl:w-3/4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                necessitatibus? Quidem doloribus ex iure.
              </p>
              <Link href={"/galeri/foto/selengkapnya"}>
                <button className="bg-[#2e619c] bg-opacity-90 text-white px-5 py-2 2xl:py-3 rounded-full lg:text-sm 2xl:text-base font-semibold mt-10">
                  Selengkapnya
                </button>
              </Link>
            </SwiperSlide>
            {data && !loading ? (
              data.map((i, key) => (
                <SwiperSlide className="swiper-image" key={key}>
                  <FotoCard data={i} />
                </SwiperSlide>
              ))
            ) : (
              <>
                <SwiperSlide className="swiper-image">
                  <Loading />
                </SwiperSlide>
                <SwiperSlide className="swiper-image">
                  <Loading />
                </SwiperSlide>
                <SwiperSlide className="swiper-image">
                  <Loading />
                </SwiperSlide>
                <SwiperSlide className="swiper-image">
                  <Loading />
                </SwiperSlide>
              </>
            )}
          </Swiper>
          <div className="flex justify-center space-x-3 2xl:mt-10 mt-5">
            <button onClick={() => swiperRef.current.slidePrev()}>
              <ArrowLeftCircleIcon
                className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-white"
                strokeWidth={1}
              />
            </button>
            <button onClick={() => swiperRef.current.slideNext()}>
              <ArrowRightCircleIcon
                className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-white"
                strokeWidth={1}
              />
            </button>
          </div>
          <div className="lg:hidden flex justify-center 2xl:mt-16 mt-5">
            <Link href={"/galeri/foto/selengkapnya"}>
              <button className="bg-[#2e619c] text-white px-5 py-2 2xl:py-3 rounded-full">
                Selengkapnya
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function FotoCard({ data }) {
  // console.log(data);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="lg:h-96 2xl:h-[30rem] h-96 rounded-2xl w-full bg-cover bg-center shadow-2xl"
        style={{
          backgroundImage: `url(${data.images[0]["images"]})`,
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-25 px-5 py-5 rounded-2xl flex flex-col justify-end">
          {" "}
          <h1 className="text-white font-semibold">{data.title}</h1>
        </div>
      </div>
      <Modal
        foto={data}
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
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
              <div className="cursor-pointer flex absolute xl:right-[19.5rem] lg:right-10 right-5 top-20 text-white">
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
                <Dialog.Panel className=" relative flex lg:gap-x-20 lg:space-y-0 space-y-20  text-center overflow-hidden transform transition-all lg:w-4/5 w-full justify-center ">
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
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
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

          <p className="text-white lg:w-3/4 md:w-full sm:w-1/2 w-4/5  lg:text-sm text-xs font-extralight">
            {summary}
          </p>
        </div>
      </div>
    </>
  );
}
