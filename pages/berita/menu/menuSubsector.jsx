import { Link } from "@mui/material";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
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
      <div className="flex justify-center space-x-5 mt-9 overflow-x-auto items-center ml-5 scrollbar">
        {subsector?.map((i, key) => (
          <Button nama={i.Nama} key={key} />
        ))}
      </div>
    </>
  );
}

function Button({ nama, id }) {
  return (
    <button
      className={`bg-blue-900 bg-opacity-80 py-1.5 text-sm w-full  rounded-full   text-white font-semibold `}
    >
      {nama}
    </button>
  );
}
