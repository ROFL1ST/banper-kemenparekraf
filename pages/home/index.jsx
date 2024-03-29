/* eslint-disable react/no-unescaped-entities */
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { Disclosure } from "@headlessui/react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useEffect, useState, useRef, Fragment } from "react";
import Section from "../components/section";
import Feedback from "../components/feedback";
import building from "../assets/building.png";
import empty from "../assets/Empty-amico.png";
import CardBeritaLoading from "./component/CardBeritaLoading";
import Link from "next/link";
import parse from "html-react-parser";
import { getDown, getApi, download } from "../api/restApi";
import { Dialog, Transition } from "@headlessui/react";

import Galeri from "./component/Galeri";
import Router, { useRouter } from "next/router";
import FaqBackground from "../assets/bg2.jpg";
import images from "../assets/faq.jpg";
export default function Dashboard() {
  // token
  const [token, setToken] = useState();
  useEffect(() => {
    // Perform localStorage action
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      return;
    }
  }, [token]);

  const cancelButtonRef = useRef(null);

  const [data, setData] = useState({ berita: {}, loading: true });
  const getData = async () => {
    try {
      //let respond = await axios.get(url, config);
      let respond = await getApi("news?limit=2").then((result) => result);
      setData((s) => ({ ...s, berita: respond.data.data, loading: false }));
    } catch (error) {
      console.log(error);
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
    "https://banper.kemenparekraf.go.id/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf";
  const TemplateUrl =
    "https://banper.kemenparekraf.go.id/dashboard/assets/Dokumen_Banper_TA_2023.zip";
  useEffect(() => {
    getData();
    getFaq();
  }, []);

  useEffect(() => {
    document.title = "Home";
  });
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
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
              Sarana Ruang Kreatif
            </p>
          </div>
        </div>

        {token ? (
          <button
            onClick={() => {
              Router.push("/proposal");
            }}
            className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white xl:px-28 lg:px-28 md:px-20 sm:px-16 px-14 rounded-xl text-xl py-6 relative xl:bottom-11 lg:bottom-11 md:bottom-36 sm:bottom-28 bottom-28"
          >
            Proposal
          </button>
        ) : (
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white xl:px-28 lg:px-28 md:px-20 sm:px-16 px-14 rounded-xl text-xl py-6 relative xl:bottom-11 lg:bottom-11 md:bottom-36 sm:bottom-28 bottom-28"
          >
            daftar sekarang
          </button>
        )}
        <div className={`xl:px-20 lg:px-20 px-5 mt-10`}>
          <Section text={"mekanisme pendaftaran"} />
          {/* <p className="text-center xl:px-24 lg:px-24 md:px-14 sm:px-12 px-5 lg:text-sm my-10">
            1. Mendaftar akun di situs https:// banper.kemenparekraf.go.id 2.
            Mengunggah (upload) proposal ke situs 3. Mengikuti ketentuan sesuai
            petunjuk teknis dan menggunakan template yang disediakan 4.
            Mengirimkan proposal pada rentang waktu yang telah ditentukan
          </p> */}
          <div className="items-center flex justify-center">
            <ul className="text-left  xl:px-24 lg:px-24 md:px-14 sm:px-12 px-5 lg:text-sm my-10 flex flex-col">
              <li>
                1. Mendaftar akun di situs https:// banper.kemenparekraf.go.id
              </li>
              <li>2. Mengunggah (upload) proposal ke situs</li>
              <li>
                3. Mengikuti ketentuan sesuai petunjuk teknis dan menggunakan
                template yang disediakan
              </li>
              <li>
                4. Mengirimkan proposal pada rentang waktu yang telah ditentukan
              </li>
            </ul>
          </div>
          <Section text={"Berita"} />
          {data.loading ? (
            <>
              <div className="grid  lg:grid-cols-2  items-center xl:gap-x-5 lg:gap-x-5 xl:space-y-0 lg:space-y-5 space-y-5 mt-10 2xl:w-full  lg:w-full">
                <CardBeritaLoading />
                <CardBeritaLoading />
              </div>
            </>
          ) : data.berita.length != 0 ? (
            <>
              <div className="grid  lg:grid-cols-2  items-center xl:gap-x-5 lg:gap-x-5 xl:space-y-0 lg:space-y-5 space-y-5 mt-10 2xl:w-full  lg:w-full">
                {data.berita.map((i, key) => (
                  <div key={key}>
                    <div className="md:flex hidden">
                      <CardBerita data={i} />
                    </div>
                    <div className="flex md:hidden">
                      <CardBeritaMobile data={i} />
                    </div>
                  </div>
                ))}
              </div>
              {data.berita.length < 2 ? (
                <div className="flex justify-center text-blue-700 underline mt-5 mb-10 text-sm">
                  <Link href={"/berita?type=berita&sort=terbaru"}>
                    see more
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <div className="flex relative flex-col justify-center items-center mb-10 mt-5">
              <img src={empty.src} className="lg:h-96 h-72 w-auto" alt="" />
              <p className="font-bold">Berita Tidak Tersedia</p>
            </div>
          )}

          <Section text={"Galeri"} />
          <Galeri />
        </div>
        {/* faq */}
        <div
          className="h-full w-full bg-gray-200 bg-cover bg-bottom"
          style={{ backgroundImage: `url(${FaqBackground.src})` }}
        >
          <div
            id="faq"
            className="bg-gray-200 w-full h-full bg-opacity-20 backdrop-blur-sm drop-shadow-lg py-16  2xl:px-60 lg:px-20 md:px-10 px-3"
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
                style={{ backgroundImage: `url(${images.src})` }}
                className=" xl:w-1/3 lg:w-1/3 md:w-3/4 w-3/4 2xl:h-[42rem] lg:h-[45rem] h-[29rem]  bg-cover bg-center rounded-tr-[7rem] rounded-br-2xl rounded-bl-[7rem]"
              ></div>
            </div>
            <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-row  flex-col justify-center gap-y-5 gap-x-5 mt-20 xl:px-0 lg:px-0 md:px-0 sm:px-16 px-16">
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
        <Feedback />
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
              <Disclosure.Button className="flex w-full justify-between  px-4 py-2 text-left text-sm  font-medium  ">
                <span className="w-11/12">{text}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-blue-900 `}
                />
              </Disclosure.Button>
              {open ? <div className="border-b"></div> : <></>}
              <Disclosure.Panel className="px-4 pt-4 pb-2 lg:text-sm text-xs text-gray-500">
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

  return reactElement;
}

function CardBerita({ data }) {
  const MAX_LENGTHtitle = 40;

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return (
    <>
      <Link href={`/berita/Detail/${data.Id}`}>
        <div className="min-w-[100%] h-[19rem] rounded-xl bg-gray-100 flex cursor-pointer">
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
                <h3 className="my-3 font-bold capitalize h-auto text-sm lg:text-sm 2xl:text-base">
                  {`${data.Judul.substring(0, MAX_LENGTHtitle)}    ...`}
                </h3>
              ) : (
                <h3 className="my-3 font-bold capitalize h-auto text-ellipsis lg:text-sm 2xl:text-base">
                  {data.Judul}
                </h3>
              )}
              <div className="xl:text-base lg:h-44 h-36 mb-2 pt-2 lg:text-base text-sm overflow-y-auto scrollbar">
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

function CardBeritaMobile({ data }) {
  const MAX_LENGTHtitle = 40;

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return (
    <>
      <Link href={`/berita/Detail/${data.Id}`}>
        <div className="bg-[#f5f5fa] w-full h-80 rounded-2xl">
          <div
            className="w-full h-1/2 bg-cover rounded-t-2xl bg-center"
            style={{
              backgroundImage: `url(${data.foto})`,
            }}
          ></div>
          <div className="px-5 py-1">
            <small className="text-xs font-bold text-gray-500">
              {formatter.format(Date.parse(data.CreatedAt))}
            </small>
            {data.Judul.length > MAX_LENGTHtitle ? (
              <h3 className="my-3 font-bold capitalize h-16 lg:text-sm 2xl:text-base pr-20">
                {`${data.Judul.substring(0, MAX_LENGTHtitle)}    ...`}
                <Link
                  href={`/berita/Detail/${data.Id}`}
                  className="text-blue-600 text-sm font-medium cursor-pointer"
                >
                  Read more
                </Link>
              </h3>
            ) : (
              <h3 className="my-3 font-bold capitalize h-16 text-ellipsis lg:text-sm 2xl:text-base pr-20">
                {data.Judul}
              </h3>
            )}
            <small className="text-xs font-bold text-blue-900">
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

  return reactElement;
}

function Modal({ open, setOpen, cancelButtonRef }) {
  const [check, setCheck] = useState(false);

  const handleChange = async () => {
    setCheck((current) => !current);
  };

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
                          Pengumuman
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm md:text-xs text-gray-500 justify-start text-start ">
                            Sebelum mendaftar, kami sarankan anda untuk
                            mempelajari petunjuk teknis dan templat proposal
                            program ini. Dengan mencentang ceklis di bawah dan
                            klik lanjutkan, maka petunjuk teknis dan templat
                            proposal akan diunduh ke perangkat anda. Setelahnya,
                            anda akan langsung diarahkan menuju pendaftaran akun
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
    "https://banper.kemenparekraf.go.id/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf";
  const templateUrl =
    "https://banper.kemenparekraf.go.id/dashboard/assets/Dokumen_Banper_TA_2023.zip";

  return (
    <a
      href={templateUrl}
      onClick={() => {
        window.open(juknisUrl);

        setOpen(false);
        setCheck(false);
        setTimeout(() => {
          Router.push(
            pathname == "/auth/login" || pathname == "/auth/EmailVerification"
              ? "register/field"
              : "auth/register/field"
          );
        }, 1000);
      }}
      className="close mt-3 sm:mt-0 md:mt-0 lg:mt-0 22xl:mt-0 2xl:mt-0 w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-7 lg:px-6 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto lg:text-sm"
    >
      Accept
    </a>
  );
}
