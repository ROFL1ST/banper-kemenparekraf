import Link from "next/link";
import { useEffect } from "react";
import Background from "../components/background";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Section from "../components/section";

export default function Daftar() {
  useEffect(() => {
    document.title = "Daftar";
  });

  return (
    <>
      <Navbar />
      <Background>
        <Section text={"Daftar"} />
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end pt-10">
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">
              *Nama Komunitas/ Pemerintah Daerah/ Lembaga Adat <br />
              (sesuai Akta/Legalitas)
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
              placeholder="Masukan Nama Komunitas/Pemerintah Daerah/Lembaga"
            />
          </div>
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">
              Kategori Pengusul
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
              placeholder="Pilih Kategori"
            />
          </div>
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">*Provinsi</label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
              placeholder="Pilih Provinsi"
            />
          </div>
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">
              *Kabupaten/Kota
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
              placeholder="Pilih Kabupaten/Kota"
            />
          </div>
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">
              *Alamat Akta
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
              placeholder="Masukan Alamat Akta"
            />
          </div>
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">
              *Alamat Domisili(Bisa disamakan dengan akta)
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
              placeholder=" Masukan Alamat Domisili"
            />
          </div>
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">
              *Email Komunitas
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
              placeholder="Masukan Email Komunitas"
            />
          </div>
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">
              *Ketik Ulang Email Komunitas
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
              placeholder="Ulang Email Komunitas"
            />
          </div>
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">
              Nomor Telepon Komunitas
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
              placeholder="Nomor Telepon Komunitas"
            />
          </div>
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">
              *Subsektor Utama
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
              placeholder="Pilih Subsektor"
            />
          </div>
        </div>
        <div className="flex lg:w-2/3 w-full flex-grow mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-1/2">
            <label className="leading-7 text-sm text-gray-600">
              *Usulan Anggota
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
              placeholder="Usulan Dari Anggota"
            />
          </div>
        </div>
        <hr className="bg-yellow-400 h-0.5 m-10" />
        <div className="  border-10 border-b-orange-600 ">
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label className="leading-7 text-sm text-gray-600">
                *Nama Ketua/Penanggung Jawab
              </label>
              <input
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                placeholder="Masukan Nama"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label className="leading-7 text-sm text-gray-600">
                *Nomor KTP Ketua
              </label>
              <input
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                placeholder="Masukan Nomor KTP"
              />
            </div>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label className="leading-7 text-sm text-gray-600">
                No Akta Notaris
              </label>
              <input
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                placeholder="Masukan Akta Notaris"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label className="leading-7 text-sm text-gray-600">
                Tanggal Akta Notaris
              </label>
              <input
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                placeholder="2020-08-25"
              />
            </div>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label className="leading-7 text-sm text-gray-600">
                No terdaftar kemenkumham.
              </label>
              <input
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                placeholder="Masukan No. terdaftar kemenkumham"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label className="leading-7 text-sm text-gray-600">
                Tanggal terdaftar kemenkumham
              </label>
              <input
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                placeholder="2020-08-25"
              />
            </div>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label className="leading-7 text-sm text-gray-600">
                *Buat Kata Sandi
              </label>
              <input
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                placeholder="Masukan Kata Sandi"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label className="leading-7 text-sm text-gray-600">
                *Ketik Ulang Kata Sandi
              </label>
              <input
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                placeholder="Ulang Kata Sandi"
              />
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white px-28 rounded-xl text-xl py-3">
            daftar sekarang
          </button>
        </div>
        <Footer />
      </Background>
    </>
  );
}
