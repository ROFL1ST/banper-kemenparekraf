import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";

export default function Field3() {
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
                        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                            <SU1 />
                            <SU2 />
                        </div>
                        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                            <SP1 />
                            <SP2 />
                        </div>

                        <div className="  border-10 border-b-orange-600 ">

                            <button className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white md:px-28 px-12 md:mt-[300px] md:mb-[100px] mt-[150px] mb-[20px]  rounded-xl text-xl py-3 ">
                                Selanjutnya
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );

}
//SUBSEKTOR UTAMA 1//
function SU1() {
    return (
        <>
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
                    <option defaultValue={true}>Pilih Subsektor Utama</option>
                    <option value="1">hello</option>
                    <option value="2">hello2</option>
                </select>
            </div>
        </>
    );
}
//SUBSEKTOR UTAMA 1//

//SUBSEKTOR UTAMA 2//
function SU2() {
    return (
        <>
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
                    <option defaultValue={true}>Pilih Subsektor Utama</option>
                    <option value="1">hello</option>
                    <option value="2">hello2</option>
                </select>
            </div>
        </>
    );
}
//SUBSEKTOR UTAMA 2//

//SUBSEKTOR PENDUKUNG 1//
function SP1() {
    return (
        <>
            <div className="relative flex-grow w-full">
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
                <select
                    className="form-select form-select-sm appearance-none block w-full  mb-5   px-3
 py-2.5 text-sm  font-semibold text-gray-700 bg-white bg-clip-padding bg-no-repeat
 border border-solid border-gray-300 rounded  transition ease-in-out   m-0  
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name=""
                    id=""
                >
                    <option defaultValue={true}>Pilih Kategori Pengusul</option>
                    <option value="1">hello</option>
                    <option value="2">hello2</option>
                </select>
            </div>
        </>
    );
}
//SUBSEKTOR PENDUKUNG 1//

//SUBSEKTOR PENDUKUNG 2//

function SP2() {
    return (
        <>
            <div className="relative flex-grow w-full">
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
                    <option defaultValue={true}>Pilih Kategori Pengusul</option>
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
                    <option defaultValue={true}>Pilih Kategori Pengusul</option>
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
                    <option defaultValue={true}>Pilih Kategori Pengusul</option>
                    <option value="1">hello</option>
                    <option value="2">hello2</option>
                </select>
            </div>
        </>
    );
}
  //SUBSEKTOR PENDUKUNG 2//

