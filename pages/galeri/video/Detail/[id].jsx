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
      <div className="pt-32 pb-20  flex lg:flex-row flex-col h-full lg:justify-between justify-center lg:px-16 px-5 gap-x-10">
        {!loading ? (
          <Video data={video} />
        ) : (
          <>
            <VideoLoading />
          </>
        )}
        <div className="left lg:w-1/4 w-full h-full  flex flex-col">
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
  console.log(data);
  return (
    <>
      <div className="right lg:w-3/4 w-full h-full flex flex-col pb-20">
        <iframe
          className="lg:h-[680px] h-[450px]  pb-5"
          title="yt"
          src={data.url}
          frameBorder={1}
          allowFullScreen
        ></iframe>
        <h1 className="text-xl font-bold pb-2">Lorem Ipsum</h1>
        <p className="text-xs">100 views • 22 August 2022</p>
        <div className="border-b-2 pt-2 border-black"></div>
        <p className="pt-10 text-sm w-3/4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          soluta nulla ratione qui iure delectus provident placeat corporis
          corrupti laudantium voluptas ex non cupiditate voluptatem cumque amet
          dolorum ipsa nisi harum, possimus iusto eius aspernatur, cum quasi.
          Consequatur minima porro magnam quaerat iste a eum tenetur maiores
          quos rerum, sit odio, autem vel, quibusdam labore nulla veritatis
          blanditiis. Error accusantium voluptatem voluptatum perferendis totam,
          beatae quia soluta atque unde eaque alias architecto cumque. Quaerat
          facilis, iure voluptatum architecto ex, harum ad deleniti reiciendis
          culpa eos, nam dolore quod fuga pariatur debitis. Corporis harum
          dolore magni, corrupti labore quod quas placeat?
        </p>
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
  return (
    <>
      <Link href={`/galeri/video/Detail/${data.id}`}>
        <div
          onClick={() => {
            viewss();
            setLoading(true);
          }}
          className="w-full h-[9rem] rounded-xl bg-gray-100 flex cursor-pointer justify-between gap-x-0"
        >
          <img className="w-1/2 right" src={data.thumbnail} alt="" />
          <div className="left px-5 w-full py-5 flex flex-col lg:gap-y-16 gap-y-10">
            <div className="lg:flex hidden">
              {text.length > MAX_LENGTH ? (
                <h3 className="font-bold text-sm w-11/12 ">
                  {`${text.substring(0, MAX_LENGTH)} ...`}
                </h3>
              ) : (
                <h3 className="font-bold text-sm w-11/12 ">{text}</h3>
              )}
            </div>
            <h3 className="font-bold text-sm w-11/12 lg:hidden flex ">
              {text}
            </h3>
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
