import Navbar from "./components/navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div
        className="pt-48 w-full h-[90vh] bg-cover text-white px-20 capitalize"
        style={{ backgroundImage: "url(assets/building.png)" }}
      >
        <div className="w-1/2">
          <h1 className="text-4xl font-bold">Banper Infrastruktur Ekraf</h1>
          <p className="mt-7 mb-3">
            {" "}
            Fasilitasi Revitalisasi Infrastruktur Fisik Ruang Kreatif dan Sarana
            Ruang Kreatif.
          </p>
          <p>
            Pengajuan dan penerimaan proposal mulai tanggal 08 November sampai
            dengan 08 Desember 2021 jam 23.59
          </p>
        </div>
      </div>
      <button className="bg-red-600 hover:bg-red-500 capitalize font-semibold flex mx-auto text-white px-28 rounded-xl text-xl py-6 relative bottom-11">
        daftar sekarang
      </button>
      <div className="px-20">
        <div className="text-center text-blue-900 capitalize text-2xl mt-5 font-bold">
          mekanisme pendaftaran
        </div>
        <div className="flex mx-auto my-3 h-0.5 w-44 bg-yellow-400"></div>
        <p className="text-center px-24 lg:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In
          voluptatibus rem illo accusamus, earum adipisci aliquam dolorem dolor
          assumenda aperiam sed vel molestiae eos quibusdam explicabo
          consequatur libero. Necessitatibus, consequatur?
        </p>
        <div className="text-center text-blue-900 capitalize text-2xl mt-10 font-bold">
          berita
        </div>
        <div className="flex mx-auto my-3 h-0.5 w-44 bg-yellow-400"></div>
        <CardBerita />
      </div>
    </>
  );
}

function CardBerita() {
  return (
    <>
      <div className="w-1/2 h-72 mt-10 rounded-xl bg-gray-100 mb-20 flex">
        <div className="bg-gray-200 w-1/2 rounded-xl h-full"></div>
        <small>23 Desember 2021</small>
      </div>
    </>
  );
}
