/* eslint-disable react-hooks/exhaustive-deps */
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getApi } from "../../api/restApi";
import { changeState } from "../../../redux/actions";

export default function MenuProvinsi({ type, show, handleFilters }) {
  const [menu1, setMenu1] = useState(show);
  const [load, setLoad] = useState(true);
  const [provinsi, setProvinsi] = useState([]);
  const [provinsiId, setProvinsiId] = useState([]);
  const state = useSelector((state) => state.data);
  const [kotaId, setKotaId] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      changeState({
        sort: state.sort,
        provinsi_id: provinsiId,
        kota_id: kotaId,
        subsektor_id: state.subsektor_id,
      })
    );
  }, [provinsiId.length, kotaId.length]);

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
      <div className="flex flex-col space-y-2">
        <div className={"cursor-pointer flex items-center space-x-1"}>
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
        {!load ? (
          provinsi.map((i, key) => (
            <Provinsi
              setSubsectorId={setProvinsiId}
              setKotaId={setKotaId}
              menu={menu1}
              data={i}
              key={key}
              handleFilters={handleFilters}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      {/* Filter 1 */}
    </>
  );
}

function Provinsi({
  data,
  menu,
  setSubsectorId: setProvinsiId,
  setKotaId,
  setImages,
}) {
  const [menu2, setMenu2] = useState(false);
  const [kota, setKota] = useState([]);
  const [load, setLoad] = useState(true);
  const getKota = async () => {
    try {
      await getApi(`master/kota?ProvinsiID=${data.Id}`).then((val) => {
        setKota(val.data.data);
        setLoad(false);
      });
    } catch (er) {
      console.log(er);
      setLoad(false);
    }
  };
  useEffect(() => {
    getKota();
  }, []);

  return (
    <>
      <div
        className={`${menu ? "flex" : "hidden"} flex-col space-y-2 space-x-3 `}
      >
        <div className={"cursor-pointer flex items-center space-x-1"}>
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setProvinsiId((val) => [...val, data.Id]);

                setMenu2(true);
              } else {
                setProvinsiId((prevState) =>
                  prevState.filter((prevItem) => prevItem !== data.Id)
                );

                setMenu2(false);
              }
            }}
            defaultChecked={false}
            required
            className={`form-check-input appearance-none h-4 w-4 lg:h-3.5 lg:w-3.5 border border-gray-300 rounded-sm bg-white checked:bg-gray-600 checked:border-black focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer mr-3`}
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
        {!load ? (
          kota.map((i, key) => (
            <Kota key={key} data={i} menu2={menu2} setKotaId={setKotaId} />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

function Kota({ data, menu2: kota, setKotaId }) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (!kota) {
      setChecked(false);
      setKotaId((prevState) =>
        prevState.filter((prevItem) => prevItem !== data.Id)
      );
    }
  }, [kota]);
  return (
    <>
      <div className={` flex-col space-y-2 pl-3 ${kota ? "flex" : "hidden"}`}>
        <div className={"cursor-pointer flex items-center space-x-1"}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              if (e.target.checked) {
                setChecked(true)
                setKotaId((val) => [...val, data.Id]);
              } else {
                setChecked(false)
                setKotaId((prevState) =>
                  prevState.filter((prevItem) => prevItem !== data.Id)
                );
              }
            }}
            required
            className={`form-check-input appearance-none h-4 w-4 lg:h-3.5 lg:w-3.5 border border-gray-300 rounded-sm bg-white checked:bg-gray-600 checked:border-black focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer mr-3`}
          />
          <div className="inline-flex items-center justify-between w-full">
            <p>{data.NamaKota}</p>
          </div>
        </div>
      </div>
    </>
  );
}
