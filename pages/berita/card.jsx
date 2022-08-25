/* eslint-disable @next/next/no-img-element */
export default function Card() {
  return (
    <>
      <div className="bg-gray-100 w-full h-72">
        <div
          className="w-full h-1/2"
          style={{
            backgroundImage:
              "url(https://c.inilah.com/2022/04/0419_010803_6f91_inilah.com_.jpg )",
          }}
        ></div>
        <small className="text-xs">23 september 2022</small>
        <h3 className="xl:text-base lg:text-base max-h-16 text-sm my-3 font-bold capitalize">
          Pemerintah bakal revalitasi infrastruktur sektor ekonomi pasif
        </h3>
        <small className="text-xs">Kota Makassar</small>
      </div>
    </>
  );
}
