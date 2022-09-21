/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

import logo from "../assets/banper.png";
import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Router, { useRouter } from "next/router";

export default function Navbar({ open, setOpen }) {
  const juknisUrl =
    "http://128.199.242.242/home/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf";
  const templateUrl =
    "http://128.199.242.242/home/assets/Dokumen_Banper_TA_2022.zip";
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [menu1, setMenu1] = React.useState(false);
  const [menu2, setMenu2] = React.useState(false);

  const { pathname } = useRouter();
  const [token, setToken] = React.useState();
  React.useEffect(() => {
    // Perform localStorage action
    if (localStorage.getItem("token") != "undefined") {
      setToken(localStorage.getItem("token"));
    } else if (sessionStorage.getItem("token") != "undefined") {
      setToken(sessionStorage.getItem("token"));
    } else {
      return;
    }
  }, [token]);
  console.log(token);
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
            <Link href={"/berita?type=berita&sort=terbaru"}>
              <p
                className={`hover:text-gray-900 text-sm outline-2 cursor-pointer ${
                  pathname === "/berita" &&
                  "bg-white px-5 py-1 rounded-full text-blue-900 font-bold"
                } `}
              >
                Berita
              </p>
            </Link>
            <Link href={"/galeri"}>
              <p
                className={`hover:text-gray-900 text-sm outline-2 cursor-pointer  ${
                  pathname === "/galeri" || pathname === "/galeri/foto/selengkapnya" || pathname === "/galeri/video/selengkapnya" ?
                  "bg-white px-5 py-1 rounded-full text-blue-900 font-bold" : ""
                } `}
              >
                Galeri
              </p>
            </Link>
            <div className="cursor-pointer flex items-center space-x-1 md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400">
              {token == null || token == "undefined" || token == undefined ? (
                <DropdownLD setOpen={setOpen} pathname={pathname} />
              ) : (
                <DropdownPeople pathname={pathname} setOpen={setOpen} />
              )}
            </div>
          </nav>
        </div>
      </div>
      {/* Dekstop */}

      {/* Mobile */}
      <div
        className={
          "z-30 rounded-b-2xl flex flex-col fixed xl:hidden lg:hidden w-full pt-32 bg-blue-400 bg-opacity-20 backdrop-blur-lg drop-shadow-lg pb-5 text-sm space-y-3 px-10 text-white" +
          (navbarOpen ? " flex" : " hidden")
        }
      >
        <Link href={"/home"}>
          <p
            className={`cursor-pointer  ${
              pathname === "/home" ? "text-blue-900 font-bold" : "font-medium"
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
        <div
          className={`${menu1 ? "flex-col gap-y-5 list-disc px-5" : "hidden"}`}
        >
          <button className=" group flex w-full items-center rounded-md  px-2 py-2  text-sm text-white">
            {pathname != "/home" ? (
              <Link href={"/home#faq"}>F.A.Q</Link>
            ) : (
              <a href="#faq">F.A.Q</a>
            )}
          </button>

          <a href={juknisUrl}>
            <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-white">
              Unduh Juknis
            </button>
          </a>

          <a href={templateUrl}>
            <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-white">
              Unduh Template
            </button>
          </a>
        </div>

        <Link href={"/berita?type=berita&sort=terbaru"}>
          <p
            className={`cursor-pointer  ${
              pathname === "/berita" ? "text-blue-900 font-bold" : "font-medium"
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
                : "font-medium"
            }`}
          >
            Galeri
          </p>
        </Link>
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
        <div
          className={`${menu2 ? "flex-col gap-y-5 list-disc px-5" : "hidden"}`}
        >
          <Link href={"/auth/login"}>
            <button
              className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-white  ${
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
            className={`group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm text-white  ${
              pathname === "/auth/daftar" &&
              "bg-white  text-blue-900 font-bold "
            } `}
          >
            Daftar
          </button>
        </div>
      </div>
      {/* Mobile */}
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
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 "
                  aria-hidden="true"
                />
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

function DropdownPeople({ setOpen, pathname }) {
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
                        pathname === "/proposal" &&
                        "bg-white  text-blue-900 font-bold "
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
                    Edit Profile
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      sessionStorage.removeItem("token");
                      alert("You've Logged Out!");
                      Router.push("/home");
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
