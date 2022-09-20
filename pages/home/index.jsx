/* eslint-disable react/no-unescaped-entities */
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { Disclosure } from "@headlessui/react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import  { useEffect, useState, useRef, Fragment } from "react";
import Section from "../components/section";
import building from "../assets/building.png";
import CardBeritaLoading from "./component/CardBeritaLoading";
import CardForOneBerita from "./component/CardForOneBerita";
import Link from "next/link";
import parse from "html-react-parser";
import { getDown, getApi, download } from "../api/restApi";
import { Dialog, Transition } from "@headlessui/react";

import Galeri from "./component/Galeri";
import { useRouter } from "next/router";
import axios from "axios";
export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const [data, setData] = useState({ berita: {}, loading: true });
  const getData = async () => {
    try {
      //let respond = await axios.get(url, config);
      let respond = await getApi("news?limit=2").then((result) => result);
      // console.log(respond.data.data, "hai");
      setData((s) => ({ ...s, berita: respond.data.data, loading: false }));
    } catch (error) {
      // console.log(error);
      setData((s) => ({ ...s, loading: false }));
    }
  };

  // faq
  const [faq, setFaq] = useState({ datas: {}, loading2: true });

  const getFaq = async () => {
    try {
      await getApi("master/faq").then((result) => {
        setFaq((s) => ({ ...s, datas: result.data.data, loading2: false }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  // juknis

  const juknisUrl =
    "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf";
  const TemplateUrl =
    "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip";
  useEffect(() => {
    document.title = "Dashboard";
    getData();
    getFaq();
  }, []);
  // console.log(data.berita);

  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar open={open} setOpen={setOpen} />
        <div
          className="xl:pt-48 lg:pt-48 md:pt-32 pt-32 w-screen h-[90vh] bg-cover bg-center text-white xl:px-20 lg:px-20 md:px-16 sm:px-14 px-12 capitalize rounded-b-2xl"
          style={{ backgroundImage: `url(${building.src})` }}
        >
          <div className="xl:w-1/2 lg:w-1/2 md:w-3/4">
            <h1 className="xl:text-4xl lg:text-4xl md:text-2xl text-3xl font-bold">
              Banper Infrastruktur Ekraf
            </h1>
            <p className="mt-7 mb-3">
              Fasilitasi Revitalisasi Infrastruktur Fisik Ruang Kreatif dan
              Sarana Ruang Kreatif.
            </p>
            <p>
              Pengajuan dan penerimaan proposal mulai tanggal 08 November sampai
              dengan 08 Desember 2021 jam 23.59
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white xl:px-28 lg:px-28 md:px-20 sm:px-16 px-14 rounded-xl text-xl py-6 relative xl:bottom-11 lg:bottom-11 md:bottom-36 sm:bottom-28 bottom-28"
        >
          daftar sekarang
        </button>
        <div className="xl:px-20 lg:px-20 px-5">
          <Section text={"mekanisme pendaftaran"} />
          <p className="text-center xl:px-24 lg:px-24 md:px-14 sm:px-12 px-5 lg:text-sm my-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            voluptatibus rem illo accusamus, earum adipisci aliquam dolorem
            dolor assumenda aperiam sed vel molestiae eos quibusdam explicabo
            consequatur libero. Necessitatibus, consequatur?
          </p>
          <Section text={"Berita"} />
          <div className="flex xl:flex-row lg:flex-row md:flex-col flex-col items-center xl:gap-x-5 lg:gap-x-5 xl:space-y-0 lg:space-y-5 space-y-5 mt-10 2xl:w-full  lg:w-full">
            {data.berita.length != 0 ||
            data.berita != undefined ||
            data.berita != [] ? (
              data.loading ? (
                <>
                  <CardBeritaLoading />
                  <CardBeritaLoading />
                </>
              ) : data.berita.length != 1 ? (
                data.berita.map((i, key) => <CardBerita key={key} data={i} />)
              ) : (
                <>
                  {data.berita.map((i, key) => (
                    <CardBerita key={key} data={i} />
                  ))}
                  <CardForOneBerita />
                </>
              )
            ) : (
              <h1>No Data</h1>
            )}
          </div>
          <div className="flex justify-center text-blue-700 underline mt-5 mb-10 text-sm">
            <Link href={"/berita?type=berita&sort=terbaru"}>see more</Link>
          </div>
          <Section text={"Galeri"} />
          <Galeri />
          <div className="flex justify-center text-blue-700 underline mt-5 mb-10 text-sm">
            <Link href={"/galeri"}>see more</Link>
          </div>
        </div>
        {/* faq */}
        <div
          className="h-full w-full bg-gray-200 bg-cover bg-bottom "
          style={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_960_720.jpg)",
          }}
        >
          <div
            id="faq"
            className="bg-gray-200 w-full h-full bg-opacity-20 backdrop-blur-sm drop-shadow-lg py-16 2xl:px-80 xl:px-60 lg:px-20 md:px-10 px-3"
          >
            <Section
              text={"Pertanyaan yang sering diajukan (F.A.Q)"}
              color="bg-[#0d3361]"
            />
            <div className="gap-y-7 flex xl:flex-row lg:flex-row md:flex-col flex-col items-center w-full h-full justify-between mt-10">
              <div className="flex flex-col xl:w-1/2 lg:w-1/2 md:w-3/4 w-3/4 space-y-4">
                {faq && !faq.loading2 ? (
                  faq.datas.map((i, key) => (
                    <Question key={key} text={i.title} sub={i.summary} />
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div
                className="xl:w-96 lg:w-96 md:w-3/4 w-3/4 h-[29rem] bg-gray-100  bg-cover bg-center rounded-tr-[7rem] rounded-br-2xl rounded-bl-[7rem]"
                style={{
                  backgroundImage:
                    "url(https://www.fitforworksg.com/wp-content/uploads/2021/07/pexels-ivan-samkov-4458554-scaled.jpg)",
                }}
              ></div>
            </div>
            <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-row  flex-col justify-center gap-y-5 gap-x-5 mt-10 xl:px-0 lg:px-0 md:px-0 sm:px-16 px-16">
              <button className="text-white bg-[#336ba9] px-5 py-1.5 rounded-full">
                <a href={juknisUrl}> Unduh Juknis</a>
              </button>
              <button className="text-white bg-[#336ba9] px-5 py-1.5 rounded-full">
                <a href={TemplateUrl}> Unduh Template</a>
              </button>
            </div>
          </div>
        </div>
        {/* faq */}
        <Footer />
        <Modal
          open={open}
          setOpen={setOpen}
          cancelButtonRef={cancelButtonRef}
        ></Modal>
      </div>
    </>
  );
}

function Question({ text, sub }) {
  return (
    <>
      <div className="mx-auto w-full  rounded-md  bg-white ">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between  px-4 py-2 text-left text-sm font-medium  ">
                <span className="w-11/12">{text}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-blue-900 `}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <Summary data={sub} />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
function Summary({ data }) {
  const reactElement = parse(`${data}`);
  // console.log(reactElement);

  return reactElement;
}

function CardBerita({ data }) {
  const MAX_LENGTHtitle = 40;
  const MAX_LENGTHdetail = 125;
  const detail =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus ligula nec ultricies faucibus. Sed eleifend accumsan turpis id semper. Morbi et faucibus nisi. Cras in mauris at est bibendum dapibus at ac metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque ultricies tincidunt aliquam. Nullam vestibulum metus sed metus bibendum porttitor. Nunc venenatis libero eget ante mollis gravida. Ut dictum ac justo nec molestie. Donec nec felis luctus tortor egestas accumsan. Maecenas laoreet auctor porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique magna non lobortis vestibulum.";

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return (
    <>
      <Link href={`/berita/Detail/${data.Id}`}>
        <div className="w-full h-[19rem] rounded-xl bg-gray-100 flex">
          <div
            style={{
              backgroundImage: `url(${data.foto})`,
            }}
            className=" w-1/2 rounded-xl h-full bg-cover bg-center"
          ></div>
          <div className="py-4 w-1/2 px-5 flex flex-col justify-between h-full">
            <div>
              <small className="font-semibold xl:text-base lg:text-sm text-xs text-gray-500">
                {formatter.format(Date.parse(data.CreatedAt))}
              </small>
              {data.Judul.length > MAX_LENGTHtitle ? (
                <h3 className="my-3 font-bold capitalize lg:h-5 h-12 text-sm lg:text-sm 2xl:text-base">
                  {`${data.Judul.substring(0, MAX_LENGTHtitle)}    ...`}
                </h3>
              ) : (
                <h3 className="my-3 font-bold capitalize lg:h-5 h-12 text-ellipsis lg:text-sm 2xl:text-base">
                  {data.Judul}
                </h3>
              )}
              <div className="xl:text-base lg:h-auto h-36 mb-2 pt-2 lg:text-base text-sm overflow-y-auto scrollbar">
                <IsiBerita data={data.isi} />
              </div>
            </div>
            <small className="text-xs font-semibold text-blue-900">
              {data.NamaKota}
            </small>
          </div>
        </div>
      </Link>
    </>
  );
}

function IsiBerita({ data }) {
  const reactElement = parse(`${data.substring(0, 449)}`);
  // console.log(reactElement);

  return reactElement;
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
