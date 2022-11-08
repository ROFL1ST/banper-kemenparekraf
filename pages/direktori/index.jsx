import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import MenuProvinsi from "./menu/menuProvinsi";
import MenuSubsector from "./menu/menuSubsector";
import { Transition } from "@headlessui/react";
import { getApi } from "../api/restApi";

export default function Direktori() {
  React.useEffect(() => {
    document.title = "Direktori";
  });
  const [sort, setSort] = React.useState(false);

  const [list, setList] = React.useState([]);
  const [load, setLoad] = React.useState(true);

  const getData = async () => {
    try {
      await getApi("pengusul").then((result) => {
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
  }, []);
  return (
    <>
      <Navbar />
      <div className="fixed w-full mt-[104px] flex items-center  bg-white lg:px-40 py-[19px] px-5 z-10">
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
      </div>
      <section className="text-gray-600 body-font">
        <div className=" px-10 lg:px-52 py-24 mx-auto h-full">
          <div className=" mt-40 overflow-x-auto ">
            <table className="table-auto w-full text-left whitespace-no-wrap ">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    No
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Nama Pengusul
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Komunitas
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Email
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br items-center mx-auto text-center pr-16">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {!load ? (
                  list.map((i, key) => <Isi key={key} data={i} no={key} />)
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
      <Sidebar sort={sort} setSort={setSort} />
    </>
  );
}

function Isi({ data, no }) {
  return (
    <>
      <tr>
        <td className="px-4 py-3">{no + 1}</td>
        <td className="px-4 py-3">
          {data.Nama == "undefined" ? "Tidak Ada Nama" : data.Nama}
        </td>
        <td className="px-4 py-3">{data.NamaKomunitas}</td>

        <td className="px-4 py-3">{data.Email}</td>
        <td className="border-t-2 border-b-2 border-gray-200 w-10 mx-auto">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center flex justify-center dark:bg-blue-600 dark:hover:bg-blue-700 "
          >
            Detail
          </button>
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
