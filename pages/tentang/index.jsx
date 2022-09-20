/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useEffect, useState, useRef, Fragment } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Foto from "../galeri/foto/foto";
import Video from "../galeri/video/video";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Tentang() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [sub] = useState([
    { id: 1, nama: "aplikasi" },
    { id: 2, nama: "pengembangan Permainan" },
    { id: 3, nama: "arsitektur" },
    { id: 4, nama: "desain interior" },
    { id: 5, nama: "desain komunikasi visual" },
    { id: 6, nama: "desain produk" },
    { id: 7, nama: "fesyen" },
    { id: 8, nama: "film, animasi dan video" },
    { id: 9, nama: "fotografi" },
    { id: 10, nama: "kriya" },
    { id: 11, nama: "kuliner" },
    { id: 12, nama: "musik" },
    { id: 13, nama: "penerbitan" },
    { id: 14, nama: "periklanan" },
    { id: 15, nama: "seni pertunjukan" },
    { id: 16, nama: "seni rupa; dan" },
    { id: 17, nama: "televisi dan radio" },
  ]);
  const juknisUrl =
    "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf";
  const TemplateUrl =
    "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip";
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
            <div className="lg:text-sm 2xl:text-xl leading-relaxed">
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
            <div className="grid lg:grid-rows-5 lg:grid-flow-col gap-x-5 gap-y-3 mt-5">
              {sub.map((i, key) => (
                <div
                  key={key}
                  className="px-8 py-3 w-full border bg-white text-base font-medium"
                >
                  {i.id}. {i.nama}
                </div>
              ))}
            </div>
            <p className="lg:text-sm leading-relaxed my-8 2xl:text-xl">
              Dasar kebijakan untuk pelaksanaan program bantuan pemerintah
              adalah peraturan menteri keuangan nomor 168/pmk.05/2015 jo
              173/pmk.05/2 tentang perubahan atas peraturan menteri keuangan
              nomor 168/pmk.05/2015 tentang mekanisme anggran bantuan pemerintah
              pada kementrian negara/lembaga
            </p>
            <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-row  flex-col justify-center gap-y-5 gap-x-5 mt-10 xl:px-0 lg:px-0 md:px-0 ">
              <button className="text-white bg-[#336ba9] px-5 py-1.5 rounded-full">
                <a href={juknisUrl}> Unduh Juknis</a>
              </button>
              <button className="text-white bg-[#336ba9] px-5 py-1.5 rounded-full">
                <a href={TemplateUrl}> Unduh Template</a>
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
function Modal({ open, setOpen, cancelButtonRef }) {
  const [check, setCheck] = useState(false);

  const handleChange = async () => {
    // await getDown(
    //   "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf"
    // );
    // await getDown(
    //   "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip"
    // );

    setCheck((current) => !current);
  };
  // console.log(check);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative bg-white rounded-[30px] text-center overflow-hidden shadow-xl transform transition-all sm:my-8  xl:w-1/5 lg:w-1/4 md:w-2/5 sm:w-1/2 w-3/4  p-3">
                  <div className="bg-white px-4 lg:px-1  pt-5 pb-4 ">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                        <Dialog.Title
                          as="h3"
                          className="text-lg md:text-sm leading-6 pb-3 font-medium text-gray-900"
                        >
                          Terms Of Service
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm md:text-xs text-gray-500 justify-start text-start ">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Modi dignissimos dolor illum a recusandae
                            soluta error architecto? Placeat architecto vel enim
                            deleniti reprehenderit repudiandae, consequatur
                            natus delectus odit sed, vero distinctio officiis
                            necessitatibus. Corrupti, ut quo aperiam officia
                            ullam enim corporis recusandae, ad culpa illum,
                            tenetur maiores saepe consectetur exercitationem!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start px-8 lg:px-6 items-center gap-x-3 pb-5">
                    <input
                      type="checkbox"
                      id=""
                      name=""
                      defaultChecked={false}
                      value={check}
                      onChange={handleChange}
                      required
                      className="form-check-input appearance-none h-4 w-4 lg:h-3 lg:w-3 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                    />
                    <p className="font-normal  text-xs text-red-600">
                      Unduh Juknis dan Template
                    </p>
                  </div>
                  <div className="bg-gray-50 gap-x-10 px-4 py-5 lg:px-2 lg:py-3 sm:px-6 sm:flex justify-center ">
                    <button
                      type="button"
                      className="close w-full inline-flex justify-center rounded-[30px] border border-gray-300 shadow-sm px-7 lg:px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto lg:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Decline
                    </button>
                    {check ? (
                      <Downloader setOpen={setOpen} setCheck={setCheck} />
                    ) : (
                      <button
                        type="submit"
                        disabled={true}
                        className="close mt-3 sm:mt-0 md:mt-0 lg:mt-0 22xl:mt-0 2xl:mt-0 w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-7 lg:px-6 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto lg:text-sm"
                      >
                        Accept
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function Downloader({ setOpen, setCheck }) {
  const { pathname } = useRouter();

  const juknisUrl =
    "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf";
  const TemplateUrl =
    "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip";

  const handleClick = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  const handleClick2 = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  return (
    <Link href={`${pathname === "/auth/login" ? "daftar" : "auth/daftar"}`}>
      <button
        onClick={() => {
          setOpen(false);
          setCheck(false);
          handleClick(juknisUrl);
          handleClick2(TemplateUrl);
        }}
        type="submit"
        className="close mt-3 sm:mt-0 md:mt-0 lg:mt-0 22xl:mt-0 2xl:mt-0 w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-7 lg:px-6 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto lg:text-sm"
      >
        Accept
      </button>
    </Link>
  );
}
