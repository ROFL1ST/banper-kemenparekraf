/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import { getGaleri, PutViews } from "../../../api/restApi";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";

export default function Detail() {
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
      });
    } catch (error) {
      console.log(error);
    }
  }

  //   list video
  const [list, setList] = React.useState({});
  async function getList() {
    try {
      await getGaleri("video?offset=0&limit=10&type=1").then((result) => {
        setList(result.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
          <div className="space-y-5 ">
            {!loading ? (
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
  const MAX_LENGTH_MOBILE = 30;

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
          <div className="left px-5 w-full py-5 flex flex-col lg:gap-y-14 gap-y-12">
            <div className="lg:flex hidden">
              {text.length > MAX_LENGTH ? (
                <p className="font-bold lg:text-sm text-xs w-11/12 ">
                  {`${text.substring(0, MAX_LENGTH)} ...`}
                </p>
              ) : (
                <p className="font-bold lg:text-sm text-xsw-11/12 ">{text}</p>
              )}
            </div>
            <p className="font-bold lg:hidden flex lg:text-sm text-xs w-11/12">
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
