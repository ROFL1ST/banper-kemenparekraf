import Link from "next/link";
import { useRouter } from "next/router";
import MenuBerita from "./menuBerita";
import MenuProvinsi from "./menuProvinsi";
import MenuSubsector from "./menuSubsector";

export default function Menu({ getData, setLoading, data }) {
  const { query } = useRouter();
  const { sort, type } = query;

  return (
    <div className="pt-28">
      <div className="h-full w-full bg-white shadow-sm py-5">
        <div className="flex space-x-10 justify-center">
          <Link href={`/berita?type=berita&sort=${sort}`}>
            <button
              onClick={() => {
                setLoading(true);
              }}
              className={`${
                type === undefined || type === "berita"
                  ? "text-xl text-blue-900 font-semibold underline underline-offset-8"
                  : "text-xl"
              }`}
            >
              Berita
            </button>
          </Link>
          <Link href={`/berita?type=subsector&sort=${sort}&sub_id=1`}>
            <button
              onClick={() => {
                // setLoading(true);
                getData(`${sort}`, "1");
              }}
              className={`${
                type === "subsector"
                  ? "text-xl text-blue-900 font-semibold underline underline-offset-8"
                  : "text-xl"
              }`}
            >
              Subsector
            </button>
          </Link>
          <Link href={`/berita?type=provinsi&sort=${sort}&prov_id=11`}>
            <button
              onClick={() => {
                // setLoading(true);
                getData("terbaru", ``, `11`);
              }}
              className={`${
                type === "provinsi"
                  ? "text-xl text-blue-900 font-semibold underline underline-offset-8"
                  : "text-xl"
              }`}
            >
              Provinsi
            </button>
          </Link>
        </div>
        <div>
          {" "}
          {type === "berita" ? (
            <MenuBerita getData={getData} data={data} setLoading={setLoading} />
          ) : type === "subsector" ? (
            <MenuSubsector getData={getData} setLoading={setLoading} />
          ) : (
            <MenuProvinsi getData={getData} setLoading={setLoading} />
          )}
        </div>
      </div>
    </div>
  );
}
