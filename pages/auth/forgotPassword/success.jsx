import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";
import success from "../../assets/iconmonstr-check-mark-circle-filled-240.png";
import Router from "next/router";

export default function Success() {
  return (
    <>
      <Navbar />
      <div className=" px-5 py-44 mx-auto flex flex-col items-center justify-center ">
        <Section text={"Lupa Password"} />
        <div className=" p-8 flex flex-col justify-center items-center  xl:w-1/2 lg:w-3/4 sm:w-11/12 mt-5  relative z-10">
          <div className="p-3 bg-green-400 bg-opacity-30 rounded-full mb-5">
            <img src={success.src} className="w-auto h-20 " alt="" />
          </div>
          <h2 className="text-gray-900 text-xl mb-5  title-font text-center font-bold">
            Password Diperbarui
          </h2>
          <p className="leading-relaxed text-sm w-full lg:w-2/5 text-gray-600 text-center mb-5">
            Password anda telah diperbarui Klik dibawah ini untuk kembali ke
            halaman login
          </p>
          <button
            onClick={() => {
                Router.push("/auth/login")
            }}
            className="text-white bg-[#142b51] border-0 py-2 px-6 mt-4 focus:outline-none hover:bg-blue-900  text-base flex justify-center w-full lg:w-2/5 mx-auto rounded-xl"
          >
            Kembali ke halaman log in
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
