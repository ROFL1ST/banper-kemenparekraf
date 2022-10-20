import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../../../redux/actions";

export default function MenuBerita({ getData, setLoading }) {
  const { query } = useRouter();
  const { sort, type } = query;
  const state = useSelector((state) => state.data);
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex justify-center space-x-5 mt-9">
        <button
          onClick={() => {
            dispatch(changeState({ sort: "terbaru" }));
            getData("terbaru");
          }}
          className={
            state.sort === "terbaru"
              ? "bg-blue-900 bg-opacity-80 py-1 rounded-full px-5 text-white font-semibold"
              : "bg-gray-400 py-1 rounded-full px-5 text-white "
          }
        >
          Terbaru
        </button>
        <button
          onClick={() => {
            dispatch(changeState({ sort: "trending" }));
            getData("trending");
          }}
          className={
            state.sort === "trending"
              ? "bg-blue-900 bg-opacity-80 py-1 rounded-full px-5 text-white font-semibold"
              : "bg-gray-400 py-1 rounded-full px-5 text-white "
          }
        >
          Trending
        </button>
      </div>
    </>
  );
}
