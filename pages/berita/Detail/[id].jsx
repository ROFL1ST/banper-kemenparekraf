/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import { useRouter } from "next/router";
import Banner from "./component/Banner";
import Isi from "./component/Isi";
import Small_Card_Loading from "./component/Small_Card_Loading";
import News_small_card from "./component/News_small_card";
import DetailCardLoading from "./component/detailCardLoading";
import Card from "../card";

export default function DetailPage() {
  const [loading, setLoading] = React.useState(true);

  const loadingLength = [1, 2, 3, 4];
  const [items, setItem] = React.useState([]);
  const [detail, setDetail] = React.useState({ data: {}, loading2: true });
  var router = useRouter();

  const { id } = router.query;

  const getData = async () => {
    const url = `http://128.199.242.242/api/news/${id}`;
    try {
      let respond = await axios.get(url);
      // let views = await axios.put(url);

      setDetail((s) => ({ ...s, data: respond.data.data[0], loading2: false }));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getList = async () => {
    const url = "http://128.199.242.242/api/news";
    try {
      let respond = await axios.get(url);
      // console.log(respond.data.data);
      setItem(respond.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    document.title = "Detail";
  });
  React.useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);
  React.useEffect(() => {
    const ac = new AbortController();

    getList();

    return () => {
      ac.abort();
    };
  }, []);
  // console.log(items[0]["title"]);
  const [more, setMore] = React.useState(false);
  const { data, loading2 } = detail;

  return (
    <>
      <Navbar />
      <div className=" items-center flex h-full flex-col pb-10 pt-36 xl:w-2/3 lg:w-2/3 mx-auto">
        <Banner data={data} loading2={loading2} />
        {/* Content */}
        <div className="relative pt-16  flex xl:justify-between lg:justify-between justify-center lg:w-full w-4/5 ">
          <div className="content-left xl:w-11/12 lg:w-11/12 flex flex-col">
            {/* detail text */}
            <div className="xl:w-11/12 lg:w-11/12 w-full text-lg pb-10">
              {/* {reactElement} */}
              {data && !loading2  ? (
                <Isi loading={loading2} data={data.isi}></Isi>
              ) : (
                <div className="space-y-2  animate-pulse">
                  <div className="text-xs font-bold h-4  bg-gray-300 rounded-full"></div>
                  <div className="text-xs font-bold h-4 w-3/4 bg-gray-300 rounded-full"></div>
                  <div className="text-xs font-bold h-4  bg-gray-300 rounded-full"></div>
                  <div className="text-xs font-bold h-4 w-1/4 bg-gray-300 rounded-full"></div>
                </div>
              )}
            </div>
            {/* detail text */}
          </div>
          <div className="content-right w-1/4 xl:flex lg:flex hidden flex-col ">
            <div className="space-y-5">
              {loading ? (
                <>
                  <Small_Card_Loading />
                  <Small_Card_Loading />
                  <Small_Card_Loading />
                </>
              ) : (
                items
                  ?.slice(0, 3)
                  .map((data, index) => (
                    <News_small_card data={data} key={index}></News_small_card>
                  ))
              )}
            </div>
          </div>
        </div>
        {/* Content */}
        {/* bottom content */}
        <div className="flex flex-col justify-center pt-20 items-center mx-auto lg:w-full w-4/5">
          <h1 className="font-bold text-blue-900 text-3xl underline underline-offset-8 decoration-yellow-500">
            Berita Terkait
          </h1>

          <div className="pt-16  grid lg:grid-cols-4 grid-cols-1 lg:gap-x-1 lg:gap-y-0 gap-y-4 gap-x-4 pb-16 w-full">
            {" "}
            {loading ? (
              <>
                <DetailCardLoading />
                <DetailCardLoading />
                <DetailCardLoading />
                <DetailCardLoading />
              </>
            ) : (
              items.slice(0, 4).map((i, key) => (
                <div
                  onClick={() => {
                    getData();
                  }}
                  key={key}
                >
                  <Card data={i} />
                </div>
              ))
            )}
          </div>
          <div
            onClick={() => {
              if (items.length < 9) {
                alert("Content is max");
              } else {
                setMore(true);
                return;
              }
            }}
          >
            {" "}
            <h1 className="flex justify-center items-center text-blue-900 underline  cursor-pointer">
              More
            </h1>
          </div>
        </div>
        {/* bottom content */}
      </div>
      <Footer />
    </>
  );
}
