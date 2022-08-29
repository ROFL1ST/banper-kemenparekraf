import Link from "next/link";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
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
          <div className="md:justify-between flex md:flex-row flex-col gap-y-10 pb-5  md:items-center">
            <div>
              <Link href={"/proposal/submit-proposal"}>
                <button className="bg-blue-900 py-2 px-5 rounded-md text-white font-semibold w-full">
                  Buat Proposal Baru
                </button>
              </Link>
            </div>
            <div className="flex md:flex-row flex-col md:items-center items-start gap-x-3">
              <p>Search</p>
              <input
                type="Search"
                className="border px-3 py-3 outline-none rounded-md placeholder:text-sm"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="capitalize font-bold text-blue-900">
                    no
                  </TableCell>
                  <TableCell className="capitalize font-bold text-blue-900">
                    judul
                  </TableCell>
                  <TableCell className="capitalize font-bold text-blue-900">
                    jenis bantuan
                  </TableCell>
                  <TableCell className="capitalize font-bold text-blue-900">
                    status
                  </TableCell>
                  <TableCell className="capitalize font-bold text-blue-900">
                    actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>bantuan sosial</TableCell>
                  <TableCell>Sarana Ruang Aktif</TableCell>
                  <TableCell>Belum Lengkap</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={"/proposal/submit-document"}>
                        <div className="bg-blue-200 flex justify-center py-2 rounded-md px-5">
                          <p className="text-blue-900">Submit Dokumen</p>
                        </div>
                      </Link>
                      <button className="bg-red-600 text-white rounded-md px-5 py-1.5">
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        {/* Top */}
      </Background>
      <Footer />
    </>
  );
}
