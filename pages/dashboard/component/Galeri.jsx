import { useEffect, useRef } from "react";
import { useState } from "react";
import { getGaleri } from "../../api/restApi";
import Modal from "../../galeri/foto/modal";
import VideoModal from "../../galeri/video/modal";
import GaleryLoading from "./GaleryLoading";

export default function Galeri() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function imageList() {
    try {
      await getGaleri("gallery?offset=0&limit=3").then((result) => {
        setImages(result.data.data);
        setLoading(false);
      });
    } catch (er) {
      setLoading(false);

      console.log(er);
    }
  }
  async function videoList() {
    try {
      await getGaleri("video?offset=0&limit=3").then((result) => {
        setVideos(result.data.data);
        setLoading(false);
      });
    } catch (er) {
      setLoading(false);

      console.log(er);
    }
  }

  useEffect(() => {
    imageList();
    videoList();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="grid xl:grid-cols-4 mb-10 gap-4 mt-10">
          {/* foto */}
          {images?.map((i, key) => (
            <Foto key={key} foto={key} data={i} />
          ))}
          {/* foto */}

          {/* video */}
          {videos?.map((i, vid) => (
            <Video video={i} vid={vid} key={vid} />
          ))}
          {/* video */}
        </div>
      ) : (
        <>
          <GaleryLoading />
        </>
      )}
    </>
  );
}

function Foto({ data, foto }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${data.images[0].images})` }}
        className={`${
          foto === 0 && "col-span-2"
        } bg-gray-300 xl:h-80 h-72 w-full bg-cover bg-center`}
      >
        <div
          onClick={() => {
            setOpen(true);
          }}
          className="bg-gradient-to-t from-black w-full h-full flex flex-col justify-end p-7"
        >
          <p className="uppercase font-bold text-white xl:text-base lg:text-base md:text-sm text-sm truncate">
            {data.title}
          </p>
        </div>
      </div>

      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        foto={data}
      />
    </>
  );
}

function Video({ video, vid, loading }) {
  // modal video
  const [open1, setOpen1] = useState(false);
  const cancelButtonRef = useRef(null);
  return (
    <>
      <div
        style={{ backgroundImage: `url(${video.thumbnail})` }}
        className={`${
          vid === 2 && "col-span-2"
        } bg-gray-300 xl:h-80 h-72 w-full bg-cover bg-center`}
      >
        <div className="bg-gradient-to-t from-black w-full h-full flex flex-col justify-end p-7">
          <div className="mx-auto text-white my-auto">
            <div
              onClick={() => {
                setOpen1(true);
              }}
              className="bg-white bg-opacity-25 rounded-full xl:p-5 p-2 border-white border flex justify-center items-center"
            >
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
          <p className="text-blue-300">video</p>
        </div>
      </div>
      {/* Modal Video */}
      {loading ? (
        <></>
      ) : (
        <VideoModal
          data={video}
          open={open1}
          setOpen={setOpen1}
          cancelButtonRef={cancelButtonRef}
        />
      )}
      {/* Modal Video */}
    </>
  );
}
