import React from 'react'
import { useEffect} from "react";
import Background from "../../components/background";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";



export default function Password() {
  useEffect(() => {
    document.title = "Reset Password";
  });
  return (
    <>
      <Navbar />
      <Background>
        <Section text={"Reset Password"} />
        <form
          className="mt-10 2xl:w-1/2 xl:w-3/5 lg:w-3/4 sm:w-3/5 2xl:space-y-10 lg:space-y-5 space-y-3  mx-auto"
        >
          <div className="grid gap-y-2">
            <label>Password</label>
            <input
              type="New password"
              className="border px-4 outline-none h-9 rounded-md "
            />
          </div>
         
          <div
            className={`flex space-x-2 items-center `}
          >
          </div>
          <div className="grid gap-y-2">
            <label>Confirm password</label>
            <input
              type="password"
              className="border px-4 outline-none h-9 rounded-md "
            />
          </div>
          
          <div
            className={`flex space-x-2 items-center 
            `}
          >
          </div>
          <div className="flex flex-col justify-center lg:px-72">
          <button className="bg-blue-600 hover:bg-blue-500 capitalize font-semibold flex mx-auto text-white md:px-28 px-12 mt-5 rounded-xl text-xl py-3">
                Simpan
              </button>
          </div>
        </form>
      </Background>
      <Footer />
    </>
  );
}
