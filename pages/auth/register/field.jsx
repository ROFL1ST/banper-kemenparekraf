import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";

export default function Field1() {
  React.useEffect(() => {
    document.title = "Daftar";
  });

  return (
    <>
      <Navbar />
      <div style={{
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2017/05/19/06/22/desk-2325627_960_720.jpg)",
      }}
        className="bg-gray-200 w-full h-full  bg-cover rounded-b-3xl">
        <div className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9  rounded-b-3xl">
          <Section text={"Daftar"} />
          <div className="lg:w-1/3 md:w-1/2  flex flex-col mx-auto ">
            <div className="relative mb-10">
              <label className="leading-7 text-lg text-gray-800 font-medium ">*Email Komunitas</label>
              <input type="text" className="w-full bg-white rounded border border-gray-300   text-base outline-none text-gray-700 py-1 px-3 leading-8 " placeholder="Masukan Email Komunitas" />
            </div>
            <div className="relative mb-10">
              <label className="leading-7 text-lg text-gray-800 font-medium">*Ketik Ulang Email Komunitas</label>
              <input type="text" className="w-full bg-white rounded border border-gray-300   text-base outline-none text-gray-700 py-1 px-3 leading-8 " placeholder="Ulangi Email Komunitas" />
            </div>
            <div className="relative mb-10">
              <label className="leading-7 text-lg text-gray-800 font-medium">*Buat Kata Sandi</label>
              <input type="password" className="w-full bg-white rounded border border-gray-300  text-base outline-none text-gray-700 py-1 px-3 leading-8 " placeholder="Masukan Kata Sandi" />
            </div>
            <div className="relative mb-10">
              <label className="leading-7 text-lg text-gray-800 font-medium" >*Ketik Ulang Kata Sandi</label>
              <input type="password" className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 " placeholder="Ulangi kata sandi" />
            </div>
          </div>
          <button
            className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto  text-white md:px-28 px-12 mt-5 rounded-xl text-xl py-3"
          >
            Daftar Sekarang
          </button>
        </div>
      <Footer/>
      </div>
      {/* <Footer/> */}
    </>
  )
}