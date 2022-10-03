import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getApi } from "../../api/restApi";
import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function MenuProvinsi({ type }) {
  const [menu1, setMenu1] = useState(false);
  const [load, setLoad] = useState(true);
  const [provinsi, setProvinsi] = useState([]);

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
  return (
    <>
      {/* Filter 1 */}
      <div className="flex flex-col space-y-2 space-x-7">
        <div className={"cursor-pointer flex items-center space-x-1"}>
          <input
            type="checkbox"
            id=""
            name=""
            defaultChecked={false}
            required
            className="form-check-input rounded-sm appearance-none h-4.5 w-4.5 lg:h-3.5 lg:w-3.5 border border-gray-300 bg-white checked:bg-gray-600 checked:border-black focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer mr-3"
          />
          <div
            className="inline-flex items-center justify-between w-full"
            onClick={() => setMenu1(!menu1)}
          >
            <p>{type}</p>
            {menu1 ? (
              <ChevronUpIcon
                className="ml-2 -mr-1 h-5 w-5 "
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 "
                aria-hidden="true"
              />
            )}
          </div>
        </div>
        {menu1 ? (
          <>
            {!load ? (
              provinsi.map((i, key) => <Filter2 data={i} key={key} />)
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Filter 1 */}
    </>
  );
}

function Filter2({data}) {
  const [menu2, setMenu2] = useState(false);

  return (
    <>
      <div className="flex flex-col space-y-2 space-x-3">
        <div className={"cursor-pointer flex items-center space-x-1"}>
          <input
            type="checkbox"
            id=""
            name=""
            defaultChecked={false}
            required
            className="form-check-input appearance-none h-4.5 w-4.5 lg:h-3.5 lg:w-3.5 border border-gray-300 rounded-sm bg-white checked:bg-gray-600 checked:border-black focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer mr-3"
          />
          <div
            className="inline-flex items-center justify-between w-full"
            onClick={() => setMenu2(!menu2)}
          >
            <p>{data.NamaProvinsi}</p>
            {menu2 ? (
              <ChevronUpIcon
                className="ml-2 -mr-1 h-5 w-5 "
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 "
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}