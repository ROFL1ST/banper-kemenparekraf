import Link from "next/link";
import Navbar from "../components/navbar";
import Section from "../components/section";

export default function Login() {
  return (
    <>
      <Navbar />
      <div
        className="bg-gray-200 w-full h-screen bg-cover"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2017/05/19/06/22/desk-2325627_960_720.jpg)",
        }}
      >
        <div className="bg-white w-full h-full bg-opacity-90 pt-32 lg:px-64 px-9">
          <Section text={"Login"} />
          <div className="mt-10">
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
              <button className="bg-blue-900 py-2 rounded-full text-white font-semibold mt-5 w-full">
                Login
              </button>
              <p className="text-xs text-red-500 my-9">Lupa password</p>
              <p className="text-xs">
                Belum punya akun?{" "}
                <span className="text-red-500 font-semibold underline">
                  <Link href={"/auth/daftar"}>
                    Daftar disini
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
