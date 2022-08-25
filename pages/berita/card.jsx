/* eslint-disable @next/next/no-img-element */
export default function Card() {
  return (
    <>
      <div className="bg-gray-100 w-full h-80 rounded-2xl">
        <div
          className="w-full h-1/2 bg-cover rounded-t-2xl"
          style={{
            backgroundImage:
              "url(https://c.inilah.com/2022/04/0419_010803_6f91_inilah.com_.jpg )",
          }}
        ></div>
        <div className="px-5 py-1">
          <small className="text-xs font-bold text-gray-500">23 september 2022</small>
          <h3 className="my-3 font-bold capitalize">
            Pemerintah bakal revalitasi infrastruktur sektor ekonomi pasif
          </h3>
          <small className="text-xs font-bold text-blue-900">Kota Makassar</small>
        </div>
      </div>
    </>
  );
}
