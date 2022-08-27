import Link from "next/link";
import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";

export default function Add() {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2017/05/19/06/22/desk-2325627_960_720.jpg)",
        }}
        className="bg-gray-200 w-full h-screen bg-cover rounded-b-3xl"
      >
        <div className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9  rounded-b-3xl">
          <Section text={"Submit Proposal"} />
          <div className="mt-10 2xl:w-1/2 xl:w-3/5 lg:w-3/4 sm:w-3/5 2xl:space-y-10 lg:space-y-5 space-y-3  mx-auto">
            <div className="grid gap-y-2">
              <label htmlFor="usename" className="font-semibold">
                Judul Proposal
              </label>
              <input
                type="text"
                placeholder="Masukkan Judul Proposal"
                className="border  px-3
    py-3 outline-none rounded-md placeholder:text-sm"
              />
            </div>
            <div className="grid gap-y-2">
              <label className="font-semibold" htmlFor="usename">
                Jenis Bantuan
              </label>
              <select
                className="form-select form-select-sm
    appearance-none
    block
    w-full
    px-3
    py-3
    text-sm
    font-semibold
    text-gray-700
    bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label=".form-select-sm example"
              >
                <option selected>Sarana Ruang Kreatif</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="flex flex-col justify-center lg:px-72">
              <button className="bg-blue-900 py-3 rounded-md text-white font-semibold mt-5 w-full">
                Buat Proposal
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
