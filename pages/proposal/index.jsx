import Link from "next/link";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useEffect, useState, useRef, Fragment } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Section from "../components/section";
import Router, { useRouter } from "next/router";
import { getApi, getDelete, getPropose } from "../api/restApi";
import { Dialog, Transition } from "@headlessui/react";

export default function Proposal() {
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleSearch = (e) => setSearch(e.target.value);

  //
  const [open, setOpen] = useState(false);
  const [token, setToken] = React.useState("");

  useEffect(() => {
    document.title = "Proposal";
  });

  // getList
  const [list, setList] = React.useState([]);
  const [load, setLoad] = React.useState(true);
  const getList = async (auth) => {
    try {
      await getPropose("proposal?offset=0&limit=10", auth).then((result) => {
        console.log(result.data.message);
        if (result.data.message == "Failed") {
          if (result.data.display_message == "Proposal tidak di temukan") {
            return;
          } else {
            alert("Token is not valid");
            Router.push("/home");
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
          }
        } else {
          setList(result.data.data);
        }
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setToken(localStorage.getItem("token"));
      getList(localStorage.getItem("token"));
    } else {
      setToken(sessionStorage.getItem("token"));
      getList(sessionStorage.getItem("token"));
    }
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      // alert("You need to Log In first!")

      return;
    } else {
      Router.push("/home");
    }
  }, [token]);

  // Search
  useEffect(() => {
    const result = list.filter((list) => list.Judul.includes(search));
    setSearchResults(result);
  },[search]);

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <div
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2017/05/19/06/22/desk-2325627_960_720.jpg)",
        }}
        className="bg-gray-200 w-full h-screen  bg-cover rounded-b-3xl"
      >
        <div className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9  rounded-b-3xl">
          <Section text={"List Proposal"}></Section>
          {/* Top */}
          <div className="mt-20 md:w-3/4 mx-auto">
            <div className="md:justify-between flex md:flex-row flex-col gap-y-10 pb-5  md:items-center">
              <div>
                <Link href={"/proposal/submit-proposal"}>
                  <button className="bg-blue-900 py-2 px-5 rounded-md text-white font-semibold w-full">
                    Buat Proposal Baru
                  </button>
                </Link>
              </div>
              <div className="flex md:flex-row flex-col md:items-center items-start gap-x-3">
                <p>Search</p>
                <input
                  type="Search"
                  value={search}
                  onChange={handleSearch}
                  className="border px-3 py-3 outline-none rounded-md placeholder:text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              {list.length == 0 ? (
                <>
                  <p className="flex justify-center py-20">Tidak Ada Data</p>
                </>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="capitalize font-bold text-blue-900">
                        no
                      </TableCell>
                      <TableCell className="capitalize font-bold text-blue-900">
                        judul
                      </TableCell>
                      <TableCell className="capitalize font-bold text-blue-900">
                        jenis bantuan
                      </TableCell>
                      <TableCell className="capitalize font-bold text-blue-900">
                        status
                      </TableCell>
                      <TableCell className="capitalize font-bold text-blue-900">
                        actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!load ? (
                      <>
                        {!search ? (
                          <>
                            <TableRow>
                              {list?.map((i, key) => (
                                <>
                                  <ListPropose
                                    data={i}
                                    key={key}
                                    getList={getList}
                                  />
                                </>
                              ))}
                            </TableRow>
                          </>
                        ) : searchResults.length != 0 ? (
                          <>
                            <TableRow>
                              {searchResults.map((i, key) => (
                                <ListPropose
                                  data={i}
                                  key={key}
                                  getList={getList}
                                />
                              ))}
                            </TableRow>
                          </>
                        ) : (
                          <>
                            <TableRow className="flex justify-center ">
                              <p>Hasil Tidak Ada</p>
                            </TableRow>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
          {/* Top */}
        </div>
      </div>
      <Footer />
    </>
  );
}

function ListPropose(data, getList) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  console.log(data);
  const [jenis, setJenis] = useState([]);
  const [load, setLoad] = useState(true);
  async function detail() {
    try {
      await getApi(`master/jenis_bantuan`).then((result) => {
        setJenis(result.data.data);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  }
  useEffect(() => {
    detail();
  }, []);

  // Delete
  async function deletePropose(id, auth) {
    try {
      await getDelete(`proposal/${id}`, auth).then((result) => {
        console.log(result);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <TableCell>{data.data.Id}</TableCell>
      <TableCell>{data.data.Judul}</TableCell>
      <TableCell>
        {!load ? (
          jenis
            .filter((jenis) => jenis.Id === data.data.JenisBantuanID)
            .map((jenis) => jenis.Nama)
        ) : (
          <></>
        )}
      </TableCell>
      <TableCell>Belum Lengkap</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Link href={"/proposal/submit-document"}>
            <div className="cursor-pointer bg-blue-200 flex justify-center py-2 rounded-md px-5">
              <p className="text-blue-900">Submit Dokumen</p>
            </div>
          </Link>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-red-600 text-white rounded-md px-5 py-1.5"
          >
            Delete
          </button>
        </div>
      </TableCell>
      <DeletePop
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        deletePropose={deletePropose}
        title={data.data.Judul}
        id={data.data.Id}
        getList={getList}
      ></DeletePop>
    </>
  );
}

function DeletePop({
  open,
  setOpen,
  cancelButtonRef,
  deletePropose,
  title,
  id,
  getList,
}) {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative bg-white rounded-[30px] text-center overflow-hidden shadow-xl transform transition-all sm:my-8  xl:w-1/5 lg:w-1/4 md:w-2/5 sm:w-1/2 w-3/4  p-3">
                  <div className="bg-white px-4 lg:px-1  pt-5 pb-4 ">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-lg md:text-xl leading-6 pb-3 font-bold text-gray-900"
                      >
                        Yakin Mau Hapus proposal {title}?
                      </Dialog.Title>
                    </div>
                  </div>

                  <div className="bg-gray-50 gap-x-10 px-4 py-5 lg:px-2 lg:py-3 sm:px-6 sm:flex justify-center ">
                    <button
                      type="button"
                      className="close w-full inline-flex justify-center rounded-[30px] border border-gray-300 shadow-sm px-7 lg:px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto lg:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => {
                        if (localStorage.getItem("token") != null) {
                          deletePropose(id, localStorage.getItem("token"));
                          getList(localStorage.getItem("token"));
                        } else if (sessionStorage.getItem("token") != null) {
                          deletePropose(id, sessionStorage.getItem("token"));
                          getList(sessionStorage.getItem("token"));
                        } else {
                          alert("You're not real");
                        }
                        setOpen(false);
                        setShow(true);
                        setTimeout(() => {
                          setShow(false);
                        }, 10000);
                      }}
                      type="submit"
                      className="close mt-3 sm:mt-0 md:mt-0 lg:mt-0 22xl:mt-0 2xl:mt-0 w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-7 lg:px-6 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto lg:text-sm"
                    >
                      Accept
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Result show={show} setShow={setShow} cancelButtonRef={cancelButtonRef} />
    </>
  );
}

function Result({ show, setShow, cancelButtonRef }) {
  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setShow}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative bg-white rounded-[30px] text-center overflow-hidden shadow-xl transform transition-all sm:my-8  xl:w-1/5 lg:w-1/4 md:w-2/5 sm:w-1/2 w-3/4  p-3">
                  <div className="bg-white px-4 lg:px-1   ">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-lg md:text-base leading-6  font-bold text-gray-900 flex items-center gap-x-5"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                        Berhasil
                      </Dialog.Title>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
