/* eslint-disable @next/next/no-img-element */
const MAX_LENGTH = 60;
import Link from "next/link";
export default function CardLoading({ data }) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return (
    <>
      <div className="bg-gray-100 w-full h-80 rounded-2xl border-blue-300 animate-pulse">
        <div className="w-full h-1/2 bg-cover rounded-t-2xl bg-center bg-gray-300"></div>
        <div className="pl-2 pr-10 py-5 space-y-6">
          <div className="text-xs font-bold h-5 bg-gray-300 rounded-full"></div>
          <div className="my-3 font-bold capitalize h-5 bg-gray-300 rounded-full"></div>
          <div className="text-xs font-bold h-5 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </>
  );
}
