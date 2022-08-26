import { useRef } from "react";
import FotoCard from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
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
        className="w-full  bg-no-repeat bg-cover bg-bottom"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2018/04/02/21/33/building-3285254_960_720.jpg)",
        }}
      >
        <div className="bg-black h-full w-full bg-opacity-25 pl-7 2xl:py-52 lg:py-10 py-10 ">
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
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
          >
            <SwiperSlide className="swiper-title">
              <h1 className="lg:text-6xl 2xl:text-8xl text-white font-bold">
                Foto
              </h1>
              <p className="text-white my-3 lg:text-sm 2xl:text-lg 2xl:w-3/4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                necessitatibus? Quidem doloribus ex iure.
              </p>
              <button className="bg-blue-900 bg-opacity-90 text-white px-5 lg:py-1 2xl:py-2 rounded-full 2xl:text-xl font-semibold mt-10">
                Selengkapnya
              </button>
            </SwiperSlide>
            {imageLength.map((i, key) => (
              <SwiperSlide className="swiper-image" key={key}>
                <FotoCard
                  img={
                    "https://awsimages.detik.net.id/visual/2021/12/30/cover-headline-sandiaga-uno-4_169.jpeg?w=360&q=90"
                  }
                />
              </SwiperSlide>
            ))}
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
        </div>
      </div>
    </>
  );
}
