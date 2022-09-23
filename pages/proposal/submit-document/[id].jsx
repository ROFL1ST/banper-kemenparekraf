import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Section from "../../components/section";
import Router, { useRouter } from "next/router";
import { getApi, getPropose } from "../../api/restApi";

export default function SubmitDoc() {
  const teks = [
    "Dokument 1: Surat Permohonan",
    "Dokument 2: Proposal Ringkas",
    "Dokument 3: Proposal",
    "Dokument 4: Surat Pernyataan Tidak Terjadi Konflik Internal",
    "Dokument 5: Surat Pernyataan Tidak Terkait Partai Politik",
    "Dokument 6: Surat Pernyataan Bersedia Menerima Dan Memanfaatkan (dengan materai)",
    "Dokument 7: Anggaran Biaya",
    "Dokument 8: Legalitas Lembaga (Komunitas: Akta Notaris Lembaga Adat: Akta Notaris/Surat Pengakuan)",
  ];
  const router = useRouter();
  const { id } = router.query;

  // getList
  const [load, setLoad] = React.useState(true);
  const [doc, setDoc] = React.useState([]);
  async function detail(token) {
    try {
      await getPropose(`proposal/detail?UsulanHeaderID=${id}`, token).then(
        (result) => {
          setDoc(result.data.data.get_usulan_detail);
          setLoad(false);
        }
      );
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  }
  React.useEffect(() => {
    if (router.isReady) {
      if (localStorage.getItem("token") != null) {
        detail(localStorage.getItem("token"));
      } else {
        detail(sessionStorage.getItem("token"));
      }
      if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
        // alert("You need to Log In first!")
        return;
      } else {
        Router.push("/home");
      }
    }
  }, [router.isReady]);
  const data = JSON.stringify(doc);
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2017/05/19/06/22/desk-2325627_960_720.jpg)",
        }}
        className="bg-gray-200 w-full mb-20  bg-cover rounded-b-3xl"
      >
        <div className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 py-40 px-9  rounded-b-3xl">
          <Section text={"Submit Document"}></Section>
          <div className="lg:mt-32 mt-10 2xl:w-1/2 xl:w-3/5 lg:w-3/4 sm:w-3/5 2xl:space-y-10 lg:space-y-5 space-y-3  mx-auto">
            {/* Box Persentase */}
            <div className="border border-blue-900 bg-blue-400 bg-opacity-20 rounded-xl px-10 py-8 flex lg:flex-row flex-col   justify-between">
              <h1 className="lg:pb-10 pb-5 lg:text-base text-sm">
                0 dari 8 Syarat Terselesaikan
              </h1>
              <div className="flex flex-col">
                <div className="flex lg:justify-center justify-between lg:gap-x-56 gap-x-0 lg:text-base sm:text-sm">
                  <h1>0%</h1>
                  <h1>50%</h1>
                  <h1>100%</h1>
                </div>
                <div className="py-1.5 mt-3 rounded-full bg-gray-300"></div>
              </div>
            </div>
            {/* Box Persentase */}

            {/* Box Pengusul */}
            <CardPengusul />
            {/* Box Pengusul */}

            {/* Document */}
            {!load && data ? (
              doc?.map((i, key) => (
                <CardDocument text={i} key={key}></CardDocument>
              ))
            ) : (
              <></>
            )}
        
            {/* Document */}
            {/* Catatan Dokument */}
            <h1 className="text-2xl md:pt-0 pt-24">Catatan Dokument</h1>
            <Catatan />
            {/* Catatan Dokument */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
function CardPengusul() {
  const [token, setToken] = React.useState("");
  const [list, setList] = React.useState([]);

  const [load, setLoad] = React.useState(true);
  const getList = async (auth) => {
    try {
      await getPropose("proposal?offset=0&limit=10", auth).then((result) => {
        if (result.data.message == "Failed") {
          if (result.data.display_message == "Proposal tidak di temukan") {
            return;
          } else {
            alert("Token is not valid");
            Router.push("/home");
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
          }
        } else {
          setList(result.data.data);
        }
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setToken(localStorage.getItem("token"));
      getList(localStorage.getItem("token"));
    } else {
      setToken(sessionStorage.getItem("token"));
      getList(sessionStorage.getItem("token"));
    }
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      // alert("You need to Log In first!")

      return;
    } else {
      Router.push("/home");
    }
  }, [token]);
  // const result = list.filter(list.Id);
  // console.log(result)

  // jenis bantuan
  const [jenis, setJenis] = React.useState([]);
  async function detail() {
    try {
      await getApi(`master/jenis_bantuan`).then((result) => {
        setJenis(result.data.data);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  }
  React.useEffect(() => {
    detail();
  }, []);

  return (
    <>
      <div className="bg-white bg-opacity-20 rounded-xl px-10 py-8 shadow-xl space-y-7">
        <div>
          <h1>Identitas Pengusul</h1>
          <div className="border mt-3 rounded-full bg-gray-300"></div>
        </div>
        {/*  */}
        {!load && list.length !== 0 ? (
          <>
            <div className="flex justify-between gap-x-7">
              <div className="space-y-8">
                <div className="space-y-3">
                  <h1 className="text-sm">
                    Nama Komunitas/Pemerintah Daerah/Lembaga Adat (sesuai
                    akta/legislatis)
                  </h1>
                  <p className="text-xs text-gray-400">
                    {list[0].NamaKomunitas}
                  </p>
                </div>
                <div className="space-y-3">
                  <h1 className="text-sm">Subsector</h1>
                  <p className="text-xs text-gray-400">
                    Pengembangan Permainan
                  </p>
                </div>
              </div>
              {/* Left */}
              {/* Right */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <h1 className="text-sm">Kategori</h1>
                  <p className="text-xs text-gray-400">Komunitas</p>
                </div>
                <div className="space-y-3">
                  <h1 className="text-sm">Jenis Bantuan</h1>
                  <p className="text-xs text-gray-400">
                    {!load ? (
                      jenis
                        .filter((jenis) => jenis.Id === list[0].JenisBantuanID)
                        .map((jenis) => jenis.Nama)
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </div>
              {/* Right */}
            </div>
          </>
        ) : (
          <></>
        )}
        {/*  */}
      </div>
    </>
  );
}

function CardDocument({ text }) {
  return (
    <>
      {/* Box Document 8 */}
      <div className="bg-white bg-opacity-20 rounded-xl lg:px-10 px-5 py-8 shadow-xl space-y-7">
        <div>
          <div className="justify-between flex lg:pr-36 items-center">
            <h1 className="lg:text-sm text-xs lg:w-3/4 w-3/5">{text}</h1>
            <h1 className="lg:text-sm text-xs text-gray-400  ">
              Tidak Lengkap
            </h1>
          </div>
          <div className="border mt-3 rounded-full bg-gray-300"></div>
          <div className="flex justify-between pt-10 lg:pr-36 lg:gap-x-0 gap-x-4">
            <div className="flex items-center lg:gap-x-8 gap-x-3  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-14 h-14 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <p className="lg:text-sm text-xs w-11/12">
                File dalam bentuk .pdf, .jpg, .jpege dengan ukuran maximal{" "}
                <span className="text-red-500 font-semibold">3MB</span>
              </p>
            </div>
            <button className="bg-blue-900 lg:py-3 py-2 lg:text-base text-xs my-auto items-center lg:px-4 px-3 rounded-md text-white font-semibold ">
              upload
            </button>
          </div>
        </div>
      </div>
      {/* Box Document 8 */}
    </>
  );
}
function Catatan() {
  return (
    <>
      <div className="bg-white bg-opacity-20 rounded-xl lg:px-10 px-5 py-5 shadow-xl space-y-7 md:flex md:flex-col md:justify-center ">
        <textarea
          id="message"
          rows="4"
          className="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
          placeholder="Tambahkan Komentar"
        ></textarea>
        <button className="bg-red-500 text-white lg:w-2/5 w-full py-2 md:px-0 px-4 rounded-lg mx-auto lg:text-base text-sm">
          Tambahkan Catatan Tambahan
        </button>
      </div>
    </>
  );
}
