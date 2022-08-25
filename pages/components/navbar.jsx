/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      {/* Dekstop */}
      <div className="fixed w-screen z-40">
        <div className="bg-blue-900 h-6"></div>
        <div className="bg-blue-400 w-full h-20 bg-opacity-20 backdrop-blur-lg drop-shadow-lg flex items-center justify-between px-4 lg:px-16">
          <img src={"assets/banper.png"} alt="logo" className="h-36" />
          <Bars3Icon
            className="h-6 w-6 xl:hidden"
            onClick={() => setNavbarOpen(!navbarOpen)}
          />
          <nav className="xl:flex lg:flex md:hidden hidden space-x-7 text-black items-center">
            <Link href={"/dashboard"}>
              <p className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
                Home
              </p>
            </Link>
            <div className="cursor-pointer flex items-center space-x-1">
              <Dropdown />
            </div>
            <Link href={"/berita?type=berita&sort=terbaru"}>
              <p className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
                Berita
              </p>
            </Link>
            <Link href={"/galeri"}>
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
              <Link href={"/auth/register"}>
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
          "z-30 rounded-b-2xl flex flex-col fixed xl:hidden lg:hidden w-full pt-32 bg-blue-400 bg-opacity-20 backdrop-blur-lg drop-shadow-lg pb-5 text-sm space-y-3 px-10" +
          (navbarOpen ? " flex" : " hidden")
        }
      >
        <Link href={"/dashboard"}>
          <p className="cursor-pointer">Dashboard</p>
        </Link>
        <div className="flex space-x-3">
          <p>Mekanisme dan Pendaftaran</p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
        <Link href={"/berita?type=berita&sort=terbaru"}>
          <p className="cursor-pointer">Berita</p>
        </Link>
        <Link href={"/galeri"}>
          <p className="cursor-pointer">Galeri</p>
        </Link>
        <div className="flex space-x-1">
          <Link href={"/auth/login"}>
            <span className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
              Login
            </span>
          </Link>
          <span className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
            |
          </span>
          <Link href={"/auth/register"}>
            <span className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
              Daftar
            </span>
          </Link>
        </div>
      </div>
      {/* Mobile */}
    </>
  );
}

function Dropdown() {
  return (
    <>
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
    </>
  );
}
