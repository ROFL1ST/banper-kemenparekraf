import { Snackbar } from "@mui/material";
import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";
import MuiAlert from "@mui/material/Alert";
import Loading from "../../components/Loading";
import Router, { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgot, login } from "../../api/restApi";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const schema = yup
  .object({
    kode: yup.string().required(),
    password: yup.string().required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password Tidak Sama")
      .required("Mohon Untuk Mengisi Password Anda"),
  })
  .required();
export default function Field2() {
  const [load, setLoad] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //   snackbar
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
    setSuccess(false);
  };

  const onSubmit = async (values) => {
    setLoad(true);
    try {
      await forgot("login/update_password", values).then((result) => {
        console.log(result);
        setLoad(false);
        if (result.data.message == "Failed") {
          setError(true);
        } else if (result.data.message == "Success") {
          setSuccess(true);
          setTimeout(() => {
            Router.push("/auth/forgotPassword/success")
          }, 1000)
        }
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  return (
    <>
      <Navbar />
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className=" px-5 py-44 mx-auto flex flex-col items-center justify-center "
      >
        <Section text={"Lupa Password"} />
        <div className="  p-8 flex flex-col justify-center items-center  xl:w-1/2 lg:w-3/4 sm:w-11/12 mt-10  relative z-10 ">
          <h2 className="text-gray-900 text-xl mb-5  title-font text-center font-medium">
            Password Baru
          </h2>
          <p className="leading-relaxed text-sm  text-gray-600 text-center w-1/2">
            Kami telah mengirim 6 digit kode ke alamat Email anda.
            <br className="lg:flex hidden" /> Mohon untuk mengisi kode dibawah
            dan password baru untuk mengubah Password mu.
          </p>
          <div className="flex flex-col justify-center w-full lg:w-1/2 mt-5 mb-3">
            <label htmlFor="usename">Kode</label>
            <input
              {...register("kode", { required: true })}
              type={"text"}
              className="border px-4 w-full outline-none h-9 rounded-md "
            />
            {errors.kode && (
              <span className="text-red-600 font-bold text-sm">
                Mohon untuk mengisi kode
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center w-full lg:w-1/2 mt-5 mb-3">
            <label htmlFor="usename">password baru</label>
            <input
              {...register("password", { required: true })}
              type={"password"}
              className="border px-4 w-full outline-none h-9 rounded-md "
            />
            {errors.password && (
              <span className="text-red-600 font-bold text-sm">
                Mohon untuk mengisi password baru mu
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center w-full lg:w-1/2 mt-5 mb-10">
            <label htmlFor="usename">Konfirmasi password</label>
            <input
              {...register("passwordConfirmation", { required: true })}
              type={"password"}
              className="border px-4 w-full outline-none h-9 rounded-md "
            />
            {errors.passwordConfirmation && (
              <span className="text-red-600 font-bold text-sm">
                Password konfirmasi wajib sama
              </span>
            )}
          </div>
          <button
            type={"submit"}
            className="text-white bg-[#142b51] border-0 py-2 px-6 mt-4 focus:outline-none hover:bg-blue-900  text-lg flex justify-center w-full lg:w-1/2 mx-auto rounded-xl"
          >
            {load ? <Loading /> : "Submit"}
          </button>
          <div
            onClick={() => {
              Router.push("/auth/login");
            }}
            className="cursor-pointer flex gap-x-5 text-gray-400 mt-16 justify-center items-center hover:-translate-y-0.5 transition ease-in-out hover:text-[#142b51] font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
            <p>Kembali ke Log in</p>
          </div>
        </div>
      </form>
      <Footer />
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Error
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Berhasil
        </Alert>
      </Snackbar>
    </>
  );
}
