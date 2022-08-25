import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
export default function Foto() {
  const swiperRef = React.useRef();
  const imageLength = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3];

  return (
    <>
      <div
        className="w-full h-3/4 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2016/11/29/12/16/buildings-1869425_960_720.jpg)",
        }}
      >
        <div className="bg-black h-full w-full bg-opacity-25 pl-7 py-36">
          <Swiper
            cssMode={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={20}
            slidesPerView={4}
          >
            <SwiperSlide className="swiper-title">
              <h1 className="text-6xl text-white font-bold">Foto</h1>
              <p className="text-white my-3 w-3/4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                necessitatibus? Quidem doloribus ex iure.
              </p>
              <button className="bg-blue-500 bg-opacity-50 text-white px-5 py-2 rounded-full mt-5">
                Selengkapnya
              </button>
            </SwiperSlide>
            {imageLength.map((i, key) => (
              <SwiperSlide className="swiper-image " key={key}>
                <GaleriCard
                  img={
                    "https://awsimages.detik.net.id/visual/2021/12/30/cover-headline-sandiaga-uno-4_169.jpeg?w=360&q=90"
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center space-x-3 mt-16">
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
        </div>
      </div>
    </>
  );
}

function GaleriCard({ img }) {
  return (
    <>
      <div
        className="bg-gray-200 h-full w-full rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="bg-black bg-opacity-50 rounded-2xl h-full w-full flex flex-col justify-end py-5 px-5">
          <h3 className="text-white uppercase text-lg font-semibold">
            lorem ipsum
          </h3>
        </div>
      </div>
    </>
  );
}
