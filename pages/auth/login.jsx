import Link from "next/link";
import Background from "../components/background";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Section from "../components/section";

export default function Login() {
  return (
    <>
      <Navbar />
      <Background>
        {" "}
        <Section text={"Login"} />
        <div className="mt-10 2xl:w-1/2 xl:w-3/5 lg:w-3/4 sm:w-3/5 2xl:space-y-10 lg:space-y-5 space-y-3  mx-auto">
          <div className="grid gap-y-2">
            <label htmlFor="usename">Username atau Email</label>
            <input
              type="text"
              className="border px-4 outline-none h-9 rounded-md "
            />
          </div>
          <div className="grid gap-y-2">
            <label htmlFor="usename">Password</label>
            <input
              type="password"
              className="border px-4 outline-none h-9 rounded-md "
            />
          </div>
          <div className="flex space-x-2 items-center mt-5">
            <input type="checkbox" name="" id="" />
            <label className="text-xs" htmlFor="remember_setting">
              Remember me
            </label>
          </div>
          <div className="flex flex-col justify-center lg:px-72">
            <Link href={"/proposal"}>
              <button className="bg-blue-900 py-2 rounded-full text-white font-semibold mt-5 w-full">
                Login
              </button>
            </Link>
            <p className="text-xs text-red-500 md:my-9 my-5">Lupa password</p>
            <p className="text-xs">
              Belum punya akun?{" "}
              <span className="text-red-500 font-semibold underline">
                <Link href={"/auth/daftar"}>Daftar disini</Link>
              </span>
            </p>
          </div>
        </div>
      </Background>
      <Footer />
    </>
  );
}
