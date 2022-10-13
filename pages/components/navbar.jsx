/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import logo from "../assets/banper.png";
import React from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import Router, { useRouter } from "next/router";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { getDown } from "../api/restApi";

export default function Navbar({ click }) {
  const [open, setOpen] = React.useState(false);
  const juknisUrl =
    "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf";
  const templateUrl =
    "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip";
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [menu1, setMenu1] = React.useState(false);
  const [menu2, setMenu2] = React.useState(false);

  const { pathname } = useRouter();
  const [token, setToken] = React.useState();
  React.useEffect(() => {
    // Perform localStorage action
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      return;
    }
  }, [token]);
  // console.log(token);
  const [log, setLog] = React.useState(false);
  const cancelButtonRef = React.useRef(null);

  return (
    <>
      {/* Dekstop */}
      <div className="fixed w-screen z-40">
        <div className="bg-[#142b51] h-6"></div>
        <div className="bg-blue-400 w-full h-20 bg-opacity-20 backdrop-blur-lg drop-shadow-lg flex items-center justify-between px-4 lg:px-16">
          <Link href={"/home"}>
            <img src={logo.src} alt={"logo"} className="h-36" />
          </Link>
          <button onClick={() => setNavbarOpen(!navbarOpen)}>
            <Bars3Icon className="h-6 w-6 xl:hidden lg:hidden " />
          </button>
          <nav className="xl:flex lg:flex md:hidden hidden space-x-7 text-black items-center">
            <Link href={"/home"}>
              <p
                className={`hover:text-gray-900 text-sm outline-2 cursor-pointer ${
                  pathname === "/home" &&
                  "bg-white px-5 py-1 rounded-full text-blue-900 font-bold"
                } `}
              >
                Home
              </p>
            </Link>
            <div className="cursor-pointer flex items-center space-x-1">
              <DropdownMekanis
                juknisUrl={juknisUrl}
                templateUrl={templateUrl}
                pathname={pathname}
              />
            </div>
            <Link href={"/berita"}>
              <p
                className={`hover:text-gray-900 text-sm outline-2 cursor-pointer ${
                  pathname === "/berita" || pathname === "/berita/Detail/[id]"
                    ? "bg-white px-5 py-1 rounded-full text-blue-900 font-bold"
                    : ""
                } `}
              >
                Berita
              </p>
            </Link>
            <Link href={"/galeri"}>
              <p
                className={`hover:text-gray-900 text-sm outline-2 cursor-pointer  ${
                  pathname === "/galeri" ||
                  pathname === "/galeri/foto/selengkapnya" ||
                  pathname === "/galeri/video/selengkapnya" ||
                  pathname === "/galeri/video/Detail/[id]"
                    ? "bg-white px-5 py-1 rounded-full text-blue-900 font-bold"
                    : ""
                } `}
              >
                Galeri
              </p>
            </Link>
            <div className="cursor-pointer flex items-center space-x-1 md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400">
              {token == null || token == "undefined" || token == undefined ? (
                <DropdownLD setOpen={setOpen} pathname={pathname} />
              ) : (
                <DropdownPeople
                  pathname={pathname}
                  setOpen={setOpen}
                  log={log}
                  setLog={setLog}
                />
              )}
            </div>
          </nav>
        </div>
      </div>
      {/* Dekstop */}

      {/* Mobile */}
      <Transition
        show={navbarOpen}
        as={Fragment}
        enter="transition-all ease-in duration-100"
        enterFrom="transform opacity-0 scale-95 translate-y-1"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95 -translate-y-1"
      >
        <div
          className={
            "z-30 rounded-b-2xl flex flex-col fixed xl:hidden lg:hidden w-full pt-32 bg-blue-400 bg-opacity-40 backdrop-blur-lg drop-shadow-lg pb-5 text-sm space-y-3 px-10 text-black font-semibold" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <Link href={"/home"}>
            <p
              className={`cursor-pointer  ${
                pathname === "/home"
                  ? "text-blue-900 font-bold"
                  : "font-semibold "
              }`}
            >
              Home
            </p>
          </Link>
          <div onClick={() => setMenu1(!menu1)} className="flex space-x-3">
            <div
              className={
                "cursor-pointer flex items-center space-x-1" +
                (menu1
                  ? "bg-white rounded-full text-blue-900 font-bold bg-opacity-70"
                  : "")
              }
            >
              Mekanisme Pendaftaran
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 "
                aria-hidden="true"
              />
            </div>
          </div>
          <Transition
            show={menu1}
            as={Fragment}
            enter="transition-all ease-in duration-100"
            enterFrom="transform opacity-0 scale-95 translate-y-1"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95 -translate-y-1"
          >
            <div
              className={`${
                menu1 ? "flex-col gap-y-5 list-disc px-5" : "hidden"
              }`}
            >
              <button className=" group flex w-full items-center rounded-md  px-2 py-2  text-sm text-black">
                {pathname != "/home" ? (
                  <Link href={"/home#faq"}>F.A.Q</Link>
                ) : (
                  <a href="#faq">F.A.Q</a>
                )}
              </button>

              <a href={juknisUrl}>
                <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-black">
                  Unduh Juknis
                </button>
              </a>

              <a href={templateUrl}>
                <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-black">
                  Unduh Template
                </button>
              </a>
            </div>
          </Transition>

          <Link href={"/berita"}>
            <p
              className={`cursor-pointer  ${
                pathname === "/berita"
                  ? "text-blue-900 font-bold"
                  : "font-semibold"
              }`}
            >
              Berita
            </p>
          </Link>
          <Link href={"/galeri"}>
            <p
              className={`cursor-pointer  ${
                pathname === "/galeri" ||
                pathname === "/galeri/foto/selengkapnya" ||
                pathname === "/galeri/video/selengkapnya"
                  ? "text-blue-900 font-bold"
                  : "font-semibold"
              }`}
            >
              Galeri
            </p>
          </Link>
          {token == null || token == "undefined" || token == undefined ? (
            <>
              <div onClick={() => setMenu2(!menu2)} className="flex space-x-3">
                <div
                  className={
                    "cursor-pointer flex items-center space-x-1" +
                    (menu2
                      ? "bg-white rounded-full text-blue-900 font-bold bg-opacity-70"
                      : "")
                  }
                >
                  Login|Daftar
                  <ChevronDownIcon
                    className="ml-2 -mr-1 h-5 w-5 "
                    aria-hidden="true"
                  />
                </div>
              </div>
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
                <div
                  className={`${
                    menu2 ? "flex-col gap-y-5 list-disc px-5" : "hidden"
                  }`}
                >
                  <Link href={"/auth/login"}>
                    <button
                      className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-black  ${
                        pathname === "/auth/login" &&
                        "bg-white  text-blue-900 font-bold "
                      } `}
                    >
                      Login
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      if (pathname === "/auth/daftar") {
                        return;
                      } else {
                        setOpen(true);
                      }
                    }}
                    className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-black  ${
                      pathname === "/auth/daftar" &&
                      "bg-white  text-blue-900 font-bold "
                    } `}
                  >
                    Daftar
                  </button>
                </div>
              </Transition>
            </>
          ) : (
            <>
              <div onClick={() => setMenu2(!menu2)} className="flex space-x-3">
                <div
                  className={
                    "cursor-pointer flex items-center space-x-1" +
                    (menu2
                      ? "bg-white rounded-full text-blue-900 font-bold bg-opacity-70"
                      : "")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-[142b51]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <ChevronDownIcon
                    className="ml-2 -mr-1 h-5 w-5 "
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div
                className={`${
                  menu2 ? "flex-col gap-y-5 list-disc px-5" : "hidden"
                }`}
              >
                <Link href={"/proposal"}>
                  <button
                    className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-black  ${
                      pathname === "/proposal" &&
                      "bg-white  text-blue-900 font-bold "
                    } `}
                  >
                    List Proposal
                  </button>
                </Link>

                <Link href={"/editProfile"}>
                  <button
                    className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-black  ${
                      pathname === "/editProfile" &&
                      "bg-white  text-blue-900 font-bold "
                    } `}
                  >
                    Edit Profile
                  </button>
                </Link>
                <button
                  onClick={() => {
                    setLog(true);
                  }}
                  className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-black  ${
                    pathname === "/auth/daftar" &&
                    "bg-white  text-blue-900 font-bold "
                  } `}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </Transition>
      {/* Mobile */}
      <LogOut log={log} setLog={setLog} cancelButtonRef={cancelButtonRef} />
      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      ></Modal>
    </>
  );
}

function DropdownMekanis({ pathname, juknisUrl, templateUrl }) {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                className={` inline-flex w-full justify-center text-sm  ${
                  open &&
                  "bg-white px-5 py-1 rounded-full text-blue-900 font-bold"
                }`}
              >
                Mekanisme Pendaftaran
                {open ? (
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
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-38 origin-top-right divide-y divide-gray-100 rounded-sm bg-blue-900  bg-opacity-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-white">
                        {pathname != "/home" ? (
                          <Link href={"/home#faq"}>F.A.Q</Link>
                        ) : (
                          <a href="#faq">F.A.Q</a>
                        )}
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <a href={juknisUrl}>
                        <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-white">
                          Unduh Juknis
                        </button>
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a href={templateUrl}>
                        <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-white">
                          Unduh Template
                        </button>
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}

function DropdownLD({ setOpen, pathname }) {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                className={`inline-flex w-full justify-center  hover:text-gray-900 text-sm    ${
                  pathname === "/auth/daftar" ||
                  pathname === "/auth/login" ||
                  open
                    ? "bg-white px-5 py-1 rounded-full text-blue-900 font-bold bg-opacity-70"
                    : ""
                }`}
              >
                Login/Daftar
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-20 origin-top-right divide-y divide-gray-100 rounded-sm bg-blue-900  bg-opacity-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Link href={"/auth/login"}>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`group flex justify-center w-full items-center rounded-md px-2 py-1 text-sm text-white  ${
                            pathname === "/auth/login" &&
                            "bg-white  text-blue-900 font-bold "
                          } `}
                        >
                          Login
                        </button>
                      )}
                    </Menu.Item>
                  </Link>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          if (pathname === "/auth/daftar") {
                            return;
                          } else {
                            setOpen(true);
                          }
                        }}
                        className={`group flex justify-center w-full items-center rounded-md px-2 py-1 text-sm text-white  ${
                          pathname === "/auth/daftar" &&
                          "bg-white  text-blue-900 font-bold "
                        } `}
                      >
                        Daftar
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}

function DropdownPeople({ setOpen, pathname, log, setLog }) {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex w-full justify-center   hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[142b51]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-sm bg-blue-900  bg-opacity-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Link href={"/proposal"}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`group flex justify-center w-full items-center rounded-md px-2 py-1 text-sm text-white  ${
                        pathname === "/proposal" ||
                        pathname === "/proposal/submit-document/[id]" ||
                        pathname === "/proposal/submit-proposal"
                          ? "bg-white  text-blue-900 font-bold "
                          : ""
                      } `}
                    >
                      List Proposal
                    </button>
                  )}
                </Menu.Item>
              </Link>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link href={"/editProfile"}>
                    <button
                      className={`group flex justify-center w-full items-center rounded-md px-2 py-1 text-sm text-white  ${
                        pathname === "/editProfile" &&
                        "bg-white  text-blue-900 font-bold "
                      } `}
                    >
                      Edit Profile
                    </button>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setLog(true);
                    }}
                    className={`group flex justify-center w-full items-center rounded-md px-2 py-1 text-sm text-white   `}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
function LogOut({ log, setLog, cancelButtonRef }) {
  const { pathname } = useRouter();

  return (
    <>
      <Transition.Root show={log} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setLog}
        >
          <Transition.Child
            as={React.Fragment}
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
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative bg-white rounded-[30px] text-center overflow-hidden shadow-xl transform transition-all sm:my-8  xl:w-1/5 lg:w-1/4 md:w-2/5 sm:w-1/2 w-3/4  p-3">
                  <div className="bg-white px-4 lg:px-1  pt-5 pb-4 ">
                    <div className="flex items-center justify-center">
                      <div className="mt-3 text-center md:w-3/4 ml-4 ">
                        <Dialog.Title
                          as="h3"
                          className="text-lg md:text-lg leading-6 pb-3 font-bold text-gray-900"
                        >
                          Are you sure you want to log out?
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 gap-x-10 px-4 py-5 lg:px-2 lg:py-3 sm:px-6 sm:flex justify-center ">
                    <button
                      type="button"
                      className="close w-full inline-flex justify-center rounded-[30px] border border-gray-300 shadow-sm px-7 lg:px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto lg:text-sm"
                      onClick={() => setLog(false)}
                      ref={cancelButtonRef}
                    >
                      Decline
                    </button>

                    <button
                      onClick={() => {
                        setLog(false);
                        localStorage.removeItem("token");
                        sessionStorage.removeItem("token");
                        Router.push("/home");
                        if (pathname == "/home") {
                          window.location.reload(false);
                        }
                      }}
                      type="submit"
                      className="close mt-3 sm:mt-0 md:mt-0 lg:mt-0 22xl:mt-0 2xl:mt-0 w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-7 lg:px-6 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto lg:text-sm"
                    >
                      Log Out
                    </button>
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

function Modal({ open, setOpen, cancelButtonRef }) {
  const [check, setCheck] = React.useState(false);

  const handleChange = async () => {
    // await getDown(
    //   "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf"
    // );
    // await getDown(
    //   "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip"
    // );

    setCheck((current) => !current);
  };
  // console.log(check);

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
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                        <Dialog.Title
                          as="h3"
                          className="text-lg md:text-sm leading-6 pb-3 font-medium text-gray-900"
                        >
                          Terms Of Service
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm md:text-xs text-gray-500 justify-start text-start ">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Modi dignissimos dolor illum a recusandae
                            soluta error architecto? Placeat architecto vel enim
                            deleniti reprehenderit repudiandae, consequatur
                            natus delectus odit sed, vero distinctio officiis
                            necessitatibus. Corrupti, ut quo aperiam officia
                            ullam enim corporis recusandae, ad culpa illum,
                            tenetur maiores saepe consectetur exercitationem!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start px-8 lg:px-6 items-center gap-x-3 pb-5">
                    <input
                      type="checkbox"
                      id=""
                      name=""
                      defaultChecked={false}
                      value={check}
                      onChange={handleChange}
                      required
                      className="form-check-input appearance-none h-4 w-4 lg:h-3 lg:w-3 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                    />
                    <p className="font-normal  text-xs text-red-600">
                      Unduh Juknis dan Template
                    </p>
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
                    {check ? (
                      <Downloader setOpen={setOpen} setCheck={setCheck} />
                    ) : (
                      <button
                        type="submit"
                        disabled={true}
                        className="close mt-3 sm:mt-0 md:mt-0 lg:mt-0 22xl:mt-0 2xl:mt-0 w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-7 lg:px-6 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto lg:text-sm"
                      >
                        Accept
                      </button>
                    )}
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

function Downloader({ setOpen, setCheck }) {
  const { pathname } = useRouter();

  const juknisUrl =
    "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf";
  const templateUrl =
    "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip";

  const handleClick = (e) => {};

  return (
    <a
      onClick={() => {
        window.open(juknisUrl);

        setOpen(false);
        setCheck(false);
        setTimeout(() => {
          const winpop = window.open(templateUrl);
          winpop.focus();
          if (!winpop || winpop.closed) {
            alert("Please Allow Pop Up");
          }
          Router.push(
            pathname == "/auth/login" || pathname == "/auth/EmailVerification"
              ? "daftar"
              : "auth/daftar"
          );
        }, 1000);
      }}
      className="close mt-3 sm:mt-0 md:mt-0 lg:mt-0 22xl:mt-0 2xl:mt-0 w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-7 lg:px-6 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto lg:text-sm"
    >
      Accept
    </a>
  );
}
