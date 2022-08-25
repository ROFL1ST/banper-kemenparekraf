import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
export default function Video() {
  const swiperRef = React.useRef();
  return (
    <>
      <div
        className="w-full h-3/4 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80)",
        }}
      >
        <div className="bg-white h-full w-full bg-opacity-40 pl-7 py-36">
          <h1 className="lg:text-5xl 2xl:text-8xl font-semibold text-center text-white">
            Video
          </h1>
          <p className="text-center my-5 lg:text-sm 2xl:text-xl text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aut
            repellat voluptates iure consequuntur impedit!
          </p>
          <div className="flex justify-center space-x-3 mb-7">
            <button onClick={() => swiperRef.current.slidePrev()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
            </button>
            <button onClick={() => swiperRef.current.slideNext()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <Swiper
            cssMode={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={20}
            slidesPerView={3}
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
        </div>
      </div>
    </>
  );
}
