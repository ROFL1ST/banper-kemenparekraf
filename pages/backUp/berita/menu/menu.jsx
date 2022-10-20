
import MenuBerita from "./menuBerita";

export default function MenuSort({ getData, setLoading, data }) {

  return (
    <div className="pt-28">
      <div className="h-full w-full bg-white shadow-sm py-5 drop-shadow-md">
        <div className="flex space-x-10 justify-center">
          <MenuBerita getData={getData} data={data} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
}
