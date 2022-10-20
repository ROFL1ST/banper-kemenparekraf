import { Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { getApi, login } from "../../api/restApi";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";
import { useForm } from "react-hook-form";
import MuiAlert from "@mui/material/Alert";

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
  if (selectedUtama != undefined) {
    console.log(selectedUtama);
  }
  // pendukung
  const [selectedSub, setSelectedSub] = React.useState();
  if (selectedSub != undefined) {
    console.log(selectedSub);
  }

  // submit

  // error
  const [erros, setError] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

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
            />
            {/* Utama */}

            {/* Pendukung */}

            {/* Pendukung */}

            <div className="  border-10 border-b-orange-600 ">
              <button
                onClick={(e) => { }}
                type={"submit"}
                className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white md:px-28 px-12 md:mt-[300px] md:mb-[100px] mt-[150px] mb-[20px]  rounded-xl text-xl py-3 "
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <Snackbar open={erros} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Mohon Untuk Mengisi Subsektor Utama Dengan Benar
        </Alert>
      </Snackbar>
    </>
  );
}
// Utama
function Utama({ selectedUtama, setSelectedUtama }) {
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
    const all = selectedSubsector + `, ${selectedSub}`;

    setSelectedUtama(all);
    // console.log(pendukung1);
  }, [selectedSub]);
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
      <div className="flex lg:w-2/3 w-full sm:flex-row  flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
      <SubPen/>
      </div>
    </>
  );
}
// Utama

function SubPen (){
  return(
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
          >
            <option defaultValue={true}>Pilih Subsektor Pendukung</option>
            <option value="1">hello</option>
            <option value="2">hello2</option>
          </select>
          <select
            className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
 py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
 border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name=""
            id=""
          >
            <option defaultValue={true}>Pilih Subsektor Pendukung</option>
            <option value="1">hello</option>
            <option value="2">hello2</option>
          </select>
        </div>

          <div className="relative  flex-grow w-full">
            <select
              className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
 py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
 border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              name=""
              id=""
            >
              <option defaultValue={true}>Pilih Subsektor Pendukung</option>
              <option value="1">hello</option>
              <option value="2">hello2</option>
            </select>
            <select
              className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
 py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
 border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              name=""
              id=""
            >
              <option defaultValue={true}>Pilih Subsektor Pendukung</option>
              <option value="1">hello</option>
              <option value="2">hello2</option>
            </select>
          </div>
    </>
  )
}