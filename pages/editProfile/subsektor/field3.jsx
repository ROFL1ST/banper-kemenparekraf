import { Snackbar } from "@mui/material";
import Router, { useRouter } from "next/router";
import React from "react";
import Section from "../../components/section";
import { useForm } from "react-hook-form";
import MuiAlert from "@mui/material/Alert";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { getApi, login } from "../../api/restApi";
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
        console.log(result.data);
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
        className="bg-gray-200 w-full h-full  bg-cover rounded-b-3xl"
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
              />
            </div>
            <div className="  border-10 border-b-orange-600 ">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    selectedUtama == "" ||
                    selectedPendukung == "" ||
                    selectedKlasifikasi == undefined
                  ) {
                    setError(true);
                  } else {
                    handleSubmit({
                      kode: kode,
                      Subsektor: selectedUtama,
                      SubsektorPendukung: selectedPendukung,
                      subsektorId: selectedKlasifikasi,
                    });
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
    </>
  );
}
// Utama
function Utama({ selectedUtama, setSelectedUtama, setSelectedKlasifikasi }) {
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
    console.log(e.target.value);
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

    // console.log(pendukung1);
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

function SubPen({ selectedPendukung, setSelectedPendukung }) {
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

  // input
  const [input, setInput] = React.useState(Array(2).fill(""));

  const handleChange = (element, index) => {
    setInput([...input.map((d, indx) => (indx === index ? element.value : d))]);

    //Focus next input
  };
  const [input2, setInput2] = React.useState(Array(2).fill(""));
  const handleChange2 = (element, index) => {
    setInput2([
      ...input2.map((d, indx) => (indx === index ? element.value : d)),
    ]);

    //Focus next input
  };

  React.useEffect(() => {
    if (
      input2.filter((i) => i != "").map((i) => i.replace(regex, "")).length !=
        0 &&
      input.filter((i) => i != "").map((i) => i.replace(regex, "")).length != 0
    ) {
      setSelectedPendukung(
        input
          .filter((i) => i != "")
          .map((i) => i.replace(regex, ""))
          .join(", ") +
          `, ${input2
            .filter((i) => i != "")
            .map((i) => i.replace(regex, ""))
            .join(", ")}`
      );
    } else if (
      input.filter((i) => i != "").map((i) => i.replace(regex, "")).length != 0
    ) {
      setSelectedPendukung(
        input
          .filter((i) => i != "")
          .map((i) => i.replace(regex, ""))
          .join(", ")
      );
    } else {
      setSelectedPendukung(
        input2
          .filter((i) => i != "")
          .map((i) => i.replace(regex, ""))
          .join(", ")
      );
    }
  }, [input, input2]);
  return (
    <>
      <div className="relative  flex-grow w-full">
        <label className="leading-7 text-sm text-gray-600">
          *Subsektor Pendukung
        </label>
        {input.map((i, index) => (
          <select
            key={index}
            value={i}
            className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name=""
            id=""
            onChange={(e) => handleChange(e.target, index)}
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
        ))}
      </div>

      <div className="relative  flex-grow w-full">
        {input2.map((i, index) => (
          <select
            onChange={(e) => handleChange2(e.target, index)}
            key={index}
            value={i}
            className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
 py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
 border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name=""
            id=""
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
        ))}
      </div>
    </>
  );
}
