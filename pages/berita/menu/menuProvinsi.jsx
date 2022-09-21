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
  const [load, setLoad] = useState(true);
  const loadingLength = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3];
  const getProvinsi = async () => {
    try {
      await getApi("master/provinsi").then((val) => {
        setProvinsi(val.data.data);
        setLoad(false);
      });
    } catch (er) {
      console.log(er);
      setLoad(false);
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
          {!load ? (
            provinsi?.map((i, key) => (
              <SwiperSlide className=" menu" key={key}>
                <Button
                  nama={i.NamaProvinsi}
                  id={i.Id}
                  getData={getData}
                  setLoading={setLoading}
                />
              </SwiperSlide>
            ))
          ) : (
            <>
              <div className=" space-x-5">
                {loadingLength.map((i, key) => (
                  <SwiperSlide key={key} className="animate-pulse menu">
                    <ButtonLoading />
                  </SwiperSlide>
                ))}
              </div>
            </>
          )}
        </Swiper>
      </div>
    </>
  );
}

function Button({ nama, id, getData, setLoading }) {
  const { query } = useRouter();
  const { sort, type, sub_id, prov_id } = query;
  const { pathname } = useRouter();

  return (
    <Link href={`/berita?type=${type}&sort=terbaru&prov_id=${id}`}>
      <button
        onClick={() => {
          setLoading(true);
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

function ButtonLoading({}) {
  // console.log(sub_id)

  return (
    <button
      className={`
       ${"bg-blue-900 bg-opacity-80 py-4 rounded-full px-16 text-white font-semibold"}`}
    ></button>
  );
}
