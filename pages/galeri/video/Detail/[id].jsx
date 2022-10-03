/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import { getGaleri, PutViews } from "../../../api/restApi";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import { Dialog, Transition } from "@headlessui/react";

export default function Detail() {
  const cancelButtonRef = React.useRef(null);

  const [open, setOpen] = React.useState(false);
  const loadingLength = [1, 2, 3, 4, 5];

  React.useEffect(() => {
    document.title = "Detail Video";
  });
  //   console.log(text.length);
  var router = useRouter();

  const { id } = router.query;
  //   data detail
  const [loading, setLoading] = React.useState(true);
  const [video, setVideo] = React.useState();
  async function videoDetail() {
    try {
      await getGaleri(`video/${id}`).then((result) => {
        setVideo(result.data.data[0]);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  }

  //   list video
  const [loading2, setLoading2] = React.useState(true);
  const [list, setList] = React.useState({});
  async function getList() {
    try {
      await getGaleri("video?offset=0&limit=10&type=1").then((result) => {
        setList(result.data.data);
        setTimeout(() => {
          setLoading2(false);
        }, 2000);
      });
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (router.isReady) {
      videoDetail();
    }
  }, [router.isReady]);
  //   console.log(video);
  React.useEffect(() => {
    const ac = new AbortController();

    getList();
    videoDetail();

    return () => {
      ac.abort();
    };
  }, [router]);
  return (
    <>
      <Navbar setOpen={setOpen} open={open} />
      <div className="lg:pt-32 pt-[104px] pb-20  flex lg:flex-row flex-col h-full lg:justify-between justify-center 2xl:px-16 xl:px-10 lg:px-5 px-0 lg:gap-x-10 gap-x-0">
        {!loading ? (
          <Video data={video} />
        ) : (
          <>
            <VideoLoading />
          </>
        )}
        <div className="right 2xl:w-1/4 lg:w-1/3 w-full h-full  flex flex-col lg:px-0 px-5">
          <div className="border-b-2 mb-7 border-gray-300 flex lg:hidden"></div>
          <div className="lg:space-y-2 space-y-2 ">
            {!loading2 && video ? (
              list.map((i, key) =>
                video.id === i.id ? (
                  <></>
                ) : (
                  <Card
                    data={i}
                    getList={getList}
                    setLoading={setLoading}
                    key={key}
                  />
                )
              )
            ) : (
              <>
                {loadingLength.map((i, key) => (
                  <CardLoading key={key} />
                ))}
              </>
            )}
          </div>
        </div>
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

function Video({ data }) {
  return (
    <>
      <div className="left  xl:w-3/4 lg:w-4/6 w-full h-full flex flex-col pb-20">
        <iframe
          className="xl:h-[680px] md:h-[450px] h-[280px]  pb-5"
          title="yt"
          src={data.url}
          frameBorder={1}
          allowFullScreen
        ></iframe>
        <div className="lg:px-0 px-5">
          <h1 className="text-xl font-bold pb-2">Lorem Ipsum</h1>
          <p className="text-xs">100 views • 22 August 2022</p>
          <div className="border-b-2 pt-2 border-black"></div>
          <p className="pt-10 text-sm lg:w-3/4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            soluta nulla ratione qui iure delectus provident placeat corporis
            corrupti laudantium voluptas ex non cupiditate voluptatem cumque
            amet dolorum ipsa nisi harum, possimus iusto eius aspernatur, cum
            quasi. Consequatur minima porro magnam quaerat iste a eum tenetur
            maiores quos rerum, sit odio, autem vel, quibusdam labore nulla
            veritatis blanditiis. Error accusantium voluptatem voluptatum
            perferendis totam, beatae quia soluta atque unde eaque alias
            architecto cumque. Quaerat facilis, iure voluptatum architecto ex,
            harum ad deleniti reiciendis culpa eos, nam dolore quod fuga
            pariatur debitis. Corporis harum dolore magni, corrupti labore quod
            quas placeat?
          </p>
        </div>
      </div>
    </>
  );
}

function VideoLoading() {
  return (
    <>
      <div className="right lg:w-3/4 w-full h-full flex flex-col animate-pulse pb-20">
        <div className="lg:h-[680px] h-[250px] pb-5 bg-gray-300 "></div>
        <div className="space-y-2  w-full pt-5">
          <div className="text-xs font-bold h-4 w-3/4 bg-gray-300 rounded-full"></div>
          <div className="text-xs font-bold h-4 w-1/2  bg-gray-300 rounded-full"></div>
        </div>
        <div className="border-b-2 pt-5 border-gray-400"></div>
        <div className="space-y-2  w-full pt-16">
          <div className="text-xs font-bold h-4 w-1/2 bg-gray-300 rounded-full"></div>
          <div className="text-xs font-bold h-4 w-1/3  bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </>
  );
}

function Card({ data, setLoading }) {
  const viewss = async () => {
    try {
      let respond = await PutViews(`video/${data.id}`).then((result) => {});
    } catch (error) {
      console.log(error);
    }
  };
  const text = "Lorem Ipsum dadwadsadwaasdsawasdadwa";
  const MAX_LENGTH = 27;
  const MAX_LENGTH_MOBILE = 27;

  return (
    <>
      <Link href={`/galeri/video/Detail/${data.id}`}>
        <div
          onClick={() => {
            viewss();
            setLoading(true);
          }}
          className="w-full h-[10rem] rounded-xl lg:bg-gray-100 flex cursor-pointer justify-between gap-x-0"
        >
          <img
            className="w-1/2 lg:min-w-[50%] md:min-w-[40%] min-w-[50%] right"
            src={data.thumbnail}
            alt=""
          />
          <div className="left px-5 w-full py-5 flex flex-col lg:gap-y-14 gap-y-14">
            <div className="lg:flex hidden">
              {text.length > MAX_LENGTH ? (
                <p className="font-bold text-sm text-left ">
                  {`${text.substring(0, MAX_LENGTH)} ...`}
                </p>
              ) : (
                <p className="font-bold text-sm text-left">{text}</p>
              )}
            </div>
            <p className="font-bold lg:hidden flex text-sm text-left">
              {text.length > MAX_LENGTH_MOBILE
                ? `${text.substring(0, MAX_LENGTH_MOBILE)} ...`
                : text}
            </p>
            <p className="text-xs">200 views</p>
          </div>
        </div>
      </Link>
    </>
  );
}

function CardLoading(params) {
  return (
    <>
      <div className="w-full h-[10rem] rounded-xl bg-gray-100 flex cursor-pointer justify-between gap-x-0 animate-pulse">
        <div className="right w-1/2 bg-gray-300"></div>
        <div className="space-y-2 animate-pulse  p-5 w-3/4">
          <div className="text-xs font-bold h-4 w-3/4 bg-gray-300 rounded-full"></div>
          <div className="text-xs font-bold h-4 w-1/2  bg-gray-300 rounded-full"></div>
        </div>
      </div>
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
