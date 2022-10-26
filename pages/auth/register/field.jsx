import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";
import { useForm } from "react-hook-form";
import { login } from "../../api/restApi";
import Loading from "../../components/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Router from "next/router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const RegisterSchema = Yup.object().shape({
  Email: Yup.string().email().required("Mohon Untuk Mengisi Email Anda"),
  EmailConfirmation: Yup.string()
    .oneOf([Yup.ref("Email"), null], "Email Tidak Sama")
    .required("Mohon Untuk Mengisi Email Anda"),

  password: Yup.string().required("Mohon Untuk Mengisi Password Anda"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password Tidak Sama")
    .required("Mohon Untuk Mengisi Password Anda"),
});
export default function Field1() {
  // Snackbar
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  //
  React.useEffect(() => {
    document.title = "Daftar";
  });
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterSchema) });
  const [loading, setLoading] = React.useState(false);
  const [erros, setError] = React.useState("");

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await login("register", values).then((result) => {
        setLoading(false);

        if (result.data.message == "Success") {
          Router.push(`/auth/register/Verification/${getValues("Email")}`);
          sessionStorage.setItem("emailState", getValues("Email"));
        } else {
          setError(result.data.display_message);
          setTimeout(() => {
            setOpen(true);
          }, 100);

          // alert(result.data.display_message);
        }
      });
    } catch (error) {
      console.log(error);
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
        className="bg-gray-200 w-full h-full  bg-cover rounded-b-3xl"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9  rounded-b-3xl"
        >
          <Section text={"Daftar"} />
          <div className="lg:w-1/3 md:w-1/2  flex flex-col mx-auto ">
            <div className="relative mb-10">
              <label className="leading-7 text-lg text-gray-800 font-medium ">
                *Email Komunitas
              </label>
              <input
                {...register("Email", { required: true })}
                type="text"
                className="w-full bg-white rounded border border-gray-300   text-base outline-none text-gray-700 py-1 px-3 leading-8 "
                placeholder="Masukan Email Komunitas"
              />
              {errors.Email && (
                <p className="text-red-600 font-bold text-sm">
                  Mohon Mengisi Email Anda
                </p>
              )}
            </div>
            <div className="relative mb-10">
              <label className="leading-7 text-lg text-gray-800 font-medium">
                *Ketik Ulang Email Komunitas
              </label>
              <input
                {...register("EmailConfirmation", { required: true })}
                type="text"
                className="w-full bg-white rounded border border-gray-300   text-base outline-none text-gray-700 py-1 px-3 leading-8 "
                placeholder="Ulangi Email Komunitas"
              />
              {errors.EmailConfirmation && (
                <p className="text-red-600 font-bold text-sm">
                  Email Harus Sama
                </p>
              )}
            </div>
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
                  Mohon Mengisi Password Anda
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
          <button className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto  text-white md:px-28 px-12 mt-5 rounded-xl text-xl py-3">
            {loading ? <Loading /> : "Daftar"}
          </button>
        </form>
        <Footer />
      </div>
      {/* <Footer/> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {erros}
        </Alert>
      </Snackbar>
    </>
  );
}
