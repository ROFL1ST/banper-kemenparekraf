/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useRef } from "react";
import Footer from "../components/footer";
import Modal from "../components/modal";
import Navbar from "../components/navbar";
import Foto from "../galeri/foto/foto";
import Video from "../galeri/video/video";

export default function Tentang() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    document.title = "Tentang";
  });
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />

      <div className="lg:pt-56 pt-26">
        <div>
          <div className="relative lg:flex hidden bottom-24 mx-24">
            <div
              className="w-full lg:h-72 2xl:h-96 rounded-2xl absolute shadow-md"
              style={{
                backgroundImage:
                  "url(https://cdn.pixabay.com/photo/2016/12/08/21/21/skyscrapers-1893201_960_720.jpg)",
              }}
            ></div>
          </div>
          <div className="w-full h-full bg-gray-100 rounded-md lg:pt-52 pt-32 2xl:pt-80 lg:px-24 pb-24 px-10">
            <h1 className="capitalize text-center lg:text-2xl 2xl:text-4xl font-bold text-blue-900 text-xl">
              tentang bantuan pemerintah
            </h1>
            <div className="flex justify-center">
              <div className="bg-yellow-300 h-0.5 my-3 w-44"></div>
            </div>
            <div className="lg:text-sm 2xl:text-2xl leading-relaxed">
              <p>
                Presiden joko widodo mengatakan bahwa "pembangunan infrastruktur
                bertujuan untuk menumbuhkan sentra-sentra ekonomi baru yang
                mampu memberikan nilai tambah bagi daerah-daerah di seluruh
                penjuru tanah air. Sebagai bangsa yang majemuk, kita ingin
                tumbuh bersama, sejahtera bersama. Satu hal yang tidak boleh
                dilupakan dalam membangun bangsa ini adalah membangun mental dan
                karakter bangsa. Dengan penyediaan infrastruktur sesungguhnya
                kita sedang membangun peradaban, membangun konektivitas budaya,
                membangun infrastruktur budaya baru. Pembangunan infrastruktur
                fisik harus dilihat sebagai cara untuk mempersatukan kita,
                mempercepat konektivitas budaya yang bisa mempertemukan berbagai
                budaya yang berbeda di seluruh nusantara."
              </p>
              <p className="my-8">
                Latar belakang itulah yang mendasari deputi bidang pengembangan
                destinasi dan infrastruktur melalui direktorat infrastruktur
                ekonomi kreatif melaksanakan pemberian dukungan penyediaan
                infrastruktur ekonomi kreatif bagi pelaku/komunitas ekonomi
                kreatif, berupa program bantuan pemerintah untuk fasilitasi
                revitalisasi infrastruktur fisik ruang kreatif, dan sarana ruang
                kreatif. Adapun tujuan dari program ini adalah:
              </p>
              <ol className="list-decimal lg:px-4">
                <li>
                  Memfasilitasi penyediaan kelayakan ruang kreatif dalam bentuk
                  revitalisasi, dan penyediaan sarana.
                </li>
                <li>
                  Dengan adanya bantuan mampu meningkatkan produktivitas dan
                  kreativitas komunitas ekonomi kreatif serta keberlangsungan
                  komunitas ekonomi kreatif.
                </li>
                <li>
                  Mendorong perluasan dan terbangunnya jejaring ekosistem
                  ekonomi kreatif.
                </li>
              </ol>
              <p className="my-8">
                Program bantuan pemerintah merupakan bantuan yang tidak memenuhi
                kriteria bantuan sosial, yang diberikan sebagai stimulan oleh
                pemerintah kepada kelompok masyarakat atau lembaga
                pemerintah/non-pemerintah, diberikan dalam bentuk barang, serta
                merupakan usulan kebutuhan dari pelaku/ komunitas ekonomi
                kreatif. Aktivitas pengusul bantuan harus berkaitan dengan salah
                satu atau maksimal tiga subsektor ekonomi kreatif dari 17 (tujuh
                belas) subsektor ekonomi kreatif, yaitu:
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-x-5 gap-y-1 mt-5">
              <div className="px-2 py-1 w-full border bg-white text-sm">
                1. aplikasi
              </div>
            </div>
            <p className="lg:text-sm leading-relaxed my-8 2xl:text-2xl">
              Dasar kebijakan untuk pelaksanaan program bantuan pemerintah
              adalah peraturan menteri keuangan nomor 168/pmk.05/2015 jo
              173/pmk.05/2 tentang perubahan atas peraturan menteri keuangan
              nomor 168/pmk.05/2015 tentang mekanisme anggran bantuan pemerintah
              pada kementrian negara/lembaga
            </p>
            <div className="flex justify-center space-x-10 lg:text-sm 2xl:text-2xl my-5">
              <button className="bg-blue-800 rounded-full text-white lg:px-4 px-2.5 py-2">
                Unduh Juknis
              </button>
              <button className="bg-blue-800 rounded-full text-white lg:px-4 px-2.5 py-2">
                Unduh Template
              </button>
            </div>
          </div>
        </div>
      </div>
      <Foto />
      <Video />
      <Footer />
      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      ></Modal>
    </>
  );
}
