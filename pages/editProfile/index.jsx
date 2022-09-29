import Link from "next/link";
import { useEffect, useState } from "react";
import Background from "../components/background";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Section from "../components/section";
import { useForm } from "react-hook-form";
import { getApi, getPropose, PostFeed } from "../api/restApi";
import Router, { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const schema = yup
  .object({
    password: yup.string().required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();
export default function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  // getData user
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState([]);

  const getData = async (value) => {
    try {
      await getPropose("user", value).then((result) => {
        setUser(result.data.data);
        console.log(result.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setToken(localStorage.getItem("token"));
      getData(localStorage.getItem("token"));
    } else {
      setToken(sessionStorage.getItem("token"));
      getData(sessionStorage.getItem("token"));
    }
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      // alert("You need to Log In first!")

      return;
    } else {
      Router.push("/home");
    }
  }, [token]);

  const onSubmit = async (values) => {
    setLoad(true);
    try {
      await PostFeed("user", token, values, "put").then((result) => {
        console.log(result.data);
        console.log(values);
        if (result.data.message != "Success") {
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Edit Profile";
  });

  //   kategori
  const [kategori, setKategori] = useState([]);
  const getKateg = async () => {
    try {
      await getApi("master/kategori").then((result) => {
        setKategori(result.data.data);
        setLoading(false);
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
      <Background>
        <Section text={"Edit Profile"} />
        {!loading ? (
          user.map((i, key) => (
            <form key={key} onSubmit={handleSubmit(onSubmit)}>
              <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-5 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end pt-10">
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Nama Komunitas/ Pemerintah Daerah/ Lembaga Adat <br />
                    (sesuai Akta/Legalitas)
                  </label>
                  <input
                    {...register("NamaKomunitas", { value: i.NamaKomunitas })}
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
                    {...register("Kategori", { value: i.Kategori })}
                  >
                    {!loading ? (
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
                  <input
                    {...register("AlamatAkta", { value: i.AlamatAkta })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                    placeholder="Masukan Alamat Akta"
                  />
                </div>
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Alamat Domisili(Bisa disamakan dengan akta)
                  </label>
                  <input
                    {...register("Alamat", { value: i.Alamat })}
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
                  <input
                    {...register("Email", { value: i.Email })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                    placeholder="Masukan Email Komunitas"
                  />
                </div>
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Nomor Telepon Komunitas
                  </label>
                  <input
                    {...register("PhoneNumber", { value: i.PhoneNumber })}
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
                    {...register("Subsektor", { value: i.Subsektor })}
                  >
                    {!loading ? (
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
                    {...register("SubsektorPendukung", {
                      value: i.SubsektorPendukung,
                    })}
                  >
                    {!loading ? (
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
                    <input
                      {...register("EmailPJ", { value: i.EmailPJ })}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                      placeholder="Email Penanggung jawab"
                    />
                  </div>
                  <div className="relative flex-grow w-full">
                    <label className="leading-7 text-sm text-gray-600">
                      *Nomor Telepon Penanggung jawab
                    </label>
                    <input
                      {...register("PhonePJ", { value: i.PhonePJ })}
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
                      {...register("KotaID", {
                        value: i.KotaID,
                      })}
                    >
                      {!loading ? (
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
                    <input
                      {...register("password")}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                      placeholder="Masukan Kata Sandi"
                      type={"password"}
                    />
                    {errors.passwordConfirmation && (
                      <span className="text-red-600 font-bold text-sm">
                        {" "}
                        Password Harus Sama
                      </span>
                    )}
                  </div>
                  <div className="relative flex-grow w-full">
                    <label className="leading-7 text-sm text-gray-600">
                      *Ketik Ulang Kata Sandi
                    </label>
                    <input
                      {...register("passwordConfirmation")}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                      placeholder="Ulang Kata Sandi"
                      type={"password"}
                    />
                    {errors.passwordConfirmation && (
                      <span className="text-red-600 font-bold text-sm">
                        Password Harus Sama
                      </span>
                    )}
                  </div>
                </div>

                <button className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white md:px-28 px-12 mt-5 rounded-xl text-xl py-3">
                  Edit
                </button>
              </div>
            </form>
          ))
        ) : (
          <></>
        )}
      </Background>
      <Footer />
    </>
  );
}
