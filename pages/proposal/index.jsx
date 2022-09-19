import Link from "next/link";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Section from "../components/section";
import Router, { useRouter } from "next/router";

export default function Proposal() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = React.useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      Router.push("/dashboard");
      // alert("You need to Log In first!")
    } else {
      return;
    }
  }, [token]);
  useEffect(() => {
    document.title = "Proposal";
  });
  console.log(token);
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <div
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2017/05/19/06/22/desk-2325627_960_720.jpg)",
        }}
        className="bg-gray-200 w-full h-screen  bg-cover rounded-b-3xl"
      >
        <div className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9  rounded-b-3xl">
          <Section text={"List Proposal"}></Section>
          {/* Top */}
          <div className="mt-20 md:w-3/4 mx-auto">
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
        </div>
      </div>
      <Footer />
    </>
  );
}
