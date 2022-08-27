import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";

export default function submitDoc() {
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
          <Section text={"Submit Document"}></Section>
          <div className="mt-32 2xl:w-1/2 xl:w-3/5 lg:w-3/4 sm:w-3/5 2xl:space-y-10 lg:space-y-5 space-y-3  mx-auto">
            {/* Box Persentase */}
            <div className="border border-blue-900 bg-blue-400 bg-opacity-20 rounded-xl px-10 py-8 flex justify-between">
              <h1 className="pb-10">0 dari 8 Syarat Terselesaikan</h1>
              <div className="flex flex-col">
                <div className="flex gap-x-56">
                  <h1>0%</h1>
                  <h1>50%</h1>
                  <h1>100%</h1>
                </div>
                <div className="py-1.5 mt-3 rounded-full bg-gray-300"></div>
              </div>
            </div>
            {/* Box Persentase */}
            {/* Box Pengusul */}
            <div className="bg-white bg-opacity-20 rounded-xl px-10 py-8 shadow-xl space-y-7">
              <div>
                <h1>Identitas Pengusul</h1>
                <div className="border mt-3 rounded-full bg-gray-300"></div>
              </div>
              {/* Left */}
              <div className="flex justify-between gap-x-10">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h1 className="text-sm">
                      Nama Komunitas/Pemerintah Daerah/Lembaga Adat (sesuai
                      akta/legislatis)
                    </h1>
                    <p className="text-xs text-gray-400">DB (Test Web)</p>
                  </div>
                  <div className="space-y-3">
                    <h1 className="text-sm">Subsector</h1>
                    <p className="text-xs text-gray-400">
                      Pengembangan Permainan
                    </p>
                  </div>
                </div>
                {/* Left */}
                {/* Right */}
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h1 className="text-sm">Kategori</h1>
                    <p className="text-xs text-gray-400">Komunitas</p>
                  </div>
                  <div className="space-y-3">
                    <h1 className="text-sm">Jenis Bantuan</h1>
                    <p className="text-xs text-gray-400">Sarana Ruang Kreatif</p>
                  </div>
                </div>
                {/* Right */}
              </div>
            </div>
            {/* Box Pengusul */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
