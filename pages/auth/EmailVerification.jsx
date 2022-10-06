import React from "react";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import { login } from "../api/restApi";

export default function EmailVer() {
  useEffect(() => {
    document.title = "Verifikasi";
  });
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();
  const [code, setcode] = useState(new Array(6).fill(""));
  const handleChange = (element, index) => {
    setcode([...code.map((d, indx) => (indx === index ? element.value : d))]);

    //Focus next input

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  console.log(code.map((e) => e).join(""));

  const handleSubmit = async (values) => {
    try {
      await login("register/activation").then((result) => {
        console.log(result);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className=" px-5 py-44 mx-auto flex justify-center ">
        <div className=" bg-white rounded-lg p-8 flex flex-col  w-1/2 mt-10  relative z-10 shadow-md border-black border-2">
          <h2 className="text-gray-900 text-2xl mb-1  title-font text-center font-bold">
            Verify your email address
          </h2>
          <p className="leading-relaxed  text-gray-600 text-center">
            We emailed you a six-digit code to arthur@email.com. Enter the code
            below to confirm your email address.
          </p>
          <form
            onSubmit={handleSubmit(code.map((e) => e).join(""))}
            className="flex flex-row justify-center mt-5 "
          >
            {code.map((i, index) => (
              <input
                key={index}
                // disabled={second <= 0 ? true : false}
                maxLength={1}
                type="text"
                value={i}
                className="h-28 w-20 m-5 font-semibold text-5xl text-center rounded-xl border-2 border-[#627AD1]"
                placeholder="0"
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select}
                autoFocus={index === 0} // add this line
              />
            ))}
          </form>
          <p className="text-s text-gray-500 mt-3 text-center">
            If you didn’t request a code, you can safely ignore this email.
          </p>
          <button className="text-white bg-indigo-500 border-0 py-2 px-6 mt-4 focus:outline-none hover:bg-indigo-600 rounded text-lg flex justify-center w-3/4">Button</button>

          <p className="text-xs text-gray-500 mt-3 text-center pt-10">
            Questions?{" "}
            <span className="text-blue-500"> We’re here to help</span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
