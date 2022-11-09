import { Snackbar } from "@mui/material";
import Router, { useRouter } from "next/router";
import React from "react";
import { getApi, login } from "../../api/restApi";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";
import { useForm } from "react-hook-form";
import MuiAlert from "@mui/material/Alert";
import Loading from "../../components/Loading";
const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/g;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Field3() {
  const { query } = useRouter();
  const { kode } = query;
  React.useEffect(() => {
    document.title = "Formulir";
  });
  // const [state, setState] = React.useState({});

  // utama
  const [selectedUtama, setSelectedUtama] = React.useState("");

  // klasifikasi
  const [selectedKlasifikasi, setSelectedKlasifikasi] = React.useState("");

  // pendukung
  const [selectedPendukung, setSelectedPendukung] = React.useState();

  // klasifikasi pendukung
  const [selectedPendukungKlasifikasi, setSelectedPendukungKlasifikasi] =
    React.useState();
  // error
  const [erros, setError] = React.useState(false);
  const [success, setSucess] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
    setSucess(false);
  };

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await login("register/update_subsektor", values).then((result) => {
        if (result.data.message == "Success") {
          setSucess(true);
          Router.push("/auth/login");
        } else {
          setError(true);
        }
        setLoading(false);
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
        className="bg-gray-200 w-full h-screen   bg-cover rounded-b-3xl"
      >
        <div className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9  rounded-b-3xl">
          <Section text={"Formulir"} />
          <form>
            {/* Utama */}
            <Utama
              selectedUtama={selectedUtama}
              setSelectedUtama={setSelectedUtama}
              setSelectedKlasifikasi={setSelectedKlasifikasi}
            />
            {/* Utama */}
            <div className="flex lg:w-2/3 w-full sm:flex-row  flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <SubPen
                selectedPendukung={selectedPendukung}
                setSelectedPendukung={setSelectedPendukung}
                setSelectedPendukungKlasifikasi={
                  setSelectedPendukungKlasifikasi
                }
              />
            </div>
            <div className="  border-10 border-b-orange-600 ">
              <button
                disabled={!loading ? false : true}
                onClick={(e) => {
                  e.preventDefault();
                  if (selectedUtama == "" || selectedKlasifikasi == undefined) {
                    setError(true);
                  } else {
                    if (
                      selectedPendukung[0] != "" &&
                      selectedPendukungKlasifikasi[0] == ""
                    ) {
                      // console.log("Tidak Terisi Dengan benar");
                      setError(true);
                    } else if (
                      selectedPendukung[1] != "" &&
                      selectedPendukungKlasifikasi[1] == ""
                    ) {
                      // console.log("Tidak Terisi Dengan benar 2");
                      setError(true);
                    } else if (
                      selectedPendukung[2] != "" &&
                      selectedPendukungKlasifikasi[2] == ""
                    ) {
                      // console.log("Tidak terisi dengan benar 3");
                      setError(true);
                    } else {
                      // console.log(
                      //   "Terisi dengan benar atau tidak terisi dengan benar"
                      // );
                      handleSubmit({
                        kode: kode,
                        Subsektor: selectedUtama,
                        subsektorId: selectedKlasifikasi,
                        SubsektorPendukung: selectedPendukung
                          .filter(
                            (selectedPendukung) => selectedPendukung != ""
                          )
                          .join(","),
                        SubsektorPendukungid: selectedPendukungKlasifikasi
                          .filter(
                            (selectedPendukungKlasifikasi) =>
                              selectedPendukungKlasifikasi != ""
                          )
                          .join(","),
                      });
                    }
                  }
                }}
                type={"submit"}
                className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white md:px-28 px-12 md:mt-[300px] md:mb-[100px] mt-[150px] mb-[20px]  rounded-xl text-xl py-3 "
              >
                {!loading ? "Simpan" : <Loading />}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <Snackbar open={erros} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Mohon Untuk Mengisi Semua Subsektor
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Berhasil!
        </Alert>
      </Snackbar>
    </>
  );
}
// Utama
function Utama({ setSelectedUtama, setSelectedKlasifikasi }) {
  //   getData
  const [load, setLoad] = React.useState(true);
  //   sub
  const [sub, setSub] = React.useState([]);
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
  React.useEffect(() => {
    getSub();
  }, []);

  //   subsub
  const [selectedSubsector, setSelectedSubsector] = React.useState();
  function handleChange(e) {
    setSelectedSubsector(e.target.value);
  }

  const [loading, setLoading] = React.useState(true);

  const [subsub, setSubsub] = React.useState([]);
  const getSubsub = async () => {
    try {
      await getApi("master/subsektor").then((result) => {
        setSubsub(result.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  //   handle

  React.useEffect(() => {
    if (selectedSubsector != undefined) {
      getSubsub();
    }
  }, [selectedSubsector]);

  //
  const [selectedSub, setSelectedSub] = React.useState();

  //   handle
  function handleSelected(e) {
    setSelectedSub(e.target.value);
  }
  React.useEffect(() => {
    const utama = selectedSubsector;
    const klasifikasi = selectedSub;
    setSelectedUtama(utama);
    setSelectedKlasifikasi(klasifikasi);
  }, [selectedSub, selectedSubsector]);

  return (
    <>
      <div className="flex lg:w-2/3 w-full sm:flex-row  flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        {/* sub1 */}
        <div className="relative flex-grow w-full">
          <label className="leading-7 text-sm text-gray-600">
            *Subsektor Utama
          </label>
          <select
            onChange={handleChange}
            className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
 py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
 border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name=""
            id="sub"
          >
            <option defaultValue={true} value="">
              Pilih Subsektor Utama
            </option>
            {!load ? (
              sub
                .filter((sub) => sub.parentId == 0)
                .map((i, key) => (
                  <option value={i.Id} key={key}>
                    {i.Nama}
                  </option>
                ))
            ) : (
              <></>
            )}
          </select>
        </div>
        {/* sub1 */}

        {/* sub2 */}
        <div className="relative flex-grow w-full">
          <label className="leading-7 text-sm text-gray-600">
            *Subsektor Utama
          </label>
          <select
            onChange={handleSelected}
            className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
 py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
 border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name=""
            id=""
          >
            <option defaultValue={true} value={undefined}>
              {subsub.length == 0 || selectedSubsector == ""
                ? "Mohon Pilih Subsektor Awal"
                : "Pilih Sub"}
            </option>
            {!load ? (
              subsub
                .filter(
                  (subsub) =>
                    subsub.parentId ==
                    (selectedSubsector == "" ? undefined : selectedSubsector)
                )
                .map((i, key) => (
                  <option value={i.Id} key={key}>
                    {i.Nama}
                  </option>
                ))
            ) : (
              <></>
            )}
          </select>
        </div>
      </div>
    </>
  );
}
// Utama

function SubPen({
  selectedPendukung,
  setSelectedPendukung,
  setSelectedPendukungKlasifikasi,
}) {
  //   getData
  const [load, setLoad] = React.useState(true);
  //   sub
  const [sub, setSub] = React.useState([]);
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
  React.useEffect(() => {
    getSub();
  }, []);

  const [memuat, setMemuat] = React.useState(true);
  const [klasifikasi, setKlasifikasi] = React.useState();

  const getKlasifikasi = async () => {
    try {
      await getApi("master/subsektor").then((result) => {
        setKlasifikasi(result.data.data);
        setMemuat(false);
      });
    } catch (error) {
      console.log(error);
      setMemuat(false);
    }
  };

  React.useEffect(() => {
    getKlasifikasi();
  }, []);
  // input

  // subsektor pendukung
  // 1
  const [pendukung1, setPendukung1] = React.useState("");
  function handleChange1(e) {
    setPendukung1(e.target.value);
  }
  // 1

  // 2

  const [pendukung2, setPendukung2] = React.useState("");
  function handleChange2(e) {
    setPendukung2(e.target.value);
  }

  // 2

  // 3

  const [pendukung3, setPendukung3] = React.useState("");
  function handleChange3(e) {
    setPendukung3(e.target.value);
  }

  //

  // klasifikasi
  // 1
  const [klasifikasi1, setKlasifikasi1] = React.useState("");
  function handleSelected(e) {
    setKlasifikasi1(e.target.value);
  }
  // 1

  // 2
  const [klasifikasi2, setKlasifikasi2] = React.useState("");
  function handleSelected2(e) {
    setKlasifikasi2(e.target.value);
  }
  // 2
  // 3
  const [klasifikasi3, setKlasifikasi3] = React.useState("");
  function handleSelected3(e) {
    setKlasifikasi3(e.target.value);
  }
  // 3
  //
  React.useEffect(() => {
    const support = (
      `${pendukung1 ?? ""}` +
      `,${pendukung2 ?? ""}` +
      `,${pendukung3 ?? ""}`
    ).split(",");

    const clasification = (
      `${klasifikasi1 ?? ""}` +
      `,${klasifikasi2 ?? ""}` +
      `,${klasifikasi3 ?? ""}`
    ).split(",");

    setSelectedPendukung(support);
    setSelectedPendukungKlasifikasi(clasification);
  }, [
    klasifikasi1,
    klasifikasi2,
    klasifikasi3,
    pendukung1,
    pendukung2,
    pendukung3,
  ]);
  return (
    <>
      <div className="relative  flex-grow w-full">
        <label className="leading-7 text-sm text-gray-600">
          *Subsektor Pendukung
        </label>
        <select
          className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          name=""
          id=""
          onChange={handleChange1}
        >
          <option defaultValue={true} value={""}>
            Pilih Subsektor Pendukung
          </option>
          {!load ? (
            sub
              .filter((sub) => sub.parentId == 0)
              .map((i, key) => (
                <option value={i.Id} key={key}>
                  {i.Nama}
                </option>
              ))
          ) : (
            <></>
          )}
        </select>
        <select
          className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          name=""
          id=""
          onChange={handleChange2}
        >
          <option defaultValue={true} value={""}>
            Pilih Subsektor Pendukung
          </option>
          {!load ? (
            sub
              .filter((sub) => sub.parentId == 0)
              .map((i, key) => (
                <option value={i.Id} key={key}>
                  {i.Nama}
                </option>
              ))
          ) : (
            <></>
          )}
        </select>
        <select
          className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          name=""
          id=""
          onChange={handleChange3}
        >
          <option defaultValue={true} value={""}>
            Pilih Subsektor Pendukung
          </option>
          {!load ? (
            sub
              .filter((sub) => sub.parentId == 0)
              .map((i, key) => (
                <option value={i.Id} key={key}>
                  {i.Nama}
                </option>
              ))
          ) : (
            <></>
          )}
        </select>
      </div>

      {/* klasifikasi */}
      <div className="relative  flex-grow w-full">
        <select
          className={`form-select form-select-sm appearance-none block w-full  mb-5   px-3
 py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
 border border-solid  rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
            pendukung1 != "" && klasifikasi1 == ""
              ? "border-red-500"
              : "border-gray-300"
          }`}
          name=""
          id=""
          onChange={handleSelected}
        >
          <option defaultValue={true} value={""}>
            Pilih Klasifikasi Subsektor Pendukung
          </option>
          {!memuat ? (
            klasifikasi
              .filter(
                (klasifikasi) =>
                  klasifikasi.parentId ==
                  (pendukung1 == "" ? undefined : pendukung1)
              )
              .map((i, key) => (
                <option value={i.Id} key={key}>
                  {i.Nama}
                </option>
              ))
          ) : (
            <></>
          )}
        </select>
        <select
          className={`form-select form-select-sm appearance-none block w-full  mb-5   px-3
 py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
 border border-solid  rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
            pendukung2 != "" && klasifikasi2 == ""
              ? "border-red-500"
              : "border-gray-300"
          }`}
          name=""
          id=""
          onChange={handleSelected2}
        >
          <option defaultValue={true} value={""}>
            Pilih Klasifikasi Subsektor Pendukung
          </option>
          {!memuat ? (
            klasifikasi
              .filter(
                (klasifikasi) =>
                  klasifikasi.parentId ==
                  (pendukung2 == "" ? undefined : pendukung2)
              )
              .map((i, key) => (
                <option value={i.Id} key={key}>
                  {i.Nama}
                </option>
              ))
          ) : (
            <></>
          )}
        </select>
        <select
          className={`form-select form-select-sm appearance-none block w-full  mb-5   px-3
 py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
 border border-solid  rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
            pendukung3 != ""   && klasifikasi3 == ""
              ? "border-red-500"
              : "border-gray-300"
          }`}
          name=""
          id=""
          onChange={handleSelected3}
        >
          <option defaultValue={true} value={""}>
            Pilih Klasifikasi Subsektor Pendukung
          </option>
          {!memuat ? (
            klasifikasi
              .filter(
                (klasifikasi) =>
                  klasifikasi.parentId ==
                  (pendukung3 == "" ? undefined : pendukung3)
              )
              .map((i, key) => (
                <option value={i.Id} key={key}>
                  {i.Nama}
                </option>
              ))
          ) : (
            <></>
          )}
        </select>
      </div>
    </>
  );
}
