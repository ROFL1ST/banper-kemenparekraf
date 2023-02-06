import React from "react";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import Navbar from "../../components/navbar";
import Section from "../../components/section";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "../../components/footer";
import Router from "next/router";
import { login } from "../../api/restApi";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();
export default function Field1() {
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
  const [load, setLoad] = React.useState(false);

  const onSubmit = async (values) => {
    setLoad(true);
    try {
      await login("login/forgot_password", values).then((result) => {
        
        setLoad(false);
        if (result.data.message == "Failed") {
          setError(true);
        } else if (result.data.message == "Success") {
          setSuccess(true);
          Router.push("/auth/forgotPassword/field2")
        }
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  React.useEffect(() => {
    document.title = "Lupa Password";
  });
  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" px-5 py-44 mx-auto flex flex-col items-center justify-center "
      >
        <Section text={"Lupa Password"} />
        <div className="  p-8 flex flex-col justify-center items-center  xl:w-1/2 lg:w-3/4 sm:w-11/12 mt-10  relative z-10 ">
          <h2 className="text-gray-900 text-xl mb-5  title-font text-center font-medium">
            Lupa password?
          </h2>
          <p className="leading-relaxed text-sm  text-gray-600 text-center">
            Kami akan mengirim 6 digit kode ke alamat Email anda.
            <br className="lg:flex hidden" /> Mohon untuk mengisi Email dibawah
            untuk mengubah Password mu.
          </p>
          <div className="flex flex-col justify-center w-full lg:w-1/2 mt-5 mb-10">
            <label htmlFor="usename">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="border px-4 w-full outline-none h-9 rounded-md "
            />
            {errors.email && (
              <span className="text-red-600 font-bold text-sm">
                Please fill it with your email
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
              Router.back();
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
