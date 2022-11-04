import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import MenuProvinsi from "../berita/menu/menuProvinsi";
import MenuSubsector from "../berita/menu/menuSubsector";

export default function Direktori() {
  React.useEffect(() => {
    document.title = "Direktori";
  });
  return (
    <>
      <Navbar />

      <div className="flex justify-center w-full h-screen">
        <section className="text-gray-600">
          <div className="px-5 pt-24  mx-auto">
            <div className=" mx-auto  mt-16 overflow-auto">
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                      NO
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Email
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Kota/Kabupaten
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Detail
                    </th>
                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                      test
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">Test</td>
                    <td className="px-4 py-3">Test</td>
                    <td className="px-4 py-3">Test</td>

                    <td className="px-4 py-3">Test</td>
                    <td className="px-4 py-3 text-lg text-gray-900">Test</td>
                  </tr>
                  <tr>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Test
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Test
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Test
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Test
                    </td>

                    <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                      Test
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Test
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Test
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Test
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Test
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                      Test
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                      Test
                    </td>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                      Test
                    </td>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                      Test
                    </td>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                      Test
                    </td>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                      test
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
       
      </div>
      <Footer />
    </>
  );
}
