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
import { getGaleri } from "../../api/restApi";

export default function Modal({ foto, open, setOpen, cancelButtonRef }) {
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
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative flex lg:gap-x-20 lg:space-y-0 space-y-20  text-center overflow-hidden transform transition-all lg:w-4/5 w-full justify-center ">
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
