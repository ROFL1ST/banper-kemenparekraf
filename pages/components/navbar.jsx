/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="fixed w-full z-50">
        <div className="bg-blue-900 h-6"></div>
        <div className="bg-blue-400 w-full h-20 bg-opacity-20 backdrop-blur-lg drop-shadow-lg flex items-center justify-between px-8 lg:px-16">
          <img src={"assets/banper.png"} alt="logo" className="h-36" />
          <nav className="flex space-x-7 text-white">
            <Link href={"/home"}>
              <p className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
                Home
              </p>
            </Link>
            <p className="hover:text-gray-900 text-sm outline-2 cursor-pointer">
              Mekanisme Pendaftaran
            </p>
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
    </>
  );
}
