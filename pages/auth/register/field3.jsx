import { useRouter } from "next/router";
import React from "react";
import { getApi } from "../../api/restApi";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";

export default function Field3() {
  const { query } = useRouter();
  const { kode } = query;
  React.useEffect(() => {
    document.title = "Formulir";
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
            <Utama />
            {/* Utama */}

            {/* Pendukung */}
            <Pendukung />
            {/* Pendukung */}

            <div className="  border-10 border-b-orange-600 ">
              <button className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white md:px-28 px-12 md:mt-[300px] md:mb-[100px] mt-[150px] mb-[20px]  rounded-xl text-xl py-3 ">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
// Utama
function Utama(params) {
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
  //   console.log(selectedSubsector)
  return (
    <>
      <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
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
            className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
 py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
 border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name=""
            id=""
          >
            <option defaultValue={true} value="">
              {subsub.length != 0
                ? "Pilih Subsektor Utama"
                : "Mohon Pilih Subsektor Awal"}
            </option>
            {!load ? (
              subsub
                .filter((subsub) => subsub.parentId == selectedSubsector)
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
        {/* sub2 */}
      </div>
    </>
  );
}
// Utama

//SUBSEKTOR PENDUKUNG 1//
function Pendukung() {
  return (
    <>
      <div className="flex flex-col lg:w-2/3 w-full  mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        {/* 1 */}

        <Option1 />
        <Option2 />

        <Option3 />

        {/* <Option2 /> */}

        {/* <Option3/> */}

        {/* 1 */}
      </div>
    </>
  );
}
//SUBSEKTOR PENDUKUNG 1//

//SUBSEKTOR PENDUKUNG 2//
function Option1() {
  return (
    <>
    
      <div className="relative flex gap-x-5 w-full">
        
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
  );
}

function Option2() {
  return (
    <>
      <div className="relative flex gap-x-5 w-full">
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
  );
}

function Option3() {
  return (
    <>
      <div className="relative flex gap-x-5 w-full">
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
  );
}
