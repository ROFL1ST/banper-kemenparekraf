import { Link } from "@mui/material";
import Router, { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, FreeMode } from "swiper";
import { getApi } from "../../api/restApi";
import { useEffect } from "react";
import { useState } from "react";

export default function MenuSubsector({ getData }) {
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
            <SwiperSlide className=" menu" key={key}>
              <Button nama={i.Nama} id={i.Id} getData={getData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

function Button({ nama, id, getData }) {
  const { query } = useRouter();
  const { sort, type, sub_id } = query;
  const { pathname } = useRouter();
  // console.log(sub_id)

  return (
    <button
      onClick={() => {
        Router.push(`/berita?type=${type}&sort=${sort}&sub_id=${id}`);
        getData();
      }}
      className={`
       ${
         sub_id === `${id}`
           ? "bg-blue-900 bg-opacity-80 py-2 rounded-full px-5 text-white font-semibold"
           : "bg-gray-400  bg-opacity-80 px-5 py-2 text-sm rounded-full text-white font-semibold "
       }`}
    >
      {nama}
    </button>
  );
}
