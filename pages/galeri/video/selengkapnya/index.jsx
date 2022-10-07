import axios from "axios";
import Link from "next/link";
import React from "react";
import { getGaleri } from "../../../api/restApi";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import Loading from "../loading";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

export default function Selengkapnya() {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);
  const [videoData, setVideoData] = React.useState({ data: {}, loading: true });
  async function getVideo() {
    try {
      await getGaleri("video?offset=0&limit=10").then((result) => {
        setVideoData((s) => ({ ...s, data: result.data.data, loading: false }));
      });
    } catch (error) {
      console.log(error);
      setVideoData((s) => ({ ...s, loading: true }));
    }
  }
  // console.log(videoData.data);

  React.useEffect(() => {
    const ac = new AbortController();
    getVideo();

    return () => {
      ac.abort();
    };
  }, []);
  const { data, loading } = videoData;
  return (
    <>
      <Navbar />

      <div className="pt-24 lg:px-20 px-8">
        <div className="grid xl:grid-cols-3 mb-10 gap-4  mt-10">
          {data && !loading ? (
            videoData.data.map((i, key) => <CardVideo key={key} data={i} />)
          ) : (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

function CardVideo({ data }) {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);
  const viewss = async () => {
    // const url = `http://128.199.242.242/api/video/${data.id}`;
    try {
      let respond = await PutViews(`video/${data.id}`).then((result) => result);
      console.log("berhasil");
    } catch (error) {
      console.log(error);
    }
  };

  const [kota, setKota] = React.useState({});
  const [load, setLoad] = React.useState(true);
  async function detail() {
    try {
      await getGaleri(`video/${data.id}`).then((result) => {
        setKota(result.data.data[0]);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  }

  React.useEffect(() => {
    detail();
  }, []);
  console.log(kota);

  // hover
  const [isHovering, setIsHovering] = React.useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
          viewss();
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="my-auto items-center"
      >
        <div
          className=" rounded-lg mx-auto max-h-96 min-w-full bg-no-repeat bg-cover relative"
          style={{ backgroundImage: `url(${data.thumbnail})` }}
        >
          <div
            className={` rounded-lg   xbg-black xl:p-28 md:p-20 sm:p-36 p-20   ${
              isHovering
                ? "hover:bg-gradient-to-t hover:from-black bg-black bg-opacity-25 transition ease-in-out hover:-translate-y-0.5"
                : "bg-black bg-opacity-25 transition ease-in-out "
            }`}
          >
            <div className="mx-auto flex justify-center items-center ">
              <div className="bg-white bg-opacity-25 rounded-full xl:p-5 p-2 border-white border flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="lg:w-10 lg:h-10 w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </div>
            </div>
            {isHovering && (
              <Transition show={isHovering} appear={true}>
                <Transition.Child
                  enter="transition-opacity ease-linear duration-300 "
                  enterFrom="opacity-0 "
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute justify-start lg:flex hidden flex-col bottom-10 left-10 ">
                    {!load && kota ? (
                      <p className="uppercase font-bold text-white xl:text-base lg:text-base md:text-sm text-sm truncate">
                        {kota.NamaKota}
                      </p>
                    ) : (
                      <>
                        <div className="animate-pulse">
                          <div className="text-xs font-bold h-2 w-1/4 bg-gray-500 rounded-full"></div>
                        </div>
                      </>
                    )}
                    <p className="text-blue-300">video</p>
                  </div>
                </Transition.Child>
              </Transition>
            )}
            <div className="lg:hidden absolute justify-start flex flex-col bottom-5 left-5 ">
              {!load && kota ? (
                <p className="uppercase font-bold text-white xl:text-base lg:text-base md:text-sm text-sm truncate">
                  {kota.NamaKota}
                </p>
              ) : (
                <>
                  <div className="animate-pulse">
                    <div className="text-xs font-bold h-2 w-1/4 bg-gray-500 rounded-full"></div>
                  </div>
                </>
              )}
              <p className="text-blue-300">video</p>
            </div>
          </div>
        </div>
      </div>
      <VideoModal
        data={data}
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </>
  );
}
function VideoModal({ open, setOpen, cancelButtonRef, data }) {
  return (
    <>
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
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
              <div className="lg:hidden flex absolute right-5 top-20 text-white">
                <svg
                  onClick={() => {
                    setOpen(false);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative  overflow-hidden transform transition-all lg:w-1/2 w-11/12 h-full ">
                  <CardModal data={data}></CardModal>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
function CardModal({ data }) {
  // console.log(tgl);
  return (
    <>
      <div className="my-auto items-center">
        <iframe
          className="lg:h-[500px] h-[250px] w-full"
          title="yt"
          src={data.url}
          frameBorder={1}
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
