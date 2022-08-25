import { useRef } from "react";
import FotoCard from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

export default function Foto() {
  const swiperRef = useRef();
  const imageLength = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3];
  return (
    <>
      <div
        className="w-full 2xl:h-[90vh] xl:h-[84vh] bg-no-repeat bg-cover bg-bottom"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2018/04/02/21/33/building-3285254_960_720.jpg)",
        }}
      >
        <div className="bg-black h-full w-full bg-opacity-25 px-7 py-10">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={20}
            slidesPerView={4}
          >
            <SwiperSlide>
              <h1 className="lg:text-6xl 2xl:text-8xl text-white font-semibold">Foto</h1>
              <p className="text-white my-3 lg:text-sm 2xl:text-xl">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                necessitatibus? Quidem doloribus ex iure.
              </p>
              <button className="bg-blue-900 bg-opacity-90 text-white px-5 lg:py-1 2xl:py-2 rounded-full 2xl:text-xl font-semibold">
                Selengkapnya
              </button>
            </SwiperSlide>
            {imageLength.map((i, key) => (
              <SwiperSlide key={key}>
                <FotoCard
                  img={
                    "https://asset.kompas.com/crops/FGkE00w3NfqPIrQTn_tTrrWyanA=/0x0:0x0/750x500/data/photo/2021/04/22/60819d99a708b.jpg"
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center space-x-3 mt-5">
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
        </div>
      </div>
    </>
  );
}
