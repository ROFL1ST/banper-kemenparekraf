/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import Router, { useRouter } from "next/router";
import Banner from "./component/Banner";
import Isi from "./component/Isi";
import Small_Card_Loading from "./component/Small_Card_Loading";
import News_small_card from "./component/News_small_card";
import DetailCardLoading from "./component/detailCardLoading";
import Card from "../card";
import { getApi } from "../../api/restApi";

export default function DetailPage() {
  const [loading, setLoading] = React.useState(true);

  const loadingLength = [1, 2, 3, 4];
  const [items, setItem] = React.useState([]);
  const [detail, setDetail] = React.useState({ data: {}, loading2: true });
  var router = useRouter();

  const { id } = router.query;

  const getData = async () => {
    try {
      let respond = await getApi(`news/${id}`).then((result) => result);
      setDetail((s) => ({ ...s, data: respond.data.data[0], loading2: false }));
    } catch (error) {
      setLoading(false);
      setDetail((s) => ({ ...s, loading2: false }));
      console.log(error);
    }
  };

  const getList = async () => {
    const url = "http://128.199.242.242/api/news";
    try {
      let respond = await getApi("news").then((result) => result);
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
    getData();

    return () => {
      ac.abort();
    };
  }, [router]);
  const [more, setMore] = React.useState(false);
  const { data, loading2 } = detail;

  return (
    <>
      <Navbar />
      <div className="items-center flex h-full flex-col pb-10 pt-32 2xl:w-2/3 lg:w-11/12 mx-auto">
        <button onClick={()=>Router.back()}>
          <ArrowLeftCircleIcon className="h-8 w-8 text-blue-900 mb-5" />
        </button>
        <Banner data={data} loading2={loading2} />
        {/* Content */}
        <div className="relative pt-16 flex xl:justify-between lg:justify-between justify-center lg:w-full md:w-5/6 w-4/5 ">
          <div className="content-left xl:w-11/12 lg:w-11/12 flex flex-col">
            {/* detail text */}
            <div className="xl:w-11/12 lg:w-11/12 w-full text-base pb-10">
              {/* {reactElement} */}
              {data && !loading2 ? (
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
                  .map((i, index) =>
                    data.Id === i.Id ? (
                      <></>
                    ) : (
                      <News_small_card data={i} key={index}></News_small_card>
                    )
                  )
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
            {!loading2 && data ? (
              items.slice(0, 4).map((i, key) =>
                data.Id === i.Id ? (
                  <></>
                ) : (
                  <div
                    onClick={() => {
                      // getData();
                      setDetail((s) => ({ ...s, loading2: true }));

                      // console.log("hai")
                    }}
                    key={key}
                  >
                    <Card data={i} />
                  </div>
                )
              )
            ) : (
              <>
                <DetailCardLoading />
                <DetailCardLoading />
                <DetailCardLoading />
                <DetailCardLoading />
              </>
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
