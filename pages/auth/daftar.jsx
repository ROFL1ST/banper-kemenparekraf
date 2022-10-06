import Link from "next/link";
import { useEffect, useState } from "react";
import Background from "../components/background";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Section from "../components/section";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getApi, login } from "../api/restApi";
import Router from "next/router";
export default function Daftar() {
  useEffect(() => {
    document.title = "Daftar";
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [erros, setError] = useState("");
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await login("register", values).then((result) => {
        console.log(result.data);
        if (result.data.message == "Success") {
          Router.push("/auth/EmailVerification");
        } else {
          setError(result.data.display_message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [load, setLoad] = useState(true);

  //   kategori
  const [kategori, setKategori] = useState([]);
  const getKateg = async () => {
    try {
      await getApi("master/kategori").then((result) => {
        setKategori(result.data.data);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   sub
  const [sub, setSub] = useState([]);
  const getSub = async () => {
    try {
      await getApi("master/subsektor").then((result) => {
        setSub(result.data.data);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // kota
  const [kota, setKota] = useState([]);
  const getKota = async () => {
    try {
      await getApi("master/kota").then((result) => {
        setKota(result.data.data);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKateg();
    getSub();
    getKota();
  }, []);

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
        <div className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9  rounded-b-3xl">
          <Section text={"Daftar"} />
          <form className="mb-20" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-5 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end pt-10">
              <div className="relative flex-grow w-full">
                <label className="leading-7 text-sm text-gray-600">
                  *Nama Komunitas/ Pemerintah Daerah/ Lembaga Adat <br />
                  (sesuai Akta/Legalitas)
                </label>
                {errors.NamaKomunitas && (
                  <p className="text-red-600 font-bold text-sm">
                    Mohon Mengisi Nama Komunitas
                  </p>
                )}
                <input
                  {...register("NamaKomunitas", { required: true })}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                  placeholder="Masukan Nama Komunitas/Pemerintah Daerah/Lembaga"
                />
              </div>
              <div className="relative flex-grow w-full">
                <label className="leading-7 text-sm text-gray-600">
                  *Kategori Pengusul
                </label>
                <select
                  className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
    py-3  text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300 rounded  transition ease-in-out   m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name=""
                  id=""
                  {...register("Kategori", { required: true })}
                >
                  {!load ? (
                    kategori.map((i, key) => (
                      <option key={key} value={i.Id}>
                        {i.Nama}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
            </div>

            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <label className="leading-7 text-sm text-gray-600">
                  *Alamat Akta
                </label>
                {errors.AlamatAkta && (
                  <p className="text-red-600 font-bold text-sm">
                    Mohon Mengisi Alamat Akta
                  </p>
                )}
                <input
                  {...register("AlamatAkta", { required: true })}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                  placeholder="Masukan Alamat Akta"
                />
              </div>
              <div className="relative flex-grow w-full">
                <label className="leading-7 text-sm text-gray-600">
                  *Alamat Domisili(Bisa disamakan dengan akta)
                </label>
                {errors.Alamat && (
                  <p className="text-red-600 font-bold text-sm">
                    Mohon Mengisi Alamat Domisili
                  </p>
                )}
                <input
                  {...register("Alamat", { required: true })}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                  placeholder=" Masukan Alamat Domisili"
                />
              </div>
            </div>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <label className="leading-7 text-sm text-gray-600">
                  *Email Komunitas
                </label>
                {errors.Email && (
                  <p className="text-red-600 font-bold text-sm">
                    Mohon Mengisi Email Komunitas
                  </p>
                )}
                <input
                  {...register("Email", { required: true })}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                  placeholder="Masukan Email Komunitas"
                />
              </div>
              <div className="relative flex-grow w-full">
                <label className="leading-7 text-sm text-gray-600">
                  *Nomor Telepon Komunitas
                </label>
                {errors.PhoneNumber && (
                  <p className="text-red-600 font-bold text-sm">
                    Mohon Mengisi Nomor Telepon Komunitas
                  </p>
                )}
                <input
                  {...register("PhoneNumber", { required: true })}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                  placeholder="Nomor Telepon Komunitas"
                />
              </div>
            </div>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <label className="leading-7 text-sm text-gray-600">
                  *Subsektor Utama
                </label>
                <select
                  className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
    py-3  text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300 rounded  transition ease-in-out   m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name=""
                  id=""
                  {...register("Subsektor", { required: true })}
                >
                  {!load ? (
                    sub.map((i, key) => (
                      <option key={key} value={i.Id}>
                        {i.Nama}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
              <div className="relative flex-grow w-full">
                <label className="leading-7 text-sm text-gray-600">
                  *Subsektor Pendukung
                </label>
                <select
                  className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
    py-3  text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300 rounded  transition ease-in-out   m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name=""
                  id=""
                  {...register("SubsektorPendukung", { required: true })}
                >
                  {!load ? (
                    sub.map((i, key) => (
                      <option key={key} value={i.Id}>
                        {i.Nama}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
            </div>
            <div className="  border-10 border-b-orange-600 ">
              <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Email Penanggung jawab
                  </label>
                  {errors.EmailPJ && (
                    <p className="text-red-600 font-bold text-sm">
                      Mohon Mengisi Email Penanggung jawab
                    </p>
                  )}
                  <input
                    {...register("EmailPJ", { required: true })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                    placeholder="Email Penanggung jawab"
                  />
                </div>
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Nomor Telepon Penanggung jawab
                  </label>
                  {errors.PhonePJ && (
                    <p className="text-red-600 font-bold text-sm">
                      Mohon Mengisi Nomor Telepon Penanggung jawab
                    </p>
                  )}
                  <input
                    {...register("PhonePJ", { required: true })}
                    type={"number"}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                    placeholder="Masukan Nomor Telepon Penanggung jawab"
                  />
                </div>
              </div>
              <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Kota
                  </label>
                  <select
                    className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
    py-3  text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300 rounded  transition ease-in-out   m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name=""
                    id=""
                    {...register("KotaID", { required: true })}
                  >
                    {!load ? (
                      kota.map((i, key) => (
                        <option key={key} value={i.Id}>
                          {i.NamaKota}
                        </option>
                      ))
                    ) : (
                      <></>
                    )}
                  </select>
                </div>
              </div>

              <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Buat Kata Sandi
                  </label>
                  {errors.password && (
                    <p className="text-red-600 font-bold text-sm">
                      Mohon Mengisi Kata Sandi
                    </p>
                  )}
                  <input
                    {...register("password", { required: true })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                    placeholder="Masukan Kata Sandi"
                    type={"password"}
                  />
                </div>
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Ketik Ulang Kata Sandi
                  </label>
                  {errors.passwordConfirmation && (
                    <span className="text-red-600 font-bold text-sm px-5">
                      Password Harus Sama
                    </span>
                  )}
                  <input
                    {...register("passwordConfirmation", { required: true })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                    placeholder="Ulang Kata Sandi"
                    type={"password"}
                  />
                </div>
              </div>
              {erros && (
                <p className="text-red-600 font-bold text-sm px-5">{erros}</p>
              )}
              <button
                type={"submit"}
                className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white md:px-28 px-12 mt-5 rounded-xl text-xl py-3"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
