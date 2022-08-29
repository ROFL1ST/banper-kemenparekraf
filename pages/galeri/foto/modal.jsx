import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardModal from "./cardModal";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
export default function Modal({ open, setOpen, cancelButtonRef }) {
  const [image] = React.useState([
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
          className="relative z-50"
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
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative   text-center overflow-hidden transform transition-all w-1/2 justify-center ">
                  <Swiper
                    centeredSlides={true}
                  slidesPerView={1}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {image.map((i, key) => (
                      <SwiperSlide key={key}>
                        <CardModal img={i.img} tgl={i.tgl}></CardModal>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
