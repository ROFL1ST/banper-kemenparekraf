/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function Footer() {
  return (
    <>
      {" "}
      <footer className="flex justify-between w-full items-center px-10 pt-10 text-base">
        <div className="w-1/4 text-left">
          <h1 className="mb-5 font-bold">Tentang</h1>
          <p>
            Presiden Joko Widodo mengatakan bahwa “Pembangunan Infrastruktur
            bertujuan untuk menumbuhkan sentra-sentra ekonomi baru yang mampu
            memberikan nilai tambah bagi daerah-daerah di seluruh penjuru tanah
            air.
            <span className="text-red-500 underline underline-offset-2 decoration-red-500">
              Read more
            </span>
          </p>
          <p className="text-gray-500 pt-10">
            Gedung Sapta Pesona Jalan Medan Merdeka Barat No.17 Jakarta 10110
            Email : info@kotakreatif.id
          </p>
        </div>
        <div className="text-left w-1/4 mb-10">
          <p className="text-[#242424] font-semibold">
            Direktorat Infrastruktur Ekonomi Kreatif Deputi Bidang Pengembangan
            Destinasi dan Infrastruktur Kementerian Pariwisata dan Ekonomi
            Kreatif / Badan Pariwisata dan Ekonomi Kreatif
          </p>
        </div>
        <div className="flex w-1/4">
          <img className="h-32" src="../assets/kemenparekraf.png" alt="" />
          <img className="h-32" src="../assets/wonderful.png" alt="" />
        </div>
      </footer>
      <div className="mx-auto px-5 pb-5 flex justify-center items-center rounded-b-lg">
        <a className="text-white rounded-full bg-[#142b51] p-2">
          <svg
            fill="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a className="ml-3 text-white rounded-full bg-[#142b51] p-2">
          <svg
            fill="currentColor"
            strokeLinecap="round"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a className="ml-3 text-white rounded-full bg-[#142b51] p-2">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
      </div>
      <div className="bg-blue-900">
        <div className="mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row justify-center items-center">
          <p className="text-white text-sm text-center sm:text-left">
            © 2022 Kementrian Pariwisata dan Ekonomi Kreatif/Badan Pariwisata
            dan Ekonomi Kreatif, Republik Indonesia
          </p>
        </div>
      </div>
    </>
  );
}
