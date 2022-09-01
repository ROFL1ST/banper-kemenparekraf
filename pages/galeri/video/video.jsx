import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Pagination } from "swiper";
import { Link } from "@mui/material";
import Modal from "./modal";

export default function Video() {
  const swiperRef2 = useRef();
  const [data] = useState([
    {
      img: "https://i.ytimg.com/vi/YrtS8MESh0I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCznpCSQbe00BPCto1wiHWs38EZkA",
    },
    {
      img: "https://i.ytimg.com/vi/YrtS8MESh0I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCznpCSQbe00BPCto1wiHWs38EZkA",
    },
    {
      img: "https://i.ytimg.com/vi/YrtS8MESh0I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCznpCSQbe00BPCto1wiHWs38EZkA",
    },
    {
      img: "https://i.ytimg.com/vi/YrtS8MESh0I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCznpCSQbe00BPCto1wiHWs38EZkA",
    },
    {
      img: "https://i.ytimg.com/vi/YrtS8MESh0I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCznpCSQbe00BPCto1wiHWs38EZkA",
    },
    {
      img: "https://i.ytimg.com/vi/YrtS8MESh0I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCznpCSQbe00BPCto1wiHWs38EZkA",
    },

    {
      img: "https://i.ytimg.com/vi/YrtS8MESh0I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCznpCSQbe00BPCto1wiHWs38EZkA",
    },
    {
      img: "https://i.ytimg.com/vi/YrtS8MESh0I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCznpCSQbe00BPCto1wiHWs38EZkA",
    },
    {
      img: "https://i.ytimg.com/vi/YrtS8MESh0I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCznpCSQbe00BPCto1wiHWs38EZkA",
    },
    {
      img: "https://i.ytimg.com/vi/YrtS8MESh0I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCznpCSQbe00BPCto1wiHWs38EZkA",
    },
  ]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  return (
    <>
      <div
        className="w-full h-full bg-no-repeat bg-cover bg-bottom rounded-b-3xl"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80)",
        }}
      >
        <div className="bg-black bg-opacity-50 h-full w-full 2xl:py-20 lg:py-16 py-16 rounded-b-3xl">
          <h1 className="text-6xl font-semibold text-white text-center">
            Video
          </h1>
          <p className="text-white text-center my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            repudiandae officia veritatis dignissimos fugit nihil error
          </p>
          <div className="flex justify-center space-x-3 mb-7">
            <button onClick={() => swiperRef2.current.slidePrev()}>
              <ArrowLeftCircleIcon
                className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-white"
                strokeWidth={1}
              />
            </button>
            <button onClick={() => swiperRef2.current.slideNext()}>
              <ArrowRightCircleIcon
                className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-white"
                strokeWidth={1}
              />
            </button>
          </div>
          <div className="px-5">
            {" "}
            <Swiper
              onSwiper={(swiper2) => (swiperRef2.current = swiper2)}
              // className="mySwiper"
              spaceBetween={20}
              slidesPerView={1}
              modules={{ Pagination }}
              scrollbar={{ draggable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {data.map((i, key) => (
                <SwiperSlide key={key}>
                  <div
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="my-auto items-center"
                  >
                    <img className=" rounded-lg mx-auto" src={i.img} alt="" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex justify-center 2xl:mt-16 mt-5">
            <Link href={"/galeri/video/selengkapnya"}>
              <button className="bg-blue-500 text-white px-5 py-1 rounded-full">
                Selengkapnya
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} />
    </>
  );
}
