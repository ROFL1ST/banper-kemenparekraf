import React from "react";
import { useEffect } from "react";
import Footer from "../../components/footer";
import Loading from "../../components/Loading";
import Navbar from "../../components/navbar";
import Section from "../../components/section";
import MuiAlert from "@mui/material/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { PostFeed } from "../../api/restApi";
import { Snackbar } from "@mui/material";
import Router from "next/router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const RegisterSchema = Yup.object().shape({
  password: Yup.string().required("Mohon Untuk Mengisi Password Anda"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password Tidak Sama")
    .required("Mohon Untuk Mengisi Password Anda"),
});
export default function Password() {
  useEffect(() => {
    document.title = "Reset Password";
  });
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setToken(localStorage.getItem("token"));
    } else {
      setToken(sessionStorage.getItem("token"));
    }
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      // alert("You need to Log In first!")

      return;
    } else {
      Router.push("/home");
    }
  }, [token]);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterSchema) });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ msg: "", status: false });

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);

    try {
      await PostFeed("user/edit_password", token, values, "put").then(
        (result) => {
          console.log(result.data);
          if (result.data.message != "Success") {
            setOpen(true);
            setError((s) => ({
              ...s,
              status: true,
              msg: result.data.display_message,
            }));
            setTimeout(() => {
              setError((s) => ({
                ...s,
                status: false,
                msg: "",
              }));
            }, 3000);
          } else {
            Router.push("/proposal");
          }
        }
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2017/05/19/06/22/desk-2325627_960_720.jpg)",
        }}
        className="bg-gray-200 w-full lg:h-screen h-full  bg-cover rounded-b-3xl"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full h-full bg-opacity-90 lg:pt-60 lg:p-0 p-60 px-9  rounded-b-3xl"
        >
          <Section text={"Edit Password"} />
          <div className="lg:w-1/3 md:w-1/2  flex flex-col mx-auto mt-10">
            <div className="relative mb-10">
              <label className="leading-7 text-lg text-gray-800 font-medium">
                *Buat Kata Sandi
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                className="w-full bg-white rounded border border-gray-300  text-base outline-none text-gray-700 py-1 px-3 leading-8 "
                placeholder="Masukan Kata Sandi"
              />
              {errors.password && (
                <p className="text-red-600 font-bold text-sm">
                  Mohon Mengisi Password Baru Anda
                </p>
              )}
            </div>
            <div className="relative mb-10">
              <label className="leading-7 text-lg text-gray-800 font-medium">
                *Ketik Ulang Kata Sandi
              </label>
              <input
                {...register("passwordConfirmation", { required: true })}
                type="password"
                className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 "
                placeholder="Ulangi kata sandi"
              />
              {errors.passwordConfirmation && (
                <p className="text-red-600 font-bold text-sm">
                  Password Konfirmasi Tidak Sama
                </p>
              )}
            </div>
          </div>
          <button
            type={"submit"}
            className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto  text-white md:px-28 px-12 mt-5 rounded-xl text-xl py-3"
          >
            {loading ? <Loading /> : "Daftar"}
          </button>
        </form>
      </div>
      <Footer />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {error.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
