import React from 'react'
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function index() {
  return (
    <>
    <Navbar/>

    <div className=" px-5 py-6 mx-auto pt-28">
    <div className="bg-slate-300 py-7 flex flex-col text-center w-full rounded-lg">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 pt-10">Sangar Tari Jakarta</h1>
        <img className='h-40 w-40 rounded-full  mx-auto bg-cover ' src="https://dummyimage.com/720x400"  />
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base pt-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus recusandae commodi vitae ad impedit voluptatem, deserunt animi nihil, omnis laborum repellat explicabo, exercitationem amet doloribus praesentium dolore atque iure ipsa.</p>
    </div>
   </div>
  <div className="px-5 py-24 mx-auto pt-8">
    <div className="flex flex-wrap -m-4">
      <div className="p-4 md:w-1/3">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x400" />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Kota</h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">tittle</h1>
            <p className="leading-relaxed mb-3">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x400" alt="blog"/>
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Kota</h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Tittle</h1>
            <p className="leading-relaxed mb-3">Lorem ipsum dolor sit amet consectetur.</p>
           
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x401" alt="blog"/>
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Kota</h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Tittle</h1>
            <p className="leading-relaxed mb-3">Lorem ipsum dolor sit amet consectetur.</p>
           
          </div>
        </div>
      </div>
    </div>
  </div>
    <Footer/>
    </>
  )
}
