import React from "react";
import { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import { activate } from "../../../api/restApi";

import MuiAlert from "@mui/material/Alert";
import Router, { useRouter } from "next/router";
import Loading from "../../../components/Loading";
import Section from "../../../components/section";
import { Snackbar } from "@mui/material";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
  const [erros, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await activate("register/activation", {
        kode: code.map((e) => e).join(""),
      }).then((result) => {
        setLoad(false);
        console.log(result.data);
        if (code.map((e) => e).join("").length < 6) {
          setWrong(true);
          setError("Mohon Untuk Mengisi Kode OTP Dengan Benar");
        } else {
          if (result.data.message === "Success") {
            setNice(true);
            setSuccess("Berhasil!, Anda akan di alihkan ke halaman form");
            setcode(new Array(6).fill(""));
            setTimeout(() => {
              Router.push(
                `/auth/register/field2?kode=${code.map((e) => e).join("")}`
              );
            }, 2000);
          } else {
            setWrong(true);
            setError("Kode OTP Yang Anda Masukkan Salah");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const successOption = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animation1,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  // const wrongOption = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animation2,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  const cancelButtonRef = React.useRef(null);
  var router = useRouter();

  const { email } = router.query;
  // pop
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setWrong(false);
    setNice(false);
  };
  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className=" px-5 py-44 mx-auto flex flex-col items-center justify-center "
      >
        <Section text={"Verifikasi"} />
        <div className="  p-8 flex flex-col  xl:w-1/2 lg:w-3/4 sm:w-11/12 mt-10  relative z-10 ">
          <div>
            <h2 className="text-gray-900 text-xl mb-5  title-font text-center font-medium">
              Verifikasi Akun Email Anda
            </h2>
            <p className="leading-relaxed text-sm  text-gray-600 text-center">
              Kami telah mengirim 6 digit kode ke {email}.
              <br className="lg:flex hidden" /> Mohon untuk mengisi kode dibawah
              untuk mengkonfirmasi Alamat Email mu.
            </p>
            <div className="flex flex-row justify-center mt-5 mb-10">
              {code.map((i, index) => (
                <input
                  key={index}
                  // disabled={second <= 0 ? true : false}
                  maxLength={1}
                  type="text"
                  value={i}
                  onPaste={onPaste}
                  className="2xl:h-14  lg:w-16 h-16 2xl:w-14 w-14 2xl:m-3 lg:m-3 m-2 font-semibold lg:text-2xl text-xl text-center lg:rounded-xl rounded-lg border-2 border-[#627AD1]"
                  placeholder="__"
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select}
                  autoFocus={index === 0} // add this line
                />
              ))}
            </div>

            <button
              onClick={() => {
                setLoad(true);
              }}
              type={"submit"}
              className="text-white bg-[#142b51] border-0 py-2 px-6 mt-4 focus:outline-none hover:bg-blue-900  text-lg flex justify-center w-1/2 mx-auto rounded-xl"
            >
              {load ? <Loading /> : nice ? "Success" : "submit"}
            </button>
          </div>
        </div>
      </form>

      <Footer />
      <Snackbar open={wrong} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {erros}
        </Alert>
      </Snackbar>
      <Snackbar open={nice} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
}
