import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useEffect, useState, Fragment } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";

import { getApi } from "../../../../api/restApi";

export default function MenuSubsector({ type, show, getData }) {
  const [menu1, setMenu1] = useState(show);
  // getData
  const [subsector, setSubsector] = useState([]);
  const [load, setLoad] = useState(true);
  const subsektorId = [];

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
      {/* Filter 1 */}
      <div className="flex flex-col space-y-2 ">
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
          subsector.map((i, key) => (
            <Subsektor
              subsektorId={subsektorId}
              getData={getData}
              menu={menu1}
              data={i}
              key={key}
              subsector={subsector}
              load={load}
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

function Subsektor({ data, menu, subsector, load, getData, subsektorId }) {
  const [menu2, setMenu2] = useState(false);
  const state = useSelector((state) => state.data);
  const dispatch = useDispatch();

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
        <div className="flex flex-col space-y-2 space-x-3">
          <div className={"cursor-pointer flex items-center space-x-1"}>
            <input
              type="checkbox"
              id=""
              name=""
              defaultChecked={false}
              required
              className={`form-check-input appearance-none h-4 w-4 lg:h-3.5 lg:w-3.5 border border-gray-300 rounded-sm bg-white checked:bg-gray-600 checked:border-black focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer mr-3`}
            />
            <div
              className="inline-flex items-center justify-between w-full"
              onClick={() => setMenu2(!menu2)}
            >
              <p>{data.Nama}</p>
              {!load ? (
                subsector
                  .filter((subsector) => subsector.parentId == data.Id)
                  .map((i, key) =>
                    menu2 ? (
                      <ChevronUpIcon
                        className="ml-2 -mr-1 h-5 w-5 "
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 "
                        aria-hidden="true"
                      />
                    )
                  )
              ) : (
                <></>
              )}
            </div>
          </div>
          {!load ? (
            subsector
              .filter((subsector) => subsector.parentId == data.Id)
              .map((i, key) => (
                <SubSubsektor menu2={menu2} data={i} key={key} />
              ))
          ) : (
            <></>
          )}
        </div>
      </Transition>
    </>
  );
}

function SubSubsektor({ data, menu2 }) {
  // const [menu3, setMenu3] = useState(false);

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
              type="checkbox"
              id=""
              name=""
              defaultChecked={false}
              required
              className={`form-check-input appearance-none h-4 w-4 lg:h-3.5 lg:w-3.5 border border-gray-300 rounded-sm bg-white checked:bg-gray-600 checked:border-black focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer mr-3`}
            />
            <div className="inline-flex items-center justify-between w-full">
              <p>{data.Nama}</p>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}
