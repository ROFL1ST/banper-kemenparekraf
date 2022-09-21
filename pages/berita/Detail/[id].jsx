/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import parse from "html-react-parser";

import Router, { useRouter } from "next/router";
import Small_Card_Loading from "./component/Small_Card_Loading";
import DetailCardLoading from "./component/detailCardLoading";
import { Dialog, Transition } from "@headlessui/react";

import { getApi } from "../../api/restApi";
import Link from "next/link";
import axios from "axios";

export default function DetailPage() {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);

  const [loading, setLoading] = React.useState(true);
  const [items, setItem] = React.useState([]);
  const [detail, setDetail] = React.useState({ data: {}, loading2: true });
  var router = useRouter();

  const { id } = router.query;

  const getData = async () => {
    try {
      let respond = await getApi(`news/${id}`).then((result) => result);
      setDetail((s) => ({ ...s, data: respond.data.data[0], loading2: false }));
    } catch (error) {
      // setLoading(false);
      setDetail((s) => ({ ...s, loading2: false }));
      console.log(error);
    }
  };

  const getList = async () => {
    const url = "http://128.199.242.242/api/news";
    try {
      let respond = await getApi("news").then((result) => result);
      setItem(respond.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    document.title = "Detail";
  });
  React.useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);
  React.useEffect(() => {
    const ac = new AbortController();

    getList();
    getData();

    return () => {
      ac.abort();
    };
  }, [router]);
  const [more, setMore] = React.useState(false);
  const { data, loading2 } = detail;

  return (
    <>
      <Navbar setOpen={setOpen} open={open} />
      <div className="items-center flex h-full flex-col pb-10 pt-32 2xl:w-2/3 lg:w-11/12 mx-auto">
        <button onClick={() => Router.back()}>
          <ArrowLeftCircleIcon className="h-8 w-8 text-blue-900 mb-5" />
        </button>
        <Banner data={data} loading2={loading2} />
        {/* Content */}
        <div className="relative pt-16 flex xl:justify-between lg:justify-between justify-center lg:w-full md:w-5/6 w-4/5 ">
          <div className="content-left xl:w-11/12 lg:w-11/12 flex flex-col">
            {/* detail text */}
            <div className="xl:w-11/12 lg:w-11/12 w-full text-base pb-10">
              {/* {reactElement} */}
              {data && !loading2 ? (
                <Isi loading={loading2} data={data.isi}></Isi>
              ) : (
                <div className="space-y-2  animate-pulse">
                  <div className="text-xs font-bold h-4  bg-gray-300 rounded-full"></div>
                  <div className="text-xs font-bold h-4 w-3/4 bg-gray-300 rounded-full"></div>
                  <div className="text-xs font-bold h-4  bg-gray-300 rounded-full"></div>
                  <div className="text-xs font-bold h-4 w-1/4 bg-gray-300 rounded-full"></div>
                </div>
              )}
            </div>
            {/* detail text */}
          </div>
          <div className="content-right w-1/4 xl:flex lg:flex hidden flex-col ">
            <div className="space-y-5">
              {loading ? (
                <>
                  <Small_Card_Loading />
                  <Small_Card_Loading />
                  <Small_Card_Loading />
                </>
              ) : (
                items
                  ?.slice(0, 4)
                  .map((i, index) =>
                    data.Id === i.Id ? (
                      <></>
                    ) : (
                      <News_small_card data={i} key={index}></News_small_card>
                    )
                  )
              )}
            </div>
          </div>
        </div>
        {/* Content */}
        {/* bottom content */}
        <div className="flex flex-col justify-center pt-20 items-center mx-auto lg:w-full w-4/5">
          <h1 className="font-bold text-blue-900 text-3xl underline underline-offset-8 decoration-yellow-500">
            Berita Terkait
          </h1>

          <div className="pt-16  grid lg:grid-cols-4 grid-cols-1 lg:gap-x-1 lg:gap-y-0 gap-y-4 gap-x-4 pb-16 w-full">
            {" "}
            {!loading2 && data ? (
              items.slice(0, 5).map((i, key) =>
                data.Id === i.Id ? (
                  <></>
                ) : (
                  <div
                    onClick={() => {
                      // getData();
                      setDetail((s) => ({ ...s, loading2: true }));

                      // console.log("hai")
                    }}
                    key={key}
                  >
                    <Card data={i} />
                  </div>
                )
              )
            ) : (
              <>
                <DetailCardLoading />
                <DetailCardLoading />
                <DetailCardLoading />
                <DetailCardLoading />
              </>
            )}
          </div>
          <div
            onClick={() => {
              if (items.length < 9) {
                alert("Content is max");
              } else {
                setMore(true);
                return;
              }
            }}
          >
            <h1 className="flex justify-center items-center text-blue-900 underline  cursor-pointer">
              More
            </h1>
          </div>
        </div>
        {/* bottom content */}
      </div>
      <Footer />
      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      ></Modal>
    </>
  );
}

function Card({ data }) {
  const MAX_LENGTH = 60;

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const viewss = async () => {
    try {
      let respond = await PutViews(`news/${data.Id}`).then((result) => result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link href={`/berita/Detail/${data.Id}`}>
        <div
          onClick={() => {
            viewss();
          }}
          className="bg-[#f5f5fa] w-full h-80 rounded-2xl"
        >
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
            {data.Judul.length > MAX_LENGTH ? (
              <h3 className="my-3 font-bold capitalize h-16 lg:text-sm 2xl:text-base">
                {`${data.Judul.substring(0, MAX_LENGTH)}    ...`}
                <Link
                  href={`/berita/Detail/${data.Id}`}
                  className="text-blue-600 text-sm font-medium cursor-pointer"
                >
                  Read more
                </Link>
              </h3>
            ) : (
              <h3 className="my-3 font-bold capitalize h-16 text-ellipsis lg:text-sm 2xl:text-base">
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

function News_small_card({ data }) {
  return (
    <>
      <Link href={`/berita/Detail/${data.Id}`}>
        <div className="flex justify-center items-center ">
          <div
            className="flex w-full h-full  bg-no-repeat bg-cover bg-center justify-center rounded-xl "
            style={{ backgroundImage: `url(${data.foto})` }}
          >
            <div className="bg-black bg-opacity-25 px-3 w-full py-3 rounded-xl">
              <div className="lg:flex-grow   flex flex-col md:items-start md:text-left pt-28 text-white">
                <h1 className="title-font sm:text-sm text-sm  font-medium ">
                  {data.Judul}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

function Isi({ data }) {
  const reactElement = parse(`${data}`);
  //   console.log(reactElement[0]);
  return reactElement;
}

function Banner({ data, loading2 }) {
  return (
    <>
      {/* Banner For Dekstop */}
      {data && !loading2 ? (
        <div
          className="xl:flex bg-no-repeat bg-cover bg-bottom hidden lg:h-[26rem] 2xl:h-[34rem] w-full justify-center rounded-3xl"
          style={{
            backgroundImage: `url("http://128.199.242.242/dashboard/assets/images/blog/${data.foto}")`,
          }}
        >
          <div className="h-full w-full bg-black bg-opacity-60 rounded-3xl flex flex-col justify-end p-8">
            <h1 className="title-font sm:text-4xl text-white text-3xl mb-4 font-medium w-3/4">
              {data.Judul}
            </h1>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex flex-col w-full h-96 rounded-2xl bg-gray-300 animate-pulse">
          <div className="space-y-2 pt-72 px-10">
            <div className="text-xs font-bold h-4 w-1/2 bg-gray-500 rounded-full"></div>
            <div className="text-xs font-bold h-4 w-1/4 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      )}
      {/* Banner For Dekstop */}
      {/* <!-- Banner For Mobile --> */}
      <div className="flex px-5 flex-col justify-center items-center pt-5 xl:hidden lg:hidden w-11/12">
        {data && !loading2 ? (
          <h1 className="flex title-font text-xl mb-4 font-bold pt-5 pb-2">
            {data.Judul}
          </h1>
        ) : (
          <>
            <div className="space-y-2 animate-pulse w-full pb-5">
              <div className="text-xs font-bold h-4 w-3/4 bg-gray-300 rounded-full"></div>
              <div className="text-xs font-bold h-4 w-1/2  bg-gray-300 rounded-full"></div>
            </div>
          </>
        )}

        {data && !loading2 ? (
          <img
            src={`http://128.199.242.242/dashboard/assets/images/blog/${data.foto}`}
            className="rounded-3xl"
            alt="banner"
          />
        ) : (
          <div className=" w-full h-96 rounded-2xl bg-gray-300 animate-pulse"></div>
        )}
      </div>
      {/* <!-- Banner For Mobile --> */}
    </>
  );
}

function Modal({ open, setOpen, cancelButtonRef }) {
  const [check, setCheck] = React.useState(false);

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
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={React.Fragment}
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
                as={React.Fragment}
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
