/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      {/* Dekstop */}
      <div className="fixed w-full z-40">
        <div className="bg-blue-900 h-6"></div>
        <div className="bg-blue-400 w-full h-20 bg-opacity-20 backdrop-blur-lg drop-shadow-lg flex items-center justify-between px-4 lg:px-16">
          <img src={"assets/banper.png"} alt="logo" className="h-36" />
          <svg
            onClick={() => setNavbarOpen(!navbarOpen)}
            href="javascript:void(0);"
            // onclick="openNav()"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 xl:hidden lg:hidden "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={"2"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <nav className="xl:flex lg:flex md:hidden hidden space-x-7 text-black items-center">
            <Link href={"/home"}>
              <p className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
                Home
              </p>
            </Link>
            <div className="cursor-pointer flex items-center space-x-1">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center   text-sm  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Mekanisme Pendaftaran
                    <ChevronDownIcon
                      className="ml-2 -mr-1 h-5 w-5 "
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-sm bg-blue-900  bg-opacity-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-white">
                            F.A.Q
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-white">
                            Unduh Juknis
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm text-white">
                            Unduh Template
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <Link href={"/home"}>
              <p className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
                Berita
              </p>
            </Link>
            <Link href={"/home"}>
              <p className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
                Galeri
              </p>
            </Link>
            <div className="flex space-x-4">
              <Link href={"/auth/login"}>
                <span className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
                  Login
                </span>
              </Link>
              <span className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
                /
              </span>
              <Link href={"/auth/login"}>
                <span className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
                  Daftar
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
      {/* Dekstop */}
      {/* Mobile */}
      <div
        className={
          "z-30 rounded-b-2xl flex fixed flex-grow items-center w-full sm:hidden pt-28 bg-blue-400 bg-opacity-20 backdrop-blur-lg drop-shadow-lg pb-5" +
          (navbarOpen ? " flex" : " hidden")
        }
        id="example-navbar-danger"
      >
        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li className="nav-item">
            <a
              className="px-3 py-2 flex items-center text-xs   leading-snug text-black hover:opacity-75"
              href="#home"
            >
              <i className="fab fa-facebook-square  leading-lg text-black opacity-75"></i>
              <Link href={"/home"}>
                <span className="ml-2">Home</span>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="px-3 py-2 flex items-center text-xs   leading-snug text-black hover:opacity-75"
              href="#skills"
            >
              <i className="fab fa-twitter  leading-lg text-black opacity-75"></i>
              <span className="ml-2">Mekanisme Pendaftaran</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="px-3 py-2 flex items-center text-xs   leading-snug text-black hover:opacity-75"
              href="#services"
            >
              <i className="fab fa-pinterest  leading-lg text-black opacity-75"></i>
              <Link href={"/home"}>
                <span className="ml-2">Berita</span>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="px-3 py-2 flex items-center text-xs   leading-snug text-black hover:opacity-75"
              href="#project"
            >
              <i className="fab fa-pinterest  leading-lg text-black opacity-75"></i>
              <Link href={"/home"}>
                <span className="ml-2">Galeri</span>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="px-3 py-2 flex items-center text-xs   leading-snug text-black hover:opacity-75"
              href="#project"
            >
              <div className="flex space-x-2 pl-2">
                <Link href={"/auth/login"}>
                  <span className="hover:text-gray-900  outline-2 cursor-pointer">
                    Login
                  </span>
                </Link>
                <span className="hover:text-gray-900  outline-2 cursor-pointer">
                  |
                </span>
                <Link href={"/auth/login"}>
                  <span className="hover:text-gray-900  outline-2 cursor-pointer">
                    Daftar
                  </span>
                </Link>
              </div>
            </a>
          </li>
        </ul>
      </div>
      {/* Mobile */}
    </>
  );
}
