import { useRef, useState, useEffect } from "react";
import FotoCard from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@mui/material";
import Modal from "./modal";
import axios from "axios";
import Loading from "./loading";
import { getFoto } from "../../api/restApi";

export default function Foto() {
  const swiperRef = useRef();

  // API galery
  const [items, setItem] = useState({ data: {}, loading: true });
  const getList = async () => {
    // const url = "http://128.199.242.242/api/gallery?offset=0&limit=10";
    try {
      // let respond = await axios.get(url);
      let respond = await getFoto("gallery?offset=0&limit=10").then(
        (result) => result
      );
      // console.log(respond.data.data);
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
  // console.log(items);
  const { data, loading } = items;
  return (
    <>
      <div
        className="w-full  bg-no-repeat bg-cover bg-bottom"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2018/04/02/21/33/building-3285254_960_720.jpg)",
        }}
      >
        <div className="bg-black h-full w-full bg-opacity-25 pl-7 2xl:py-52 lg:py-10 py-16 ">
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
