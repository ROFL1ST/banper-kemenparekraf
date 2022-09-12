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
      <nav className="mt-9 px-20 bg-red-200 flex">
        {subsector?.map((i, key) => (
          <Button nama={i.Nama} key={key} />
        ))}
      </nav>
    </>
  );
}

function Button({ nama, id }) {
  return (
    <button
      className={`bg-blue-900 rounded-full px-3 text-white font-semibold `}
    >
      {nama}
    </button>
  );
}
