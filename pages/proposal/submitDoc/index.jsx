import React from "react";
import Background from "../../components/background";
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
        className="bg-gray-200 w-full mb-20  bg-cover rounded-b-3xl"
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
              <div className="flex justify-between gap-x-7">
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
                    <p className="text-xs text-gray-400">
                      Sarana Ruang Kreatif
                    </p>
                  </div>
                </div>
                {/* Right */}
              </div>
            </div>
            {/* Box Pengusul */}
            {/* Box Document 1 */}
            <div className="bg-white bg-opacity-20 rounded-xl px-10 py-8 shadow-xl space-y-7">
              <div>
                <div className="justify-between flex pr-36">
                  <h1 className="text-sm">Dokumen 1: Surat Permohonan</h1>
                  <h1 className="text-sm text-gray-400  ">Tidak Lengkap</h1>
                </div>
                <div className="border mt-3 rounded-full bg-gray-300"></div>
                <div className="flex justify-between pt-10 pr-36">
                  <div className="flex items-center gap-x-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-14 h-14 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p className="text-sm">
                      File dalam bentuk .pdf, .jpg, .jpege dengan ukuran maximal{" "}
                      <span className="text-red-500 font-semibold">3MB</span>
                    </p>
                  </div>
                  <button className="bg-blue-900 py-3 my-auto items-center px-4 rounded-md text-white font-semibold ">
                    upload
                  </button>
                </div>
              </div>
            </div>
            {/* Box Document 1 */}
            {/* Box Document 2 */}
            <div className="bg-white bg-opacity-20 rounded-xl px-10 py-8 shadow-xl space-y-7">
              <div>
                <div className="justify-between flex pr-36">
                  <h1 className="text-sm">Dokumen 2: Proposal Ringkas</h1>
                  <h1 className="text-sm text-gray-400  ">Tidak Lengkap</h1>
                </div>
                <div className="border mt-3 rounded-full bg-gray-300"></div>
                <div className="flex justify-between pt-10 pr-36">
                  <div className="flex items-center gap-x-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-14 h-14 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p className="text-sm">
                      File dalam bentuk .pdf, .jpg, .jpege dengan ukuran maximal{" "}
                      <span className="text-red-500 font-semibold">3MB</span>
                    </p>
                  </div>
                  <button className="bg-blue-900 py-3 my-auto items-center px-4 rounded-md text-white font-semibold ">
                    upload
                  </button>
                </div>
              </div>
            </div>
            {/* Box Document 2 */}
            {/* Box Document 3 */}
            <div className="bg-white bg-opacity-20 rounded-xl px-10 py-8 shadow-xl space-y-7">
              <div>
                <div className="justify-between flex pr-36">
                  <h1 className="text-sm">Dokumen 3: Proposal</h1>
                  <h1 className="text-sm text-gray-400  ">Tidak Lengkap</h1>
                </div>
                <div className="border mt-3 rounded-full bg-gray-300"></div>
                <div className="flex justify-between pt-10 pr-36">
                  <div className="flex items-center gap-x-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-14 h-14 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p className="text-sm">
                      File dalam bentuk .pdf, .jpg, .jpege dengan ukuran maximal{" "}
                      <span className="text-red-500 font-semibold">3MB</span>
                    </p>
                  </div>
                  <button className="bg-blue-900 py-3 my-auto items-center px-4 rounded-md text-white font-semibold ">
                    upload
                  </button>
                </div>
              </div>
            </div>
            {/* Box Document 3 */}
            {/* Box Document 4 */}
            <div className="bg-white bg-opacity-20 rounded-xl px-10 py-8 shadow-xl space-y-7">
              <div>
                <div className="justify-between flex pr-36">
                  <h1 className="text-sm">
                    Dokumen 4: Surat Pernyataan Tidak Terjadi Konflik Internal
                  </h1>
                  <h1 className="text-sm text-gray-400  ">Tidak Lengkap</h1>
                </div>
                <div className="border mt-3 rounded-full bg-gray-300"></div>
                <div className="flex justify-between pt-10 pr-36">
                  <div className="flex items-center gap-x-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-14 h-14 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p className="text-sm">
                      File dalam bentuk .pdf, .jpg, .jpege dengan ukuran maximal{" "}
                      <span className="text-red-500 font-semibold">3MB</span>
                    </p>
                  </div>
                  <button className="bg-blue-900 py-3 my-auto items-center px-4 rounded-md text-white font-semibold ">
                    upload
                  </button>
                </div>
              </div>
            </div>
            {/* Box Document 4 */}
            {/* Box Document 5 */}
            <div className="bg-white bg-opacity-20 rounded-xl px-10 py-8 shadow-xl space-y-7">
              <div>
                <div className="justify-between flex pr-36">
                  <h1 className="text-sm">
                    Dokumen 5: Surat Pernyataan Tidak Terkait Partai Politik
                  </h1>
                  <h1 className="text-sm text-gray-400  ">Tidak Lengkap</h1>
                </div>
                <div className="border mt-3 rounded-full bg-gray-300"></div>
                <div className="flex justify-between pt-10 pr-36">
                  <div className="flex items-center gap-x-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-14 h-14 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p className="text-sm">
                      File dalam bentuk .pdf, .jpg, .jpege dengan ukuran maximal{" "}
                      <span className="text-red-500 font-semibold">3MB</span>
                    </p>
                  </div>
                  <button className="bg-blue-900 py-3 my-auto items-center px-4 rounded-md text-white font-semibold ">
                    upload
                  </button>
                </div>
              </div>
            </div>
            {/* Box Document 5 */}
            {/* Box Document 6 */}
            <div className="bg-white bg-opacity-20 rounded-xl px-10 py-8 shadow-xl space-y-7">
              <div>
                <div className="justify-between flex pr-36">
                  <h1 className="text-sm">
                    Dokumen 6: Surat Pernyataan Bersedia Menerima dan
                    Memanfaatkan (dengan materai)
                  </h1>
                  <h1 className="text-sm text-gray-400  ">Tidak Lengkap</h1>
                </div>
                <div className="border mt-3 rounded-full bg-gray-300"></div>
                <div className="flex justify-between pt-10 pr-36">
                  <div className="flex items-center gap-x-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-14 h-14 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p className="text-sm">
                      File dalam bentuk .pdf, .jpg, .jpege dengan ukuran maximal{" "}
                      <span className="text-red-500 font-semibold">3MB</span>
                    </p>
                  </div>
                  <button className="bg-blue-900 py-3 my-auto items-center px-4 rounded-md text-white font-semibold ">
                    upload
                  </button>
                </div>
              </div>
            </div>
            {/* Box Document 6 */}
            {/* Box Document 7 */}
            <div className="bg-white bg-opacity-20 rounded-xl px-10 py-8 shadow-xl space-y-7">
              <div>
                <div className="justify-between flex pr-36">
                  <h1 className="text-sm">Dokumen 7: Rencana Anggaran Biaya</h1>
                  <h1 className="text-sm text-gray-400  ">Tidak Lengkap</h1>
                </div>
                <div className="border mt-3 rounded-full bg-gray-300"></div>
                <div className="flex justify-between pt-10 pr-36">
                  <div className="flex items-center gap-x-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-14 h-14 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p className="text-sm">
                      File dalam bentuk .pdf, .jpg, .jpege dengan ukuran maximal{" "}
                      <span className="text-red-500 font-semibold">3MB</span>
                    </p>
                  </div>
                  <button className="bg-blue-900 py-3 my-auto items-center px-4 rounded-md text-white font-semibold ">
                    upload
                  </button>
                </div>
              </div>
            </div>
            {/* Box Document 7 */}
            {/* Box Document 8 */}
            <div className="bg-white bg-opacity-20 rounded-xl px-10 py-8 shadow-xl space-y-7">
              <div>
                <div className="justify-between flex pr-36">
                  <h1 className="text-sm max-w-lg">Dokumen 8: Legalitas Lembaga (Komunitas: Akta Notaris Lembaga Adat: Akta Notaris/Surat Pengakuan)</h1>
                  <h1 className="text-sm text-gray-400  ">Tidak Lengkap</h1>
                </div>
                <div className="border mt-3 rounded-full bg-gray-300"></div>
                <div className="flex justify-between pt-10 pr-36">
                  <div className="flex items-center gap-x-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-14 h-14 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p className="text-sm">
                      File dalam bentuk .pdf, .jpg, .jpege dengan ukuran maximal{" "}
                      <span className="text-red-500 font-semibold">3MB</span>
                    </p>
                  </div>
                  <button className="bg-blue-900 py-3 my-auto items-center px-4 rounded-md text-white font-semibold ">
                    upload
                  </button>
                </div>
              </div>
            </div>
            {/* Box Document 8 */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
