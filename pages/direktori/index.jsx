import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Direktori() {
  React.useEffect(() => {
    document.title = "Direktori";
  });
  const [sort, setSort] = React.useState(false);

  return (
    <>
      <Navbar />
      <div className="fixed w-full mt-[104px] flex items-center  bg-white lg:px-40 py-[19px] px-5 z-10">
        <div
          onClick={() => {
            setSort(true);
          }}
          className="flex border border-gray-400 rounded-xl px-5 py-3 gap-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
          <p className="text-md text-gray-400">Filter</p>
        </div>
      </div>  
      <section className="text-gray-600 body-font">
        <div className="px-5 py-24 mx-auto">
          <div className="lg:w-2/3 w-full mx-auto mt-32 overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">NO</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Email</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Kota/Kabupaten</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Detail</th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">Press</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3">Test</td>
                  <td className="px-4 py-3">Test</td>
                  <td className="px-4 py-3">Test</td>

                  <td className="px-4 py-3">Test</td>
                     <td class="border-t-2 border-b-2 border-gray-200 w-10">
                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Detail</button>

                  </td>

                </tr>
                <tr>
                  <td className="border-t-2 border-gray-200 px-4 py-3">Test</td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">Test</td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">Test</td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">Test</td>

                  <td class="border-t-2 border-b-2 border-gray-200 w-10">
                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Detail</button>

                  </td>

                </tr>
                <tr>
                  <td className="border-t-2 border-gray-200 px-4 py-3">Test</td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">Test</td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">Test</td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">Test</td>
                  <td class="border-t-2 border-b-2 border-gray-200 w-10">
                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Detail</button>

                  </td>

                </tr>
                <tr>
                  <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">Test</td>
                  <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">Test</td>
                  <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">Test</td>
                  <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">Test</td>
                  <td class="border-t-2 border-b-2 border-gray-200 w-10">
                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Detail</button>

                  </td>

                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}