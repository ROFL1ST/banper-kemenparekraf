/* eslint-disable @next/next/no-img-element */
import Footer from "./components/footer";
import Navbar from "./components/navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div
        className="2xl:h-[65vh] lg:h-[90vh] text-white 2xl:pt-52 lg:pt-44 px-20 pb-10 lg:rounded-b-[3rem] 2xl:rounded-b-[5rem]"
        style={{ backgroundImage: "url(assets/building.png)" }}
      >
        {" "}
        <div className="lg:w-1/2 2xl:w-2/3">
          <h1 className="title-font lg:text-4xl 2xl:text-5xl text-3xl font-bold mb-4">
            Banper Infrastruktur Ekraf
          </h1>
          <p className="mb-8 mt-5 text-xl lg:text-lg leading-relaxed sm:leading-relaxed 2xl:w-1/3 w-full">
            Fasilitasi Revitalisasi Infrastruktur Fisik Ruang Kreatif dan Sarana
            Ruang Kreatif.
          </p>
          <p className="mb-8 text-xl lg:text-lg leading-relaxed sm:leading-relaxed 2xl:w-1/3 w-full">
            Pengajuan dan penerimaan proposal mulai tanggal 08 November sampai
            dengan 08 Desember 2021 jam 23.59
          </p>
        </div>
      </div>
      <div>
        <button className="flex mx-auto 2xl:-mt-9 lg:-mt-10 text-white bg-red-500 border-0 focus:outline-none hover:bg-red-600 rounded-xl text-lg py-6 px-24">
          Daftar Sekarang
        </button>
      </div>

      <div className="flex flex-col text-center w-full mb-20 mt-40">
        <h1 className="2xl:text-3xl text-2xl pb-10 font-bold title-font mb-4 text-blue-900 underline underline-offset-8 decoration-yellow-500">
          Mekasnisme Pendaftaran
        </h1>
        <p className="2xl:w-2/3 w-3/4 mx-auto leading-relaxed text-base text-lg font-normal">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>
      {/* Berita */}
      <div className="px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="2xl:text-3xl text-2xl pb-10 font-bold title-font mb-4 text-blue-900 underline underline-offset-8 decoration-yellow-500">
            Berita
          </h1>
        </div>
        <div className="flex 2xl:flex-row lg:flex-row md:flex-row gap-x-5  2xl:gap-x-4 md:gap-x-4 sm:gap-x-4 gap-y-5 px-5 2xl:px-24 pb-16 flex-col">
          <div className="2xl:w-1/2 md:w-1/2 w-full">
            <div className="bg-gray-100 rounded-lg flex 2xl:h-full h-64 justify-between">
              <div className="w-1/2">
                <img
                  src={"assets/Subtraction 10.png"}
                  alt="logo"
                  className="rounded h-full object-cover object-center"
                />
              </div>
              <div className="w-1/2 2xl:w-2/3 2xl:p-7">
                <h3 className="tracking-widest text-indigo-500 text-xs mb-5 font-medium title-font">
                  23 Desember
                </h3>
                <h2 className="text-lg 2xl:text-xl text-gray-900 font-bold title-font mb-4 lg:mb-1">
                  Menparekraf dorong pengembangan potensi ekonomi kreatif
                  kuliner Magelang
                </h2>
                <div className="leading-relaxed text-base lg:text-xl">
                  <p className="overf font-light fifty-chars 2xl:h-64 lg:h-64 md:h-64 h-20">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </p>
                </div>
                <p className="tems-end mt-2 font-bold lg:mt-5 w-full flex justify-start bottom-0 text-sm 2xl:text-sm">
                  Jakarta
                </p>
              </div>
            </div>
          </div>

          <div className="2xl:w-1/2 md:w-1/2 w-full">
            <div className="bg-gray-100 rounded-lg flex 2xl:h-full h-64 justify-between">
              <div className="w-1/2">
                <img
                  src={"assets/Subtraction 9.png"}
                  alt="logo"
                  className="rounded h-full object-cover object-center"
                />
              </div>
              <div className="w-1/2 lg:w-2/3 p-10 lg:p-7">
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  23 Desember
                </h3>
                <h2 className="text-lg 2xl:text-xl text-gray-900 font-bold title-font mb-4 lg:mb-1">
                  Menparekraf dorong pelaku kuliner di Magelang kembangkan
                  potensi produk UMKM
                </h2>
                <div className="leading-relaxed">
                  <p className="overflow-hidden font-light fifty-chars 2xl:text-xl text-sm 2xl:h-64 lg:h-64 md:h-64 h-20">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </p>
                </div>
                <p className="items-end mt-2 font-bold lg:mt-5 w-full flex justify-start bottom-0 text-sm 2xl:text-sm">
                  Jakarta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Berita */}
      {/* Galery */}
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-col text-center w-full mb-20 mt-20">
          <h1 className="2xl:text-3xl text-2xl font-bold title-font mb-4 text-blue-900 underline underline-offset-8 decoration-yellow-500">
            Galeri
          </h1>
        </div>
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://cdn.pixabay.com/photo/2015/11/17/18/59/architecture-1048092_960_720.jpg"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://cdn.pixabay.com/photo/2017/03/29/15/18/tianjin-2185510_960_720.jpg"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://cdn.pixabay.com/photo/2012/03/04/00/43/architecture-22039_960_720.jpg"
              />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://cdn.pixabay.com/photo/2016/10/24/22/43/dubai-1767540_960_720.jpg "
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://cdn.pixabay.com/photo/2016/11/06/23/51/buildings-1804481_960_720.jpg"
              />
            </div>
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://cdn.pixabay.com/photo/2018/04/02/21/33/building-3285254_960_720.jpg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Galery */}
      {/* FAQ OPEN */}

      <div
        className="px-5 py-24 mx-auto bg-no-repeat bg-cover"
        style={{ backgroundImage: "url(assets/Group 315.png)" }}
      >
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="2xl:text-3xl text-xl 2xl:pb-10 pb-0 font-bold title-font 2xl:mb-4 mb-0 text-blue-900 underline underline-offset-8 decoration-yellow-500">
            Petanyaan yang Sering di adukan (F.A.Q)
          </h1>
        </div>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <div className="w-full px-4 pt-16">
              <div className="mx-auto w-full max-w-md rounded-2xl p-2">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl mx-auto bg-gradient-cyan p-0.5">
                    <div className="flex flex-wrap">
                      <div className="w-full">
                        <a href="#">
                          <div className="pb-0.5 bg-gradient-cyan">
                            <div className="py-3.5 px-5">
                              <div className="flex flex-wrap items-center justify-between -m-2 bg-gray-100 rounded-sm border-white">
                                <div className="w-auto p-2">
                                  <p className="font-heading text-md text-gray-900">
                                    Bagaimana cara mengajukan pertanyaan?
                                  </p>
                                </div>
                                <div className="w-auto p-2">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewbox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.5 3.75L15.75 9M15.75 9L10.5 14.25M15.75 9L2.25 9"
                                      stroke="#111827"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="w-full">
                        <a href="#">
                          <div className="pb-0.5 bg-gradient-cyan">
                            <div className="py-3.5 px-5">
                              <div className="flex flex-wrap justify-between -m-2 bg-gray-100 rounded-sm border-white">
                                <div className="flex-1 p-2">
                                  <p className="mb-5 font-heading text-md text-gray-900">
                                    Lorem ipsum dolor ?
                                  </p>
                                  <p className="text-base text-black">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sagittis euismod ornare
                                    aenean ut justo elit amet. Gravida pulvinar
                                    ac elementum praesent vel quis accumsan,
                                    proin rhoncus.
                                  </p>
                                </div>
                                <div className="w-auto p-2">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewbox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3.75 7.5L9 2.25M9 2.25L14.25 7.5M9 2.25V15.75"
                                      stroke="#111827"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="w-full">
                        <a href="#">
                          <div className="pb-0.5 bg-gradient-cyan">
                            <div className="py-3.5 px-5">
                              <div className="flex flex-wrap items-center justify-between -m-2 bg-gray-100 rounded-sm border-white">
                                <div className="w-auto p-2">
                                  <p className="font-heading text-md text-gray-900">
                                    Lorem ipsum dolor ?
                                  </p>
                                </div>
                                <div className="w-auto p-2">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewbox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.5 3.75L15.75 9M15.75 9L10.5 14.25M15.75 9L2.25 9"
                                      stroke="#111827"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="w-full">
                        <a href="#">
                          <div className="pb-0.5 bg-gradient-cyan">
                            <div className="py-3.5 px-5">
                              <div className="flex flex-wrap items-center justify-between -m-2 bg-gray-100 rounded-sm border-white">
                                <div className="w-auto p-2">
                                  <p className="font-heading text-md text-gray-900">
                                    Lorem ipsum dolor ?
                                  </p>
                                </div>
                                <div className="w-auto p-2">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewbox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.5 3.75L15.75 9M15.75 9L10.5 14.25M15.75 9L2.25 9"
                                      stroke="#111827"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="w-full">
                        <a href="#">
                          <div>
                            <div className="py-3.5 px-5">
                              <div className="flex flex-wrap items-center justify-between -m-2 bg-gray-100 rounded-sm border-white">
                                <div className="w-auto p-2">
                                  <p className="font-heading text-md text-gray-900">
                                    Lorem ipsum dolor ?
                                  </p>
                                </div>
                                <div className="w-auto p-2">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewbox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.5 3.75L15.75 9M15.75 9L10.5 14.25M15.75 9L2.25 9"
                                      stroke="#111827"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            alt="assets"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-tr-3xl rounded-bl-3xl"
            src="https://asset.kompas.com/crops/FGkE00w3NfqPIrQTn_tTrrWyanA=/0x0:0x0/750x500/data/photo/2021/04/22/60819d99a708b.jpg"
          />
        </div>
        <div className="flex justify-center space-x-12 mt-20">
          <button className="text-white bg-blue-500 border-0 py-2 px-10 focus:outline-none hover:bg-blue-600 rounded-full">
            Unduh Juknis
          </button>
          <button className="text-white bg-blue-500 border-0 py-2 px-10 focus:outline-none hover:bg-blue-600 rounded-full">
            Unduh Template
          </button>
        </div>
      </div>
      {/* Faq Close */}
      {/* Footer */}
      <Footer />
      {/* Footer */}
    </>
  );
}
