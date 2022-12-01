import Link from "next/link";
import { useEffect, useState, useRef, Fragment, forwardRef } from "react";
import Background from "../components/background";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Section from "../components/section";
import { useForm } from "react-hook-form";
import { login } from "../api/restApi";
import Router, { useRouter } from "next/router";
import Loading from "../components/Loading";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const schema = yup
  .object({
    email: yup.string().email(),
    password: yup.string().required(),
  })
  .required();
export default function Login() {
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = async () => {
    // await getDown(
    //   "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf"
    // );
    // await getDown(
    //   "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip"
    // );

    setRemember((current) => !current);
  };
  1;
  useEffect(() => {
    document.title = "Login";
  });
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [error, setError] = useState({ status: false, msg: "" });
  // login
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await login("login", values).then((result) => {
        setLoading(false);

        if (result.data.message == "Failed") {
          setError((s) => ({
            ...s,
            status: true,
            msg: result.data.display_message,
          }));
          if (result.data.display_message == "error system") {
            setError((s) => ({
              ...s,
              status: true,
              msg: result.data.data.data[0].message,
            }));
            setTimeout(() => {
              setError((s) => ({
                ...s,
                status: false,
                msg: "",
              }));
            }, 3000);
          }
          setTimeout(() => {
            setError((s) => ({
              ...s,
              status: false,
              msg: "",
            }));
          }, 3000);
        } else {
          if (remember) {
            localStorage.setItem("token", result.data.data.token);
          } else {
            sessionStorage.setItem("token", result.data.data.token);
          }
          Router.push("/proposal");
        }
      });
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log(error);
    }
  };

  // alert

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError((s) => ({ ...s, status: false }));
  };
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <div
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2017/05/19/06/22/desk-2325627_960_720.jpg)",
        }}
        className="bg-gray-200 w-full  bg-cover rounded-b-3xl"
      >
        <div className="bg-white w-full h-screen bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9  rounded-b-3xl">
          <Section text={"Login"} />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 2xl:w-1/2 xl:w-3/5 lg:w-3/4 sm:w-3/5 2xl:space-y-10 lg:space-y-5 space-y-3 pb-5 mx-auto"
          >
            <div className="grid gap-y-2">
              <label htmlFor="usename">Username atau Email</label>
              <input
                {...register("email", { required: true })}
                type="text"
                className="border px-4 outline-none h-9 rounded-md "
              />
              {errors.email && (
                <span className="text-red-600 font-bold text-sm">
                  Please fill it with your email
                </span>
              )}
            </div>
            <div className="grid gap-y-2">
              <label htmlFor="usename">Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                className="border px-4 outline-none h-9 rounded-md "
              />
              {errors.password && (
                <span className="text-red-600 font-bold text-sm">
                  Please fill it with your password
                </span>
              )}
            </div>

            <div className={`flex space-x-2 items-center `}>
              <input
                value={remember}
                defaultValue={false}
                onChange={handleChange}
                type="checkbox"
                name=""
                id=""
              />
              <label className="text-xs" htmlFor="remember_setting">
                Remember me
              </label>
            </div>
            <div className="flex flex-col justify-center lg:px-72">
              <button
                type="submit"
                className={`bg-blue-900 py-2 rounded-full text-white font-semibold mt-5 w-full ${
                  loading && "animate-pulse"
                }`}
              >
                {loading ? (
                  <>
                    <div className="mx-auto">
                      <Loading />
                    </div>
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <p
                className="text-xs text-red-500 md:my-9 my-5 underline cursor-pointer"
                onClick={() => {
                  Router.push("/auth/forgotPassword/field1");
                }}
              >
                Lupa password
              </p>
              <p className="text-xs">
                Belum punya akun?{" "}
                <span className="text-red-500 font-semibold underline">
                  <Link href={"/auth/register/field"}>Daftar disini</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      ></Modal>
      <Snackbar
        open={error.status}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%", fontSize: "larger" }}
        >
          {error.msg ==
          "Kami telah melakukan pembaharuan sistem, silahkan ganti password Anda" ? (
            <p>
              Kami telah melakukan pembaharuan sistem, silahkan ganti{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  Router.push("/auth/forgotPassword/field1");
                }}
              >
                password anda
              </span>
            </p>
          ) : (
            error.msg
          )}
        </Alert>
      </Snackbar>
    </>
  );
}
function Modal({ open, setOpen, cancelButtonRef }) {
  const [check, setCheck] = useState(false);

  const handleChange = async () => {
    // await getDown(
    //   "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf"
    // );
    // await getDown(
    //   "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip"
    // );

    setCheck((current) => !current);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
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
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="my-auto relative bg-white rounded-[30px] text-center overflow-hidden shadow-xl transform transition-all sm:my-8  xl:w-1/5 lg:w-1/4 md:w-2/5 sm:w-1/2 w-3/4  p-3">
                  <div className="bg-white px-4 lg:px-1  pt-5 pb-4 ">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                        <Dialog.Title
                          as="h3"
                          className="text-lg md:text-sm leading-6 pb-3 font-medium text-gray-900"
                        >
                          Terms Of Service
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm md:text-xs text-gray-500 justify-start text-start ">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Modi dignissimos dolor illum a recusandae
                            soluta error architecto? Placeat architecto vel enim
                            deleniti reprehenderit repudiandae, consequatur
                            natus delectus odit sed, vero distinctio officiis
                            necessitatibus. Corrupti, ut quo aperiam officia
                            ullam enim corporis recusandae, ad culpa illum,
                            tenetur maiores saepe consectetur exercitationem!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start px-8 lg:px-6 items-center gap-x-3 pb-5">
                    <input
                      type="checkbox"
                      id=""
                      name=""
                      defaultChecked={false}
                      value={check}
                      onChange={handleChange}
                      required
                      className="form-check-input appearance-none h-4 w-4 lg:h-3 lg:w-3 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                    />
                    <p className="font-normal  text-xs text-red-600">
                      Unduh Juknis dan Template
                    </p>
                  </div>
                  <div className="bg-gray-50 gap-x-10 px-4 py-5 lg:px-2 lg:py-3 sm:px-6 sm:flex justify-center ">
                    <button
                      type="button"
                      className="close w-full inline-flex justify-center rounded-[30px] border border-gray-300 shadow-sm px-7 lg:px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto lg:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Decline
                    </button>
                    {check ? (
                      <Downloader setOpen={setOpen} setCheck={setCheck} />
                    ) : (
                      <button
                        type="submit"
                        disabled={true}
                        className="close mt-3 sm:mt-0 md:mt-0 lg:mt-0 22xl:mt-0 2xl:mt-0 w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-7 lg:px-6 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto lg:text-sm"
                      >
                        Accept
                      </button>
                    )}
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

function Downloader({ setOpen, setCheck }) {
  const { pathname } = useRouter();

  const juknisUrl =
    "http://128.199.242.242/dashboard/assets/juknisPetunjukTeknisBantuanPemerintahTahun2022.pdf";
  const TemplateUrl =
    "http://128.199.242.242/dashboard/assets/Dokumen_Banper_TA_2022.zip";

  const handleClick = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  const handleClick2 = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  return (
    <Link href={`${pathname === "/auth/login" ? "daftar" : "auth/daftar"}`}>
      <button
        onClick={() => {
          setOpen(false);
          setCheck(false);
          handleClick(juknisUrl);
          handleClick2(TemplateUrl);
        }}
        type="submit"
        className="close mt-3 sm:mt-0 md:mt-0 lg:mt-0 22xl:mt-0 2xl:mt-0 w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-7 lg:px-6 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto lg:text-sm"
      >
        Accept
      </button>
    </Link>
  );
}
