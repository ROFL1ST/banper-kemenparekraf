/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import kemenparekraf from "../assets/kemenparekraf.png";
import wonderful from "../assets/wonderful.png";

export default function Footer() {
  return (
    <>
      <div className="bg-white w-full relative -mb-5 rounded-b-2xl h-[20px]"></div>
      <footer  className="flex xl:flex-row lg:flex-row md:flex-col flex-col justify-between w-full items-center xl:px-16 lg:px-16 md:px-10 sm:px-10 px-10 pt-10 text-base bg-[#f5f5fa]">
        <div className="xl:w-1/4 lg:w-1/4  text-left">
          <h1 className="mb-5 font-bold">Tentang</h1>
          <p>
            Presiden Joko Widodo mengatakan bahwa “Pembangunan Infrastruktur
            bertujuan untuk menumbuhkan sentra-sentra ekonomi baru yang mampu
            memberikan nilai tambah bagi daerah-daerah di seluruh penjuru tanah
            air. {" "}
            <Link href={"/tentang"}>
              <span className="text-red-500 text-sm underline underline-offset-2 decoration-red-500 cursor-pointer">
                Baca selengkapnya
              </span>
            </Link>
          </p>
          <p className="text-gray-500 pt-10">
            Gedung Sapta Pesona Jalan Medan Merdeka Barat No.17 Jakarta 10110
            Email : info@kotakreatif.id
          </p>
        </div>
        <div className="text-left xl:w-1/4 lg:w-1/4 xl:mt-0 lg:mt-0 mt-10  mb-10">
        <h1 className="mb-5 font-bold">Hubungi Kami</h1>
          <p className="text-[#242424] font-semibold">
            Direktorat Infrastruktur Ekonomi Kreatif Deputi Bidang Pengembangan
            Destinasi dan Infrastruktur Kementerian Pariwisata dan Ekonomi
            Kreatif / Badan Pariwisata dan Ekonomi Kreatif
          </p>
          <Link href={""}>
          <p className="text-gray-500 pt-10">
           Contact Us
          </p>
          </Link>
         
        </div>
        <div className="flex xl:w-1/4 lg:w-1/4 w-1/2 justify-center gap-x-4 xl:my-0 lg:my-0 my-5  items-center">
          <img
            className="2xl:h-32 lg:h-20 h-20"
            src={kemenparekraf.src}
            alt={"logo"}
          />  
          <img
            className="2xl:h-32 lg:h-20 h-20"
            src={wonderful.src}
            alt={"logo"}
          />
          
        </div>
        
      </footer>
      <div className="mx-auto px-5 pb-5 pt-10 flex justify-center items-center rounded-b-lg bg-[#f5f5fa]">
        <a href="https://www.facebook.com/ParekrafRI" className="text-white rounded-full bg-[#142b51] p-2">
          <svg
            fill="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a href="https://twitter.com/Kemenparekraf?s=20&t=hGqGbY2NV6nq9jraHzfnMQ" className="ml-3 text-white rounded-full bg-[#142b51] p-2">
          <svg
            fill="currentColor"
            strokeLinecap="round"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a href="https://www.instagram.com/kemenparekraf.ri/" className="ml-3 text-white rounded-full bg-[#142b51] p-2">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            className="w-5 h-5 font-bold"
            viewBox="0 0 24 24"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        
      </div>
      <div className="bg-[#142b51]">
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
