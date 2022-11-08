import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Direktori() {
  React.useEffect(() => {
    document.title = "Direktori";
  });
  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="px-5 py-24 mx-auto">
          <div className="lg:w-2/3 w-full mx-auto mt-16 overflow-auto">
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
