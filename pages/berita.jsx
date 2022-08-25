import Navbar from "./components/navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Berita() {
  const { query } = useRouter();
  const { sort, type } = query;

  useEffect(() => {
    document.title = "Berita";
  });
  return (
    <>
      <Navbar />
      <div className="py-24">
        <div className="h-full w-full bg-white shadow-sm py-5">
          <div className="flex space-x-10 justify-center">
            <Link href={`/berita?type=berita&sort=${sort}`}>
              <p
                className={`${
                  type === undefined || type === "berita"
                    ? "text-xl text-blue-900 font-semibold underline underline-offset-8"
                    : "text-xl"
                }`}
              >
                Berita
              </p>
            </Link>
            <Link href={`/berita?type=subsector&sort=${sort}`}>
              <p
                className={`${
                  type === "subsector"
                    ? "text-xl text-blue-900 font-semibold underline underline-offset-8"
                    : "text-xl"
                }`}
              >
                Subsector
              </p>
            </Link>
            <Link href={`/berita?type=provinsi&sort=${sort}`}>
              <p
                className={`${
                  type === "provinsi"
                    ? "text-xl text-blue-900 font-semibold underline underline-offset-8"
                    : "text-xl"
                }`}
              >
                Provinsi
              </p>
            </Link>
          </div>
          <div className="flex justify-center space-x-5 mt-9">
            <Link href={`/berita?type=${type}&sort=terbaru`}>
              <button
                className={
                  sort === "terbaru"
                    ? "bg-blue-900 bg-opacity-80 py-1 rounded-full px-5 text-white font-semibold"
                    : "bg-gray-400 py-1 rounded-full px-5 text-white "
                }
              >
                Terbaru
              </button>
            </Link>
            <Link href={`/berita?type=${type}&sort=trending`}>
              <button
                className={
                  sort === "trending"
                    ? "bg-blue-900 bg-opacity-80 py-1 rounded-full px-5 text-white font-semibold"
                    : "bg-gray-400 py-1 rounded-full px-5 text-white "
                }
              >
                Trending
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
