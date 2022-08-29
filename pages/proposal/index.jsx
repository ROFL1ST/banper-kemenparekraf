import Link from "next/link";
import React, { useEffect } from "react";
import Background from "../components/background";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Section from "../components/section";

export default function Proposal() {
  useEffect(() => {
    document.title = "Proposal";
  });
  return (
    <>
      <Navbar />
      <Background>
        <Section text={"List Proposal"}></Section>
        {/* Top */}
        <div className="mt-20 w-3/4 mx-auto">
          <div className="justify-between flex items-center ">
            <div>
              <Link href={"/proposal/submitPro"}>
                <button className="bg-blue-900 py-2 px-5 rounded-md text-white font-semibold w-full">
                  Buat Proposal Baru
                </button>
              </Link>
            </div>
            <div className="flex items-center gap-x-3">
              <p>Search</p>
              <input
                type="Search"
                className="border  px-3
    py-3 outline-none rounded-md placeholder:text-sm"
              />
            </div>
          </div>
        </div>
        {/* Top */}
        {/* Content */}
        <div className="flex flex-col items-center mt-10">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-bold text-gray-900 px-10 py-4 text-left"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-bold text-gray-900 px-28 py-4 text-left"
                      >
                        First
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-bold text-gray-900 px-28 py-4 text-left"
                      >
                        Last
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-bold text-gray-900 px-28 py-4 text-left"
                      >
                        Handle
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mb-5">
                    <tr className="border-b">
                      <td className="px-10 py-4 whitespace-nowrap text-sm font-normal text-gray-900 border-r border-x-2">
                        1
                      </td>
                      <td className="text-sm text-gray-900 font-light px-28 py-4 whitespace-nowrap">
                        Mark
                      </td>
                      <td className="text-sm text-gray-900 font-light px-28 py-4 whitespace-nowrap">
                        Otto
                      </td>
                      <td className="text-sm text-gray-900 font-light px-28 py-4 whitespace-nowrap">
                        @mdo
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-10 py-4 whitespace-nowrap text-sm font-normal text-gray-900 border-r border-x-2">
                        1
                      </td>
                      <td className="text-sm text-gray-900 font-light px-28 py-4 whitespace-nowrap">
                        Mark
                      </td>
                      <td className="text-sm text-gray-900 font-light px-28 py-4 whitespace-nowrap">
                        Otto
                      </td>
                      <td className="text-sm text-gray-900 font-light px-28 py-4 whitespace-nowrap">
                        @mdo
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}
      </Background>
      <Footer />
    </>
  );
}
