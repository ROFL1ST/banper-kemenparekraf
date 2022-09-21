import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, FreeMode } from "swiper";
import { getApi } from "../../api/restApi";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Link from "next/link";

export default function MenuProvinsi({ getData, setLoading }) {
  const [provinsi, setProvinsi] = useState([]);
  const getProvinsi = async () => {
    try {
      await getApi("master/provinsi").then((val) => {
        setProvinsi(val.data.data);
      });
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    getProvinsi();
  }, []);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <>
      <div className="flex justify-center  mt-9  items-center  ">
        <Swiper
          className="w-screen"
          slidesPerView={"auto"}
          spaceBetween={15}
          freeMode={true}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          modules={[FreeMode, Pagination, Navigation]}
        >
          {provinsi?.map((i, key) => (
            <SwiperSlide className=" menu" key={key}>
              <Button nama={i.NamaProvinsi} id={i.Id} getData={getData} />
            </SwiperSlide>
          ))}
          {/* <div className="flex">
            <button ref={navigationPrevRef}>
              <ArrowLeftCircleIcon
                className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-gray-400"
                strokeWidth={1}
              />
            </button>
            <button ref={navigationNextRef}>
              <ArrowRightCircleIcon
                className="lg:h-9 lg:w-9 2xl:h-12 2xl:w-12 text-gray-400"
                strokeWidth={1}
              />
            </button>
          </div> */}
        </Swiper>
      </div>
    </>
  );
}

function Button({ nama, id, getData }) {
  const { query } = useRouter();
  const { sort, type, sub_id, prov_id } = query;
  const { pathname } = useRouter();

  return (
    <Link href={`/berita?type=${type}&sort=terbaru&prov_id=${id}`}>
      <button
        onClick={() => {
          getData("terbaru", ``, `${id}`);
        }}
        className={`${
          prov_id === `${id}`
            ? "bg-blue-900 bg-opacity-80  px-5 py-2 text-sm   rounded-full   text-white font-semibold "
            : " bg-gray-400 bg-opacity-80  px-5 py-2 text-sm   rounded-full   text-white font-semibold "
        }`}
      >
        {nama}
      </button>
    </Link>
  );
}
