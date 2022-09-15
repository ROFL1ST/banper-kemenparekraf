import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Background from "../components/background";
import Footer from "../components/footer";
import Modal from "../components/modal";
import Navbar from "../components/navbar";
import Section from "../components/section";
import { useForm } from "react-hook-form";
import { login } from "../api/restApi";
import Router from "next/router";
export default function Login() {
  const [remember, setRemember] = useState(false);

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
  // login
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await login("authentication", values).then((result) => {
        console.log(result);
        if (remember) {
          localStorage.setItem("token", result.data.data.token);
        } else {
          sessionStorage.setItem("token", result.data.data.token);
        }
        Router.push("/proposal");
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <Background>
        {" "}
        <Section text={"Login"} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 2xl:w-1/2 xl:w-3/5 lg:w-3/4 sm:w-3/5 2xl:space-y-10 lg:space-y-5 space-y-3  mx-auto"
        >
          <div className="grid gap-y-2">
            <label htmlFor="usename">Username atau Email</label>
            <input
              {...register("email", { required: true })}
              type="text"
              className="border px-4 outline-none h-9 rounded-md "
            />
            {errors.email && (
              <span className="text-red-600 font-bold">
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
              <span className="text-red-600 font-bold">
                Please fill it with your password
              </span>
            )}
          </div>
          <div className="flex space-x-2 items-center mt-5">
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
              className="bg-blue-900 py-2 rounded-full text-white font-semibold mt-5 w-full"
            >
              Login
            </button>

            <p className="text-xs text-red-500 md:my-9 my-5">Lupa password</p>
            <p className="text-xs">
              Belum punya akun?{" "}
              <span className="text-red-500 font-semibold underline">
                <Link href={"/auth/daftar"}>Daftar disini</Link>
              </span>
            </p>
          </div>
        </form>
      </Background>
      <Footer />
      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      ></Modal>
    </>
  );
}
