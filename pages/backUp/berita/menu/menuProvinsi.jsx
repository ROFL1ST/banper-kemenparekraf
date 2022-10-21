import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getApi } from "../../api/restApi";
import { useEffect, useRef, useState, Fragment } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../../../redux/actions";

export default function MenuProvinsi({ type, show, handleFilters, getData }) {
  const [menu1, setMenu1] = useState(show);
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
            <Filter2
              getData={getData}
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

function Filter2({ data, menu, getData }) {
  const [menu2, setMenu2] = useState(false);

  // kota
  // getData
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

  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  // const handleChange = (value) => {
  //   const currentIndex = check.indexOf(value);
  //   const newChecked = [...check];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setCheck(newChecked);
  //   handleFilters(newChecked);
  // };
  const state = useSelector((state) => state.data);
  const handleChange = (e) => {
    setCheck(!check);
    setMenu2(!menu2);
    dispatch(
      changeState({
        sort: state.sort,
        subsektor_id: state.subsektor_id,
        provinsi_id: e.target.id,
        kota_id: state.kota_id,
      })
    );
    getData(state.sort, state.subsektor_id, state.provinsi_id, state.kota_id);
  };
  return (
    <>
      <Transition
        show={menu}
        as={Fragment}
        enter="transition-all ease-in duration-100"
        enterFrom="transform opacity-0 scale-95 translate-y-1"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95 -translate-y-1"
      >
        <div className="flex flex-col space-y-2 space-x-3 ">
          <div className={"cursor-pointer flex items-center space-x-1"}>
            <input
              type="radio"
              id={data.Id}
              name="provinsi"
              value={check}
              onChange={handleChange}
              className={`form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`}
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
              <Filter3 getData={getData} key={key} data={i} menu2={menu2} />
            ))
          ) : (
            <></>
          )}
        </div>
      </Transition>
    </>
  );
}

function Filter3({ data, menu2, getData }) {
  const state = useSelector((state) => state.data);
  const dispatch = useDispatch();
  return (
    <>
      <Transition
        show={menu2}
        as={Fragment}
        enter="transition-all ease-in duration-100"
        enterFrom="transform opacity-0 scale-95 translate-y-1"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95 -translate-y-1"
      >
        <div className="flex flex-col space-y-2 pl-3 ">
          <div className={"cursor-pointer flex items-center space-x-1"}>
            <input
              type="radio"
              id={data.Id}
              name="kota"
              onChange={() => {
                dispatch(
                  changeState({
                    sort: state.sort,
                    subsektor_id: state.subsektor_id,
                    provinsi_id: state.provinsi_id,
                    kota_id: data.Id,
                  })
                );
                getData(
                  state.sort,
                  state.subsektor_id,
                  state.provinsi_id,
                  state.kota_id
                );
              }}
              defaultChecked={false}
              required
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <div className="inline-flex items-center justify-between w-full">
              <p>{data.NamaKota}</p>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}
