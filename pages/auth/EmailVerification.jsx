import React from "react";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { activate } from "../api/restApi";
import Lottie from "react-lottie";
import animation1 from "../assets/lottie/1127-success.json";
import animation2 from "../assets/lottie/14651-error-animation.json";

import { Dialog, Transition } from "@headlessui/react";
import Router from "next/router";

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

  //   console.log(code.map((e) => e).join(""));

  function onPaste(event) {
    const pasted = event.clipboardData.getData("text/plain");
    setcode(pasted.split("").slice(0, code.length));
  }

  const [load, setLoad] = useState(false);
  const [nice, setNice] = useState(false);
  const [wrong, setWrong] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await activate("register/activation", {
        kode: code.map((e) => e).join(""),
      }).then((result) => {
        setLoad(false);
        console.log(result.data);
        if (result.data.message === "Success") {
          setNice(true);
          setcode(new Array(6).fill(""));
          setTimeout(() => {
            Router.push("/auth/login");
          }, 2000);
        } else {
          setWrong(true);
          setTimeout(() => {
            setWrong(false);
          }, 3000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const successOption = {
    loop: true,
    autoplay: true,
    animationData: animation1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const wrongOption = {
    loop: true,
    autoplay: true,
    animationData: animation2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const cancelButtonRef = React.useRef(null);

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className=" px-5 py-44 mx-auto flex justify-center "
      >
        <div className=" bg-white rounded-lg p-8 flex flex-col  w-1/2 mt-10  relative z-10 shadow-md border-black border-2">
          <div>
            <h2 className="text-gray-900 text-2xl mb-1  title-font text-center font-bold">
              Verify your email address
            </h2>
            <p className="leading-relaxed  text-gray-600 text-center">
              We emailed you a six-digit code to arthur@email.com. Enter the
              code below to confirm your email address.
            </p>
            <div className="flex flex-row justify-center mt-5 ">
              {code.map((i, index) => (
                <input
                  key={index}
                  // disabled={second <= 0 ? true : false}
                  maxLength={1}
                  type="text"
                  value={i}
                  onPaste={onPaste}
                  className="h-28 w-20 m-5 font-semibold text-5xl text-center rounded-xl border-2 border-[#627AD1]"
                  placeholder="0"
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select}
                  autoFocus={index === 0} // add this line
                />
              ))}
            </div>
            <p className="text-s text-gray-500 mt-3 text-center">
              If you didn’t request a code, you can safely ignore this email.
            </p>
            <button
              onClick={() => {
                setLoad(true);
              }}
              type={"submit"}
              className="text-white bg-indigo-500 border-0 py-2 px-6 mt-4 focus:outline-none hover:bg-indigo-600 rounded text-lg flex justify-center w-3/4 mx-auto"
            >
              {load ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
      <Success
        nice={nice}
        setNice={setNice}
        cancelButtonRef={cancelButtonRef}
        successOption={successOption}
      />
      <Fail
        wrong={wrong}
        setWrong={setWrong}
        cancelButtonRef={cancelButtonRef}
        wrongOption={wrongOption}
      />
      <Footer />
    </>
  );
}

function Success({ nice, setNice, cancelButtonRef, successOption }) {
  return (
    <>
      <Transition.Root show={nice} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setNice}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative bg-white rounded-[30px] text-center overflow-hidden shadow-xl transform transition-all sm:my-8  xl:w-1/5 lg:w-1/4 md:w-2/5 sm:w-1/2 w-3/4  p-10">
                  <div className="flex flex-col justify-center items-center ">
                    <Lottie
                      options={successOption}
                      width={200}
                      height={200}
                      isStopped={false}
                      isPaused={false}
                    ></Lottie>
                    <p className="text-green-600 font-bold text-xl">Success</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function Fail({ wrong, setWrong, cancelButtonRef, wrongOption }) {
  return (
    <>
      <Transition.Root show={wrong} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setWrong}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative bg-white rounded-[30px] text-center overflow-hidden shadow-xl transform transition-all sm:my-8  xl:w-1/5 lg:w-1/4 md:w-2/5 sm:w-1/2 w-3/4  p-10">
                  <div className="flex flex-col justify-center items-center ">
                    <Lottie
                      options={wrongOption}
                      width={200}
                      height={200}
                      isStopped={false}
                      isPaused={false}
                    ></Lottie>
                    <p className="text-red-600 font-bold text-xl">Wrong Code</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
