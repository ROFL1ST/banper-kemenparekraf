import Link from "next/link";
import React from "react";
import Background from "../../components/background";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import Router, { useRouter } from "next/router";

import { getApi, getPropose, PostFeed } from "../../api/restApi";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Add() {
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState({ status: false, msg: "" });
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jenis_bantuan: 1,
    },
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await PostFeed("proposal", token, values, "post").then((result) => {
        
        if (result.data.message != "Success") {
          /*setError((s) => ({
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
          }, 3000);*/
          setTimeout(() => {
            setError((s) => ({
              ...s,
              status: false,
              msg: result.data.display_message,
            }));
            setOpen(true);
          }, 100);
        } else {
          Router.push("/proposal");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    document.title = "Submit Proposal";
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
  });

  // list bantuan
  const [jenis, setJenis] = React.useState([]);
  const [load, setLoad] = React.useState(true);
  async function detail() {
    try {
      await getApi(`master/jenis_bantuan`).then((result) => {
        setJenis(result.data.data);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  }
  React.useEffect(() => {
    detail();
  }, []);

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
        <div className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9  rounded-b-3xl">
          <Section text={"Submit Proposal"} />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 2xl:w-1/2 xl:w-3/5 lg:w-3/4 sm:w-3/5 2xl:space-y-10 lg:space-y-5 space-y-3  mx-auto"
          >
            <div className="grid gap-y-2">
              <label htmlFor="usename" className="font-semibold">
                Judul Proposal
              </label>
              <input
                {...register("Judul", { required: true })}
                type="text"
                placeholder="Masukkan Judul Proposal"
                className="border  px-3
    py-3 outline-none rounded-md placeholder:text-sm"
              />
            </div>
            {errors.Judul && (
              <span className="text-red-600 font-bold text-sm">
                Mohon Untuk Mengisi judul
              </span>
            )}
            <div className="grid gap-y-2">
              <label className="font-semibold" htmlFor="usename">
                Jenis Bantuan
              </label>
              <select
                className="form-select form-select-sm appearance-none block w-full    px-3
    py-3  text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300 rounded  transition ease-in-out   m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label=".form-select-sm example"
                {...register("jenis_bantuan", {
                  required: true,
                  valueAsNumber: true,
                })}
              >
                {!load ? (
                  jenis.map((i, key) => (
                    <option key={key} value={i.Id}>
                      {i.Nama}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>

            {error.status && (
              <span className="text-red-600 font-bold text-sm mt-5">
                {error.msg}
              </span>
            )}
            <div className="flex flex-col justify-center lg:px-72">
              <button
                type="submit"
                className="bg-blue-900 py-3 rounded-md text-white font-semibold mt-5 w-full"
              >
                Buat Proposal
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%", fontSize: "larger" }}
        >
          {error.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
