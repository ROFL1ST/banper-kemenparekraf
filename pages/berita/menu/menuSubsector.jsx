import Router, { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, FreeMode } from "swiper";
import { getApi } from "../../api/restApi";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

export default function MenuSubsector({ getData, setLoading }) {
  const [subsector, setSubsector] = useState([]);
  const [load, setLoad] = useState(true);
  const loadingLength = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3];

  const getSubsector = async () => {
    try {
      await getApi("master/subsektor").then((val) => {
        setSubsector(val.data.data);
        setLoad(false);
      });
    } catch (er) {
      console.log(er);
      setLoad(false);
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
          {!load ? (
            subsector?.map((i, key) => (
              <SwiperSlide className=" menu" key={key}>
                <Button
                  nama={i.Nama}
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
  const { sort, type, sub_id } = query;
  const { pathname } = useRouter();
  // console.log(sub_id)

  return (
    <Link href={`/berita?type=${type}&sort=terbaru&sub_id=${id}`}>
      <button
        onClick={() => {
          // Router.push(`/berita?type=${type}&sort=${sort}&sub_id=${id}`);
          getData("terbaru", `${id}`);
          // setLoading(true);
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
