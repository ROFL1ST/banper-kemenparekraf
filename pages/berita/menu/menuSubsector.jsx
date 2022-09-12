import { Link } from "@mui/material";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, FreeMode } from "swiper";
import { getApi } from "../../api/restApi";
import { useEffect } from "react";
import { useState } from "react";

export default function MenuSubsector() {
  const [subsector, setSubsector] = useState([]);
  const getSubsector = async () => {
    try {
      await getApi("master/subsektor").then((val) => {
        setSubsector(val.data.data);
      });
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    getSubsector();
  }, []);
  return (
    <>
      <div className="flex justify-center  mt-9  items-center ml-5 ">
        <Swiper
          className="w-screen"
          slidesPerView={"auto"}
          spaceBetween={15}
          freeMode={true}
          modules={[FreeMode, Pagination]}
        >
          {subsector?.map((i, key) => (
            <SwiperSlide className="min-w-fit menu" key={key}>
              <Button nama={i.Nama} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

function Button({ nama, id }) {
  return (
    <button
      className={`bg-blue-900 bg-opacity-80  px-5 py-2 text-sm   rounded-full   text-white font-semibold `}
    >
      <p className="px-2">{nama}</p>
    </button>
  );
}
