import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";
import { useForm } from "react-hook-form";
import { getApi, login } from "../../api/restApi";
import { useRouter } from "next/router";
import Router from "next/router";
import Loading from "../../components/Loading";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Field2() {
  const { query } = useRouter();
  const { kode } = query;
  React.useEffect(() => {
    document.title = "Formulir";
    if (kode == undefined) {
      Router.push("/home");
    } else {
      return;
    }
  });

  console.log(kode);
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      kode: kode,
    },
  });

  //   alert
  const [success, setSuccess] = React.useState(false);

  const [erros, setError] = React.useState("");
  const [wrong, setWrong] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setWrong(false);
  };

  //

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await login("register/update_formulir", values).then((result) => {
        setLoading(false);

        console.log(result.data);
        if (result.data.message == "Success") {
          setSuccess(true);
          Router.push(`/auth/register/field3`);
        } else {
          setError(result.data.display_message);
          setWrong(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   getdata
  const [load, setLoad] = React.useState(true);

  //   kategori
  const [kategori, setKategori] = React.useState([]);
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
  // kota
  const [kota, setKota] = React.useState([]);
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

  React.useEffect(() => {
    getKateg();

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
          <Section text={"Formulir"} />
          <form onSubmit={handleSubmit(onSubmit)} className="mb-20">
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <label className="leading-7 text-sm text-gray-600">
                  *Nama Komunitas/ Pemerintah Daerah/Lembaga Adat <br /> (sesuai
                  akta/legalitas)
                </label>
                {errors.NamaKomunitas && (
                  <p className="text-red-600 font-bold text-sm">
                    Mohon Mengisi Nama Komunitas
                  </p>
                )}
                <input
                  {...register("NamaKomunitas", { required: true })}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                  placeholder="Nama Komunitas/ Pemerintah Daerah/Lembaga"
                />
              </div>
              <div className="relative flex-grow w-full">
                <label className="leading-7 text-sm text-gray-600">
                  *Kategori Pengusul
                </label>
                {errors.Kategori && (
                  <p className="text-red-600 font-bold text-sm">
                    Mohon Memilih Kategori Pengusul
                  </p>
                )}
                <select
                  className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
    py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300 rounded  transition ease-in-out   m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name=""
                  id=""
                  {...register("Kategori", { required: true })}
                >
                  <option value={""} defaultValue={true}>
                    Pilih Kategori Pengusul
                  </option>
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
                  *Kabupaten/Kota
                </label>
                {errors.KotaID && (
                  <p className="text-red-600 font-bold text-sm">
                    Mohon Memilih Kota
                  </p>
                )}
                <select
                  className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
    py-2.5  text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300 rounded  transition ease-in-out   m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name=""
                  id=""
                  {...register("KotaID", { required: true })}
                >
                  <option value={""} defaultValue={true}>
                    Pilih Kota
                  </option>

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
              <div className="relative flex-grow w-full">
                <label className="leading-7 text-sm text-gray-600">
                  *Nomor Telepon Komunitas
                </label>

                <br />
                {errors.PhoneNumber && (
                  <p className="text-red-600 font-bold text-sm">
                    Mohon Mengisi Nomor Telepon Komunitas
                  </p>
                )}
                <input
                  {...register("PhoneNumber", { required: true })}
                  type={"number"}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                  placeholder="Masukan Nomor Telepon Penanggung jawab"
                />
              </div>
            </div>

            <div className="  border-10 border-b-orange-600 ">
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
                  <textarea
                    {...register("AlamatAkta", { required: true })}
                    rows="2"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                    placeholder="Masukan Alamat akta"
                  />
                </div>
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Alamat Domisili (Bisa disamakan dengan akta)
                  </label>
                  {errors.Alamat && (
                    <p className="text-red-600 font-bold text-sm">
                      Mohon Mengisi Alamat Domisili
                    </p>
                  )}
                  <textarea
                    {...register("Alamat", { required: true })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                    placeholder="Masukan Alamat domisili"
                    rows="2"
                  />
                </div>
              </div>
              <div className="flex lg:w-2/3 2/3 sm:flex-row flex-row mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end"></div>
              <div className=" border-b-yellow-400 border-b-2 h-4 lg:w-2/3 w-11/12 mx-auto m-10 "></div>
              <div className="flex lg:w-2/3 w-full sm:flex-col flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Nama Ketua/penangggung jawab
                  </label>

                  <br />
                  {errors.Alamat && (
                    <p className="text-red-600 font-bold text-sm">
                      Mohon Mengisi Nama Ketua/penangggung jawab
                    </p>
                  )}
                  <input
                    {...register("Nama", { required: true })}
                    type={"text"}
                    className="lg:w-1/2 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                    placeholder="Masukan Nama"
                  />
                </div>
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Nomor Hp Penangggung jawab
                  </label>
                  <br />
                  {errors.PhonePJ && (
                    <p className="text-red-600 font-bold text-sm">
                      Mohon Mengisi Nomor Telepon Penanggung jawab
                    </p>
                  )}
                  <input
                    {...register("PhonePJ", { required: true })}
                    type={"number"}
                    className="lg:w-1/2 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                    placeholder="Masukan Nomor Telepon Penanggung jawab"
                  />
                </div>
                <div className="relative flex-grow w-full">
                  <label className="leading-7 text-sm text-gray-600">
                    *Email Penanggung jawab
                  </label>
                  <br />
                  {errors.EmailPJ && (
                    <p className="text-red-600 font-bold text-sm">
                      Mohon Mengisi Email Penanggung jawab
                    </p>
                  )}
                  <input
                    {...register("EmailPJ", { required: true })}
                    type={"email"}
                    className="lg:w-1/2 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                    placeholder="Masukan Email Penanggung jawab"
                  />
                </div>
              </div>
              <button className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white md:px-28 px-12 mt-5 rounded-xl text-xl py-3">
                {loading ? <Loading /> : "Selanjutnya"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer/> */}
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Berhasil!
        </Alert>
      </Snackbar>
      <Snackbar open={wrong} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {erros}
        </Alert>
      </Snackbar>
    </>
  );
}
