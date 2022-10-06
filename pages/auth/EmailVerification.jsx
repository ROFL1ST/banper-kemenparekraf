import React from "react";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
export default function EmailVer() {
    useEffect(() => {
        document.title = "Verifikasi";
    });
    return (
        <>
            <Navbar />
            <div className=" px-5 py-24 mx-auto flex justify-center ">
                <div className=" bg-white rounded-lg p-8 flex flex-col  w-1/2 mt-10  relative z-10 shadow-md border-black border-2">
                    <h2 className="text-gray-900 text-2xl mb-1  title-font text-center font-bold">Verify your email address</h2>
                    <p className="leading-relaxed  text-gray-600 text-center">We emailed you a six-digit code to arthur@email.com.
Enter the code below to confirm your email address.</p>
                    <div className="flex flex-row justify-center mt-5 ">
                        <input type="text" className="h-28 w-20 m-5 font-semibold text-5xl text-center rounded-xl border-2 border-[#627AD1]"placeholder="0" />
                        <input type="text" className="h-28 w-20 m-5 font-semibold text-5xl text-center rounded-xl border-2 border-[#627AD1]"placeholder="0" />
                        <input type="text" className="h-28 w-20 m-5 font-semibold text-5xl text-center rounded-xl border-2 border-[#627AD1]"placeholder="0" />
                        <input type="text" className="h-28 w-20 m-5 font-semibold text-5xl text-center rounded-xl border-2 border-[#627AD1]"placeholder="0" />
                        <input type="text" className="h-28 w-20 m-5 font-semibold text-5xl text-center rounded-xl border-2 border-[#627AD1]"placeholder="0" />
                        <input type="text" className="h-28 w-20 m-5 font-semibold text-5xl text-center rounded-xl border-2 border-[#627AD1]"placeholder="0" />
                    </div>
                    <p className="text-s text-gray-500 mt-3 text-center">If you didn’t request a code, you can safely ignore this email.</p>
                    <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg flex justify-center w-3/4">Button</button>
                    <p className="text-xs text-gray-500 mt-3 text-center pt-10">Questions? <span className="text-blue-500"> We’re here to help</span></p>

                </div>
            </div>

            <Footer />
        </>
    )

}