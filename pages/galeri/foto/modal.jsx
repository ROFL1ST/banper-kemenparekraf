import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardModal from "./cardModal";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
export default function Modal({ open, setOpen, cancelButtonRef }) {
  const swiperRef = React.useRef();
  const [image] = React.useState([
    {
      img: "https://asset.kompas.com/crops/FGkE00w3NfqPIrQTn_tTrrWyanA=/0x0:0x0/750x500/data/photo/2021/04/22/60819d99a708b.jpg",
      tgl: "15 January 2022 | Jakarta",
    },
    {
      img: "https://thumb.tvonenews.com/thumbnail/2022/08/28/630b09bd9fb46-gubernur-dki-jakarta-anies-baswedan-dan-wakil-gubernur-dki-jakarta-ahmad-riza-patria-di-monas-jakarta-pusat-rabu-1782022_665_374.jpg",
      tgl: "15 January 2022 | Jakarta",
    },
    {
      img: "https://asset.kompas.com/crops/FGkE00w3NfqPIrQTn_tTrrWyanA=/0x0:0x0/750x500/data/photo/2021/04/22/60819d99a708b.jpg",
      tgl: "15 January 2022 | Jakarta",
    },
    {
      img: "https://asset.kompas.com/crops/FGkE00w3NfqPIrQTn_tTrrWyanA=/0x0:0x0/750x500/data/photo/2021/04/22/60819d99a708b.jpg",
      tgl: "15 January 2022 | Jakarta",
    },
    {
      img: "https://asset.kompas.com/crops/FGkE00w3NfqPIrQTn_tTrrWyanA=/0x0:0x0/750x500/data/photo/2021/04/22/60819d99a708b.jpg",
      tgl: "15 January 2022 | Jakarta",
    },
  ]);
  return (
    <>
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div className="lg:hidden flex absolute right-5 top-20 text-white">
                <svg onClick={() => {
                  setOpen(false)
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
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative flex gap-x-20  text-center overflow-hidden transform transition-all lg:w-1/2 justify-center ">
                  <button onClick={() => swiperRef.current.slidePrev()}>
                    <ArrowLeftCircleIcon
                      className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-white"
                      strokeWidth={1}
                    />
                  </button>
                  <Swiper
                    centeredSlides={true}
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    className="mySwiper"
                  >
                    {image.map((i, key) => (
                      <SwiperSlide key={key}>
                        <CardModal img={i.img} tgl={i.tgl}></CardModal>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button onClick={() => swiperRef.current.slideNext()}>
                    <ArrowRightCircleIcon
                      className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-white"
                      strokeWidth={1}
                    />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
