import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";

export default function Field2() {
    React.useEffect(() => {
        document.title = "Formulir";
    });

    return (
        <>
            <Navbar />
            <div style={{
                backgroundImage:
                    "url(https://cdn.pixabay.com/photo/2017/05/19/06/22/desk-2325627_960_720.jpg)",
            }}
                className="bg-gray-200 w-full h-full  bg-cover rounded-b-3xl">
                <div className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9  rounded-b-3xl">
                    <Section text={"Formulir"} />
                    <form className="mb-20">
                        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                            <div className="relative flex-grow w-full">
                                <label className="leading-7 text-sm text-gray-600">
                                    *Nama Komunitas/ Pemerintah Daerah/Lembaga Adat <br /> (sesuai akta/legalitas)
                                </label>


                                <input

                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                                    placeholder="Nama Komunitas/ Pemerintah Daerah/Lembaga"
                                />
                            </div>
                            <div className="relative flex-grow w-full">
                                <label className="leading-7 text-sm text-gray-600">
                                    *Kategori Pengusul
                                </label>


                                <input

                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                                    placeholder=" Pilih kategori pengusul"
                                />
                            </div>
                        </div>
                        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                            <div className="relative flex-grow w-full">
                                <label className="leading-7 text-sm text-gray-600">
                                    *Provinsi
                                </label>



                                <input
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                                    placeholder="Pilih Provinsi"
                                />
                            </div>
                            <div className="relative flex-grow w-full">
                                <label className="leading-7 text-sm text-gray-600">
                                    *Kabupaten/Kota
                                </label>


                                <input
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                                    placeholder="Pilih Kabupaten kota"
                                />
                            </div>
                        </div>

                        <div className="  border-10 border-b-orange-600 ">
                            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                                <div className="relative flex-grow w-full">
                                    <label className="leading-7 text-sm text-gray-600">
                                        *Alamat Akta
                                    </label>



                                    <input
                                        type={"text"}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                                        placeholder="Masukan Alamat akta"
                                    />
                                </div>
                                <div className="relative flex-grow w-full">
                                    <label className="leading-7 text-sm text-gray-600">
                                        *Alamat Domisili (Bisa disamakan dengan akta)
                                    </label>
                                    <input
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 mb-5 "
                                        placeholder="Masukan Alamat domisili"
                                        type={"text"}
                                    />
                                </div>
                            </div>
                            <div className="flex lg:w-2/3 w-1/2 sm:flex-row flex-row mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">

                                <div className="relative flex-grow w-1/2">
                                    <label className="leading-7 text-sm text-gray-600">
                                        *Nomor Telepon Penanggung jawab
                                    </label>
                                    <br />
                                    <input
                                        type={"number"}
                                        className="w-1/2 bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                                        placeholder="Masukan Nomor Telepon Penanggung jawab"
                                    />
                                </div>

                            </div>
                            <div className=" border-b-orange-600 border-b-2 h-4 w-3/4 mx-auto m-10 "></div>

                            <div className="flex lg:w-2/3 w-1/2 sm:flex-col flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">

                                <div className="relative flex-grow w-full">
                                    <label className="leading-7 text-sm text-gray-600">
                                        *Nama Ketua/penangggung jawab
                                    </label>
                                    <br />
                                    <input
                                        type={"text"}
                                        className="w-1/2 bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                                        placeholder="Masukan Nama"
                                    />
                                </div>
                                <div className="relative flex-grow w-full">
                                    <label className="leading-7 text-sm text-gray-600">
                                        *Nomor Hp Penangggung jawab
                                    </label>
                                    <br />
                                    <input
                                        type={"number"}
                                        className="w-1/2 bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                                        placeholder="Masukan Nomor Telepon Penanggung jawab"
                                    />
                                </div>
                                <div className="relative flex-grow w-full">
                                    <label className="leading-7 text-sm text-gray-600">
                                        *Email Penanggung jawab
                                    </label>
                                    <br />
                                    <input
                                        type={"email"}
                                        className="w-1/2 bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 mb-5 "
                                        placeholder="Masukan Email Penanggung jawab"
                                    />
                                </div>



                            </div>
                            <button
                                className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white md:px-28 px-12 mt-5 rounded-xl text-xl py-3"
                            >
                                Selanjutnya
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <Footer/> */}
        </>
    )
}