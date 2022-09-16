import Link from "next/link";
import { useRouter } from "next/router";

export default function MenuBerita({ getData, setLoading }) {
  const { query } = useRouter();
  const { sort, type } = query;
  return (
    <>
      <div className="flex justify-center space-x-5 mt-9">
        <Link href={`/berita?type=${type}&sort=terbaru`}>
          <button
            onClick={() => {
              getData("terbaru");
              
            }}
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
            onClick={() => {
              getData("trending");
              

            }}
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
    </>
  );
}
