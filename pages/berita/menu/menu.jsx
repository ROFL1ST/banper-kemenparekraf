import Link from "next/link";
import { useRouter } from "next/router";
import MenuBerita from "./menuBerita";
import MenuProvinsi from "./menuProvinsi";
import MenuSubsector from "./menuSubsector";

export default function MenuSort({ getData, setLoading, data }) {
  const { query } = useRouter();
  const { sort, type } = query;

  return (
    <div className="pt-28">
      <div className="h-full w-full bg-white shadow-sm py-5">
        <div className="flex space-x-10 justify-center">
          <MenuBerita getData={getData} data={data} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
}
