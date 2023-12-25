/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Fab,
  Snackbar,
} from "@mui/material";
import React, {
  useEffect,
  useState,
  useRef,
  Fragment,
  forwardRef,
} from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Section from "../components/section";
import Router, { useRouter } from "next/router";
import { getApi, getDelete, getPropose } from "../api/restApi";
import { Dialog, Transition } from "@headlessui/react";
import logo from "../assets/Empty-amico.png";
import { Listbox } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import Loading from "../components/Loading";
import MuiAlert from "@mui/material/Alert";
import Feedback from "../components/feedback";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Proposal() {
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
        setLoad(false);
        if (result.data.message == "Failed") {
          if (result.data.display_message == "Proposal tidak di temukan") {
            setList(result.data.data);
            return;
          } else {
            setLog(true);
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            Router.push("/home");
          }
        } else {
          setList(result.data.data);
        }
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  // user

  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getUser = async (auth) => {
    try {
      await getPropose("user", auth).then((result) => {
        setLoading(false);

        if (
          result.data.data[0].Nama != null ||
          result.data.data[0].NamaKomunitas != null ||
          result.data.data[0].Subsektor != null ||
          result.data.data[0].PhoneNumber != null
        ) {
          setError(false);
        } else {
          setError(true);

          setTimeout(() => {
            Router.push("/editProfile");
          }, 3000);
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    count > 0 && setTimeout(() => setCount(count - 1), 1000);
  }, [count]);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setToken(localStorage.getItem("token"));
      getList(localStorage.getItem("token"));
      getUser(localStorage.getItem("token"));
    } else {
      setToken(sessionStorage.getItem("token"));
      getList(sessionStorage.getItem("token"));
      getUser(sessionStorage.getItem("token"));
    }
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      // alert("You need to Log In first!")

      return;
    } else {
      Router.push("/home");
    }
  }, [token]);

  // Search

  // check
  const [log, setLog] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  // submit Berita dan gallery

  const pilihan = [
    {
      id: 1,
      name: "Tambah Berita",
      url: "https://form.kemenparekraf.go.id/penambahan-berita-untuk-banper-kemenparekraf-go-id",
    },
    {
      id: 2,
      name: "Tambah Galeri",
      url: "https://form.kemenparekraf.go.id/penambahan-foto-dan-video-untuk-banper-kemenparekraf-go-id",
    },
  ];

  const [selectedChoice, setSelectedChoice] = React.useState(pilihan[0]);

  const [propose, setPropose] = React.useState(false);
  const [memuat, setMemuat] = React.useState(true);
  const getCondition = async () => {
    try {
      await getApi("master/usulan").then((result) => {
        console.log(result.data.data[0]);
        setMemuat(false);
        if (result.data.data[0].isUsulan == 1) {
          setPropose(true);
        } else {
          setPropose(false);
        }
      });
    } catch (error) {
      console.log(error);
      setMemuat(false);
    }
  };

  React.useEffect(() => {
    getCondition();
  }, []);
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <div
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2017/05/19/06/22/desk-2325627_960_720.jpg)",
        }}
        className="bg-gray-200 w-full lg:h-screen h-full  bg-cover rounded-b-3xl"
      >
        <div className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9 lg:mb-44  rounded-b-3xl">
          <Section text={"Beranda"}></Section>
          {/* Top */}
          <div className="mt-20 md:w-3/4 mx-auto">
            <div className="gap-x-10 justify-between flex md:flex-row flex-col gap-y-10 pb-5  md:items-center">
              <div>
                <button
                  onClick={() => {
                    if (propose == true) {
                      Router.push("/proposal/submit-proposal");
                    }
                  }}
                  disabled={propose == true ? false : true}
                  className={`bg-blue-900 py-2 px-5 rounded-md text-white font-semibold w-full ${propose == true ? "" : "opacity-70 cursor-not-allowed"}`}
                >
                  Buat Proposal Baru
                </button>
              </div>
              <div>
                <Listbox value={selectedChoice} onChange={setSelectedChoice}>
                  <div className="relative mt-1">
                    <Listbox.Button className="bg-blue-900 py-2 pl-5 pr-10 rounded-md text-white font-semibold w-full flex justify-between items-center">
                      <span className="block truncate">Tambah Konten</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
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
                                  onClick={() => {
                                    window.open(pilihan.url);
                                  }}
                                  className={`block truncate cursor-pointer ${
                                    selectedChoice
                                      ? "font-medium"
                                      : "font-normal"
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
              </div>
            </div>
            <div className="overflow-x-auto">
              {!load ? (
                list.length == 0 ? (
                  <>
                    <div className=" mx-auto items-center flex flex-col mt-10 pb-20">
                      <img src={logo.src} className="h-96 w-auto" alt="" />
                      <p className="font-bold">Tidak ada proposal</p>
                    </div>
                  </>
                ) : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <p className="capitalize font-bold text-blue-900">
                            no
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="capitalize font-bold text-blue-900">
                            judul
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="capitalize font-bold text-blue-900">
                            jenis bantuan
                          </p>
                        </TableCell>
                        <TableCell className="capitalize font-bold text-blue-900">
                          <p className="capitalize font-bold text-blue-900">
                            status
                          </p>
                        </TableCell>
                        <TableCell className="capitalize font-bold text-blue-900">
                          <p className="capitalize font-bold text-blue-900">
                            actions
                          </p>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {list?.map((i, key) => (
                        <ListPropose getList={getList} data={i} key={key} />
                      ))}
                    </TableBody>
                  </Table>
                )
              ) : (
                <>
                  <div className="spinner-container flex justify-center">
                    <div className="loading-spinner text-red-400"></div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Top */}
        </div>
      </div>
      <Footer />
      <Feedback />

      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{ width: "100%", fontSize: "large" }}
        >
          Profile Anda Belum Lengkap, Anda Akan Di Alihkan ke Halaman Edit
          Profile dalam {count} Untuk Mengisi Profile Anda.
        </Alert>
      </Snackbar>
    </>
  );
}

function ListPropose(data) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const [load, setLoad] = useState(true);

  const [jenis, setJenis] = useState([]);
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
  const [show, setShow] = React.useState(false);
  async function deletePropose(id, auth) {
    return new Promise(async (resolve, reject) => {
      try {
        await getDelete(`proposal/${id}`, auth).then((result) => {
          setShow(true);
          resolve(result);
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  // detail
  // getList

  const [doc, setDoc] = React.useState([]);
  const [percent, setPercent] = React.useState("0");
  const [have, setHave] = React.useState(0);
  const [all, setAll] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [periodes, setPeriodes] = React.useState(false);
  const getPeriodes = async () => {
    try {
      await getApi("periodes").then((result) => {
        console.log('periodes', result.data);
        if (result.data.message == 'Success') {
          setPeriodes(true);
        } else {
          setPeriodes(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  async function Status(token) {
    try {
      await getPropose(
        `proposal/detail?UsulanHeaderID=${data.data.Id}`,
        token
      ).then((result) => {
        setDoc(result.data.data.get_usulan_detail);
        setLoad(false);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      Status(localStorage.getItem("token"));
    } else {
      Status(sessionStorage.getItem("token"));
    }
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      // alert("You need to Log In first!")
      return;
    } else {
      Router.push("/home");
    }
  }, [data]);

  useEffect(() => {
    const have = doc
      .filter((doc) => doc.FileName != "")
      .map((doc) => doc.length);
    const all = doc.length;
    setPercent((have.length / all) * 100);
    setHave(have.length);
    setAll(all);
    getPeriodes();
  }, [doc]);
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
          <>
            <div className="space-y-2 animate-pulse  p-5 w-3/4">
              <div className="text-xs font-bold h-4 w-3/4 bg-gray-300 rounded-full"></div>
            </div>
          </>
        )}
      </TableCell>
      <TableCell>
        <p
          className={`font-bold ${
            percent != 100
              ? "text-red-500"
              : data.data.Status == 7
              ? "text-gray-600"
              : data.data.Status == 1
              ? "text-yellow-500"
              : data.data.Status == 2
              ? "text-green-700"
              : "text-red-500"
          }`}
        >
          {!loading ? (
            percent != 100 ? (
              "Belum Lengkap"
            ) : data.data.Status == 7 ? (
              "Dokumen Lengkap"
            ) : data.data.Status == 1 ? (
              "Sedang Di Verifikasi"
            ) : data.data.Status == 2 ? (
              "Proposal Diterima"
            ) : (
              "Proposal Ditolak"
            )
          ) : (
            <>
              <div className="space-y-2 animate-pulse  p-5 w-3/4">
                <div className="text-xs font-bold h-4 w-3/4 bg-gray-300 rounded-full"></div>
              </div>
            </>
          )}
        </p>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Link href={`/proposal/submit-document/${data.data.Id}`} disabled={periodes == true ? false : true}>
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
        getList={data.getList}
        setShow={setShow}
        show={show}
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
  show,
  setShow,
}) {
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
                  <div className={`${show ? "hidden" : "flex"} flex-col`}>
                    <div className="bg-white px-4 lg:px-1  pt-5 pb-4 ">
                      <div className="mt-3 text-center sm:mt-0  sm:text-center">
                        <h3 className="text-lg md:text-xl leading-6 pb-3 font-bold text-gray-900">
                          Yakin Mau Hapus proposal {title}?
                        </h3>
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
                        onClick={ async () => {
                          if (localStorage.getItem("token") != null) {
                            await deletePropose(id, localStorage.getItem("token"));
                            getList(localStorage.getItem("token"));
                          } else if (sessionStorage.getItem("token") != null) {
                            await deletePropose(id, sessionStorage.getItem("token"));
                            getList(sessionStorage.getItem("token"));
                          } else {
                            alert("You're not real");
                          }
                          setOpen(false);
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
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

          {/* result */}
          <div className={``}>
            <div className="bg-white px-4 lg:px-1   ">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                <h3 className="text-lg md:text-base leading-6  font-bold text-gray-900 flex items-center gap-x-5">
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
                </h3>
              </div>
            </div>
          </div>
          {/* result */}
        </Dialog>
      </Transition.Root>
    </>
  );
}
