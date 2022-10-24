/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getGaleri, PutViews } from "../../../api/restApi";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import { Dialog, Transition } from "@headlessui/react";
import parse from "html-react-parser";

export default function Detail() {
  const loadingLength = [1, 2, 3, 4, 5];
  const [nama, setNama] = React.useState("");

  React.useEffect(() => {
    document.title = nama;
  }, [nama]);
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
      <Navbar />
      <div className="lg:pt-32 pt-[104px] pb-20  flex lg:flex-row flex-col h-full lg:justify-between justify-center 2xl:px-16 xl:px-10 lg:px-5 px-0 lg:gap-x-10 gap-x-0">
        {!loading ? (
          <Video data={video} setNama={setNama} />
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
                    setLoading2={setLoading2}
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
    </>
  );
}

function Video({ data, setNama }) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const judul = data.NamaKota.toLowerCase();

  React.useEffect(() => {
    setNama(data.NamaKota.toLowerCase());
  }, [data]);
  return (
    <>
      <div className="left  xl:w-3/4 lg:w-4/6 w-full h-full flex flex-col pb-20">
        <iframe
          className="xl:h-[680px] md:h-[450px] h-[280px]  pb-5"
          title="yt"
          src={data.url + "?autoplay=1"}
          frameBorder={1}
        ></iframe>
        <div className="lg:px-0 px-5">
          <h1 className="text-xl font-bold pb-2 capitalize">{judul}</h1>
          <p className="text-xs">
            {data.views} views • {formatter.format(Date.parse(data.CreatedAt))}
          </p>
          <div className="border-b-2 pt-2 border-black"></div>
          <p className="pt-10 text-sm lg:w-3/4">
            {data ? <Isi data={data.description}></Isi> : <></>}
          </p>
        </div>
      </div>
    </>
  );
}

function Isi(data) {
  const reactElement = parse(`${data.data}`);
  return reactElement;
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

function Card({ data, setLoading, setLoading2 }) {
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

  //   data detail
  const [load, setLoad] = React.useState(true);
  const [video, setVideo] = React.useState();
  const [judul, setJudul] = React.useState("");
  async function videoDetail() {
    try {
      await getGaleri(`video/${data.id}`).then((result) => {
        setVideo(result.data.data[0]);
        setTimeout(() => {
          setLoad(false);
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    videoDetail();
    if (!load) {
      setJudul(video.NamaKota.toLowerCase());
    }
  }, []);
  return (
    <>
      <Link href={`/galeri/video/Detail/${data.id}`}>
        <div
          onClick={() => {
            viewss();
            setLoading(true);
            setLoading2(true);
          }}
          className="w-full h-[10rem] rounded-xl lg:bg-gray-100 flex cursor-pointer justify-between gap-x-0"
        >
          <img
            className="w-1/2 lg:min-w-[50%] md:min-w-[40%] min-w-[50%] right"
            src={data.thumbnail}
            alt=""
          />
          {!load ? (
            <div className="left px-5 w-full py-5 flex flex-col lg:gap-y-20 gap-y-16">
              <div className="lg:flex hidden">
                {video.NamaKota.length > MAX_LENGTH ? (
                  <p className="font-bold text-sm text-left capitalize">
                    {`${video.NamaKota.substring(0, MAX_LENGTH)} ...`}
                  </p>
                ) : (
                  <p className="font-bold text-sm text-left capitalize">
                    {video.NamaKota}
                  </p>
                )}
              </div>
              <p className="font-bold lg:hidden flex text-sm text-left capitalize">
                {video.NamaKota.length > MAX_LENGTH_MOBILE
                  ? `${video.NamaKota.substring(0, MAX_LENGTH_MOBILE)} ...`
                  : video.NamaKota}
              </p>
              <p className="text-xs">{video.views} views</p>
            </div>
          ) : (
            <>
              <div className="space-y-2 animate-pulse  p-5 w-3/4">
                <div className="text-xs font-bold h-4 w-3/4 bg-gray-300 rounded-full"></div>
                <div className="text-xs font-bold h-4 w-1/2  bg-gray-300 rounded-full"></div>
              </div>
            </>
          )}
        </div>
      </Link>
    </>
  );
}

function CardLoading() {
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
