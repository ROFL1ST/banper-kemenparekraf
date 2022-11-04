import { Snackbar } from "@mui/material";
import Router, { useRouter } from "next/router";
import React from "react";
import Section from "../../components/section";
import { useForm } from "react-hook-form";
import MuiAlert from "@mui/material/Alert";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { getApi, getPropose, login, PostFeed } from "../../api/restApi";
import Loading from "../../components/Loading";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Subsektor() {
  const { query } = useRouter();
  const { kode } = query;
  React.useEffect(() => {
    document.title = "Edit Subsektor";
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
  const [warn, setWarn] = React.useState(false);

  const [success, setSucess] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [user, setUser] = React.useState([]);
  const getData = async (value) => {
    try {
      await getPropose("user", value).then((result) => {
        setUser(result.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
    setSucess(false);
    setWarn(false);
  };

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await PostFeed("user", token, values, "put").then((result) => {
        if (result.data.message == "Success") {
          setSucess(true);
          setTimeout(() => {
            Router.push("/proposal");
          }, 1000);
        } else {
          setError(true);
        }
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
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
          <Section text={"Edit Subsektor"} />
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
                setWarn={setWarn}
              />
            </div>
            <div className="  border-10 border-b-orange-600 ">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (selectedUtama == "" || selectedKlasifikasi == undefined) {
                    setError(true);
                  } else {
                    if (
                      selectedPendukung[0] != "" &&
                      selectedPendukungKlasifikasi[0] == ""
                    ) {
                      console.log("Tidak Terisi Dengan benar");
                      setError(true);
                    } else if (
                      selectedPendukung[1] != "" &&
                      selectedPendukungKlasifikasi[1] == ""
                    ) {
                      console.log("Tidak Terisi Dengan benar 2");
                      setError(true);
                    } else if (
                      selectedPendukung[2] != "" &&
                      selectedPendukungKlasifikasi[2] == ""
                    ) {
                      console.log("Tidak terisi dengan benar 3");
                      setError(true);
                    } else {
                      console.log(
                        "Terisi dengan benar atau tidak terisi dengan benar"
                      );
                      handleSubmit({
                        NamaKomunitas: user[0].NamaKomunitas,
                        Kategori: user[0].Kategori,
                        AlamatAkta: user[0].AlamatAkta,
                        Alamat: user[0].Alamat,
                        Email: user[0].Email,
                        PhoneNumber: user[0].PhoneNumber,
                        Nama: user[0].Nama,
                        password: "",
                        EmailPJ: user[0].EmailPJ,
                        PhonePJ: user[0].PhonePJ,
                        KotaID: user[0].KotaID,
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
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Mohon Untuk Mengisi Subsektor Dengan Benar
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Berhasil!
        </Alert>
      </Snackbar>
      <Snackbar open={warn} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Anda Hanya Bisa Mengisi Maksimal 4 subsektor pendukung
        </Alert>
      </Snackbar>
    </>
  );
}
// Utama
function Utama({ setSelectedUtama, setSelectedKlasifikasi }) {
  // edit
  const [token, setToken] = React.useState("");
  const [muat, setMuat] = React.useState(true);
  const [user, setUser] = React.useState([]);
  const getData = async (value) => {
    try {
      await getPropose("user", value).then((result) => {
        setUser(result.data.data);
        setMuat(false);
      });
    } catch (error) {
      setMuat(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
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
      setLoading(false);
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
    if (!muat) {
      setSelectedSubsector(user[0].Subsektor);
      setSelectedSub(user[0].subsektorId);
    }
  }, [user]);
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
            value={selectedSubsector}
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
            value={selectedSub}
          >
            <option defaultValue={true} value={undefined}>
              {subsub.length == 0 || selectedSubsector == ""
                ? "Mohon Pilih Subsektor Awal"
                : "Pilih Sub"}
            </option>
            {!loading ? (
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

function SubPen({ setSelectedPendukung, setSelectedPendukungKlasifikasi }) {
  // edit
  const [token, setToken] = React.useState("");

  const [user, setUser] = React.useState([]);
  const [muat, setMuat] = React.useState(true);
  const getData = async (value) => {
    try {
      await getPropose("user", value).then((result) => {
        setUser(result.data.data);
        setMuat(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
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

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!muat) {
      const support = user[0].SubsektorPendukung.split(",");
      const classification = user[0].SubsektorPendukungid.split(",");
      //  pendukung
      if (support[0] != undefined) {
        console.log(pendukung1);
        setPendukung1(support[0]);
      } else {
        setPendukung1("");
      }
      if (support[1] != undefined) {
        setPendukung2(support[1]);
      } else {
        setPendukung2("");
      }
      if (support[2] != undefined) {
        setPendukung3(support[2]);
      } else {
        setPendukung3("");
      }
      //  pendukung

      // klasifikasi

      if (classification[0] != undefined) {
        setKlasifikasi1(classification[0]);
      } else {
        setKlasifikasi1("");
      }
      if (classification[1] != undefined) {
        setKlasifikasi2(classification[1]);
      } else {
        setKlasifikasi2("");
      }
      if (classification[2] != undefined) {
        setKlasifikasi3(classification[2]);
      } else {
        setKlasifikasi3("");
      }

      // klasifikasi
    }
    setLoading(false);
  }, [user[0]]);
  const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/g;

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
      {!loading ? (
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
              value={pendukung1}
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
              value={pendukung2}
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
              value={pendukung3}
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
              value={klasifikasi1}
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
              value={klasifikasi2}
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
                pendukung3 != "" && klasifikasi3 == ""
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              name=""
              id=""
              onChange={handleSelected3}
              value={klasifikasi3}
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
      ) : (
        <>
          <>
            <div
              className="form-select form-select-sm appearance-none  w-full  mb-5 flex justify-center gap-x-3 cursor-progress items-center px-3
            py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            >
              Loading
              <div className="spinner-container flex justify-center text-black">
                <div className="loading-spinner"></div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}
