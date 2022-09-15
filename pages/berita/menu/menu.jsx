import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import MenuBerita from "./menuBerita";
import MenuProvinsi from "./menuProvinsi";
import MenuSubsector from "./menuSubsector";

export default function Menu({ getData, setLoading }) {
  const { query } = useRouter();
  const { sort, type } = query;

  return (
    <div className="pt-28">
      <div className="h-full w-full bg-white shadow-sm py-5">
        <div className="flex space-x-10 justify-center">
          <Link href={`/berita?type=berita&sort=${sort}`}>
            <button
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
              className={`${
                type === "subsector"
                  ? "text-xl text-blue-900 font-semibold underline underline-offset-8"
                  : "text-xl"
              }`}
            >
              Subsector
            </button>
          </Link>
          <Link href={`/berita?type=provinsi&sort=${sort}`}>
            <button
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
            <MenuBerita />
          ) : type === "subsector" ? (
            <MenuSubsector getData={getData} setLoading={setLoading} />
          ) : (
            <MenuProvinsi />
          )}
        </div>
      </div>
    </div>
  );
}
