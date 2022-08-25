import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

export default function Video() {
  const swiperRef = useRef();

  return (
    <>
      <div
        className="w-full h-full bg-no-repeat bg-cover bg-bottom rounded-b-3xl"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80)",
        }}
      >
        <div className="bg-black bg-opacity-50 h-full w-full 2xl:py-20 lg:py-16 py-5 rounded-b-3xl">
          <h1 className="text-6xl font-semibold text-white text-center">
            Video
          </h1>
          <p className="text-white text-center my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            repudiandae officia veritatis dignissimos fugit nihil error
          </p>
          <div className="flex justify-center space-x-3 mb-7">
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
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={3}
            spaceBetween={20}
          >
            <SwiperSlide>
              <iframe
                className="h-72 w-full"
                title="yt"
                src="https://www.youtube.com/embed/N9XIaxhe_EM"
                frameBorder={0}
                allowFullScreen
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
              <iframe
                className="h-72 w-full"
                title="yt"
                src="https://www.youtube.com/embed/N9XIaxhe_EM"
                frameBorder={0}
                allowFullScreen
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
              <iframe
                className="h-72 w-full"
                title="yt"
                src="https://www.youtube.com/embed/N9XIaxhe_EM"
                frameBorder={0}
                allowFullScreen
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
              <iframe
                className="h-72 w-full"
                title="yt"
                src="https://www.youtube.com/embed/N9XIaxhe_EM"
                frameBorder={0}
                allowFullScreen
              ></iframe>
            </SwiperSlide>
          </Swiper>
          <div className="flex justify-center 2xl:mt-16 mt-5">
            <button className="bg-blue-500 text-white px-5 py-1 rounded-full">
              Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
