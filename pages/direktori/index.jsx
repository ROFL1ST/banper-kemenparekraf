/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import MenuProvinsi from "./menu/menuProvinsi";
import MenuSubsector from "./menu/menuSubsector";
import { Listbox, Transition } from "@headlessui/react";
import { getApi } from "../api/restApi";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import empty from "../assets/Empty-amico.png";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Feedback from "../components/feedback";

export default function Direktori() {
  const state = useSelector((state) => state.data);
  const pilihan = [
    {
      id: 1,
      name: "Sortir A-Z",
    },
    { id: 2, name: "Sortir Z-A" },
  ];

  const berdasarkan = [
    {
      id: 1,
      name: "Terbanyak",
    },
    { id: 2, name: "Paling sedikit" },
  ];
  const [selectedChoice, setSelectedChoice] = React.useState(pilihan[0]);
  const [selectedChoice2, setSelectedChoice2] = React.useState(berdasarkan[0]);

  React.useEffect(() => {
    document.title = "Direktori";
  });
  const [sort, setSort] = React.useState(false);

  const [list, setList] = React.useState([]);
  const [load, setLoad] = React.useState(true);
  const [limit, setLimit] = React.useState(12);
  const getData = async (
    subsektor_id = state.subsektor_id?.toString(),
    provinsi_id = state.provinsi_id,
    kota_id = state.kota_id
  ) => {
    try {
      await getApi(
        `pengusul?limit=${limit}&${
          subsektor_id !== undefined && `subsektorId=${subsektor_id}`
        }&sort=${sort}&${
          provinsi_id !== undefined && `ProvinsiID=${provinsi_id}`
        }&${
          kota_id !== undefined && `kotaId=${kota_id}`
        } &orderBy=order by u.NamaKomunitas ${
          selectedChoice.name === "Sortir A-Z" ? "asc" : "desc"
        }, Trcount ${selectedChoice2.name == "Terbanyak" ? "asc" : "desc"}`
      ).then((result) => {
        setList(result.data.data);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, [
    state?.subsektor_id?.length,
    state?.kota_id?.length,
    state?.provinsi_id?.length,
    selectedChoice,
    selectedChoice2,
  ]);

  //

  return (
    <>
      <Navbar />
      <div id="scrollableDiv">
        <div className="fixed w-full mt-[104px] flex items-center justify-between bg-white lg:px-40 py-[19px] px-5 z-10">
          <div
            onClick={() => {
              setSort(true);
            }}
            className="flex border border-gray-400 rounded-xl px-5 py-3 gap-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            <p className="text-md text-gray-400">Filter</p>
          </div>
          <div>
            <div className="flex gap-x-2">
              {" "}
              <Listbox value={selectedChoice} onChange={setSelectedChoice}>
                <div className="relative mt-1">
                  <Listbox.Button className="bg-blue-900 py-2 pl-5 pr-10 rounded-md text-white font-semibold w-full flex justify-between items-center">
                    <span className="block truncate">
                      {selectedChoice.name ?? "Urutkan Berdasarkan"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-blue-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-white">
                      {pilihan.map((pilihan, id) => (
                        <Listbox.Option
                          key={id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-6 pr-4 ${
                              active
                                ? "bg-blue-100 text-blue-900"
                                : "text-white "
                            }`
                          }
                          value={pilihan}
                        >
                          {({ selectedChoice }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selectedChoice ? "font-medium" : "font-normal"
                                }`}
                              >
                                {pilihan.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <Listbox value={selectedChoice2} onChange={setSelectedChoice2}>
                <div className="relative mt-1">
                  <Listbox.Button className="bg-blue-900 py-2 pl-5 pr-10 rounded-md text-white font-semibold w-full flex justify-between items-center">
                    <span className="block truncate">
                      {selectedChoice2.name ?? "Urutkan Berdasarkan"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-blue-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-white">
                      {berdasarkan.map((berdasarkan, id) => (
                        <Listbox.Option
                          key={id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-6 pr-4 ${
                              active
                                ? "bg-blue-100 text-blue-900"
                                : "text-white "
                            }`
                          }
                          value={berdasarkan}
                        >
                          {({ selectedChoice }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selectedChoice ? "font-medium" : "font-normal"
                                }`}
                              >
                                {berdasarkan.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
        <section className="text-gray-600 body-font">
          <div className=" px-10 lg:px-44 py-24 mx-auto h-full">
            <div className=" mt-40 overflow-x-auto ">
              {!load ? (
                list.length != 0 ? (
                  <>
                    <table className="table-auto w-full text-left whitespace-no-wrap ">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl text-center">
                            No
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Nama Komunitas
                          </th>

                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Subsektor
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Klasifikasi
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Email
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-center">
                            Jumlah Postingan
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-center">
                            Detail
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((i, key) => (
                          <Isi key={key} data={i} no={key} />
                        ))}
                      </tbody>
                    </table>
                    <p
                      className="flex justify-center underline text-blue-900 items-center mt-10 cursor-pointer"
                      onClick={() => {
                        getData(
                          state.subsektor_id?.toString(),
                          state.provinsi_id,
                          state.kota_id,
                          setLimit(limit + 12)
                        );
                        setLoad(true);
                      }}
                    >
                      More
                    </p>
                  </>
                ) : (
                  <>
                    <div className=" relative justify-center mx-auto lg:ml-32  items-center flex flex-col mt-10 pb-20">
                      <img
                        src={empty.src}
                        className="lg:h-96 h-72 w-auto"
                        alt=""
                      />
                      <p className="font-bold">Direktori Tidak Tersedia</p>
                    </div>
                  </>
                )
              ) : (
                <>
                  <div
                    role="status"
                    className="flex justify-center items-center p-60"
                  >
                    <svg
                      aria-hidden="true"
                      className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <Feedback />

      <Sidebar sort={sort} setSort={setSort} getData={getData} />
    </>
  );
}

function Isi({ data, no }) {
  return (
    <>
      <tr>
        <td className="px-4 py-3 text-sm lg:text-base text-center">{no + 1}</td>

        <td className="px-4 py-3 text-sm lg:text-base">
          {data.NamaKomunitas == null || data.NamaKomunitas == "undefined"
            ? "Tidak Ada Nama Komunitas"
            : data.NamaKomunitas}
        </td>

        <td className="px-4 py-3 text-sm lg:text-base">{data.Subsektor}</td>
        <td className="px-4 py-3 text-sm lg:text-base">
          {data.Klasifikasi == null
            ? "Tidak Ada Klasifikasi"
            : data.Klasifikasi}
        </td>

        <td className="px-4 py-3 text-sm lg:text-base">{data.Email}</td>
        <td className="px-4 py-3 text-sm lg:text-base text-center">
          {data.Trcount}
        </td>
        <td className="px-4 py-3 text-sm lg:text-base text-center">
          <Link href={`/direktori/Detail/${data.Email}`}>
            <button className="px-3 py-1 bg-blue-900 rounded-lg text-white">
              Detail
            </button>
          </Link>
        </td>
      </tr>
    </>
  );
}

function Sidebar({ setSort, sort, getData }) {
  return (
    <>
      <div>
        <Transition
          show={sort}
          as={React.Fragment}
          enter="transition-all ease-in duration-100"
          enterFrom="transform w-0 "
          enterTo="transform 2xl:w-1/4 xl:w-1/3 lg:w-1/2  w-full"
          leave="transition-all ease-out duration-75"
          leaveFrom="transform 2xl:w-1/4 xl:w-1/3 lg:w-1/2  w-full"
          leaveTo="transform w-0 px-0"
        >
          <div className="top-0 fixed  flex flex-col z-30 bg-black  bg-opacity-60 backdrop-blur-lg drop-shadow-lg 2xl:w-1/4 xl:w-1/3 lg:w-1/2 w-full h-full mt-[104px] px-10 py-10 pb-10 overflow-y-auto">
            {/* Top */}
            <div className="flex justify-between items-center mb-7">
              <div
                onClick={() => {
                  setSort(false);
                }}
                className="flex  px-5 py-3 gap-x-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
                <p className="text-lg text-white">Filter</p>
              </div>
              <div className="flex justify-center ">
                <div
                  onClick={() => {
                    setSort(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Top */}
            <div className="border-b-white border-b mb-7"></div>
            {/* Filter */}
            <div className="bg-[#f5f5fa] rounded-xl py-7 px-12  overflow-auto scrollbar h-3/4">
              <h2 className="font-semibold text-base tracking-widest text-gray-900 mb-10  text-center sm:text-left">
                Filter By
              </h2>
              <div className="flex flex-col gap-y-3 pb-20">
                <MenuProvinsi
                  type={"Provinsi"}
                  show={false}
                  handleFilters={(filters) => handleFilters(filters, "")}
                />
                <MenuSubsector
                  getData={getData}
                  type={"Subsector"}
                  show={true}
                />
              </div>
            </div>
            {/* Filter */}
          </div>
        </Transition>
      </div>
    </>
  );
}
