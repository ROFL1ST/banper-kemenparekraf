import { useEffect } from "react";
import { useState } from "react";
import { getGaleri } from "../../api/restApi";

export default function Galeri() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  async function imageList() {
    try {
      await getGaleri("gallery?offset=0&limit=3").then((result) => {
        setImages(result.data.data);
      });
    } catch (er) {
      console.log(er);
    }
  }
  async function videoList() {
    try {
      await getGaleri("video?offset=0&limit=3").then((result) => {
        setVideos(result.data.data);
      });
    } catch (er) {
      console.log(er);
    }
  }

  console.log(videos);
  useEffect(() => {
    imageList();
    videoList();
  }, []);

  return (
    <div className="grid xl:grid-cols-4 mb-10 gap-4 mt-10">
      {/* foto */}
      {images?.map((i, key) => (
        <div
          style={{ backgroundImage: `url(${i.images[0].images})` }}
          key={key}
          className={`${
            key === 0 && "col-span-2"
          } bg-gray-300 h-64 w-full bg-cover`}
        >
          <div className="bg-gradient-to-t from-black w-full h-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold text-white xl:text-base lg:text-base md:text-sm text-sm truncate">
              {i.title}
            </p>
          </div>
        </div>
      ))}
      {/* foto */}

      {/* video */}
      {videos?.map((i, vid) => (
        <div
          key={vid}
          style={{ backgroundImage: `url(${i.thumbnail})` }}
          className={`${
            vid === 2 && "col-span-2"
          } bg-gray-300 h-64 w-full bg-cover`}
        >
          <div className="bg-gradient-to-t from-black w-full h-full flex flex-col justify-end p-7">
            <p className="uppercase font-bold text-white xl:text-base lg:text-base md:text-sm text-sm truncate">
              Lorem Ipsum
            </p>
            <p className="text-blue-300">video</p>
          </div>
        </div>
      ))}
      {/* video */}
    </div>
  );
}
