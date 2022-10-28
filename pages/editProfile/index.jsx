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
import Loading from "../components/Loading";

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
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });
  // getData user
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState([]);
  const [error, setError] = useState({ msg: "", status: false });
  const getData = async (value) => {
    try {
      await getPropose("user", value).then((result) => {
        setUser(result.data.data);
        setLoading(false);
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
        // setLoading(false);
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
      <Section text={"Edit Profile"} />

      <>
        <Background>
          <Section text={"Edit Profile"}></Section>
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

                <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-5 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
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
                <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-5 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
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

                <div className="  border-10 border-b-orange-600 ">
                  <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-5 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
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
                  <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-5 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
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

                  <div className="flex pb-5 lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-5 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                    <div
                      onClick={() => {
                        Router.push("/editProfile/subsektor");
                      }}
                      className="form-select form-select-sm appearance-none  w-full px-3
    py-3  text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat justify-between
    border border-solid border-gray-300 rounded  transition ease-in-out   m-0 flex gap-x-5 items-center cursor-pointer hover:text-[#4371f1]"
                    >
                      Edit Subsektor{" "}
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
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </div>
                    <div
                      onClick={() => {
                        Router.push("/editProfile/password");
                      }}
                      className="form-select form-select-sm appearance-none  w-full px-3
                      py-3  text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat justify-between
                      border border-solid border-gray-300 rounded  transition ease-in-out   m-0 flex gap-x-5 items-center cursor-pointer hover:text-[#4371f1]"
                    >
                      Edit Password{" "}
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
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </div>
                  </div>
                 <div className="sm:px-0 px-5">
                 <button className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white md:px-28 px-12 lg:w-auto w-full justify-center mt-5 rounded-xl text-xl py-3">
                    Edit
                  </button>
                 </div>
                </div>
              </form>
            ))
          ) : (
            <>
              <div role="status" className="flex justify-center items-center p-60">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </>
          )}
        </Background>
        <Footer />
      </>
    </>
  );
}
