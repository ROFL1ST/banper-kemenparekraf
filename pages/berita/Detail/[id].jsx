/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Card from "../card";
import DetailCardLoading from "./detailCardLoading";
import News_small_card from "./News_small_card";
import Small_Card_Loading from "./Small_Card_Loading";
import { useRouter } from "next/router";
export default function DetailPage() {
  const [loading, setLoading] = React.useState(true);

  const loadingLength = [1, 2, 3, 4];
  const [items, setItem] = React.useState([]);
  const [detail, setDetail] = React.useState({ data: {}, loading2: true });
  var router = useRouter();

  const { id } = router.query;
  const viewss = async () => {
    const url = `http://128.199.242.242/api/news/${id}`;
    try {
      let respond = await axios.put(url);
    } catch (error) {
      console.log(error);
    }
  };
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
      viewss();
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
  // console.log(router.query.id);
  return (
    <>
      <Navbar />
      <div className=" items-center flex h-full flex-col pb-10 pt-36 xl:w-2/3 lg:w-2/3 mx-auto">
        {/* Banner For Dekstop */}
        {data && !loading2 ? (
          <div
            className="xl:flex lg:flex hidden    h-full  bg-no-repeat bg-cover justify-center rounded-3xl"
            style={{
              backgroundImage: `url(https://akcdn.detik.net.id/visual/2019/05/08/6824f661-c2d9-4b41-a61b-ae80e9f8d62c_169.jpeg?w=1050)`,
            }}
          >
            <div className="px-10 py-10 bg-black bg-opacity-25 rounded-3xl">
              <div className=" lg:flex-grow  lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left pt-64 text-white ">
                <div>
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium w-3/4">
                    {data.Judul}
                  </h1>
                  <p className="mb-8 leading-relaxed w-3/4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Doloremque corporis quidem et, magnam debitis rem hic
                    dolorem sapiente explicabo repudiandae.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" w-full h-96 rounded-2xl bg-gray-300 animate-pulse">
            <div className="space-y-2 pt-72 px-10">
              <div className="text-xs font-bold h-4 w-1/2 bg-gray-500 rounded-full"></div>
              <div className="text-xs font-bold h-4 w-1/4 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        )}
        {/* Banner For Dekstop */}
        {/* <!-- Banner For Mobile --> */}
        <div className="flex px-5 flex-col justify-center items-center pt-5 xl:hidden lg:hidden w-11/12">
          <h1 className="title-font sm:text-xl text-3xl mb-4 font-bold pt-5 pb-2">
            Banper Infrastruktur Ekraf
          </h1>

          <img
            src="https://akcdn.detik.net.id/visual/2019/05/08/6824f661-c2d9-4b41-a61b-ae80e9f8d62c_169.jpeg?w=1050"
            className="rounded-3xl"
            alt=""
          />
        </div>
        {/* <!-- Banner For Mobile --> */}
        {/* Content */}
        <div className="relative pt-16  flex xl:justify-between lg:justify-between justify-center lg:w-full w-4/5 ">
          <div className="content-left xl:w-11/12 lg:w-11/12 flex flex-col">
            {/* detail text */}
            <div className="xl:w-11/12 lg:w-11/12 w-full text-lg pb-10">
              <h1 className="">
                <span className="capitalize font-bold">
                  Maros, 23 November 2021
                </span>{" "}
                - Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Libero, maxime consequuntur tenetur dolorum, aliquam molestias
                facilis voluptate possimus eligendi commodi ipsam laudantium
                accusamus dolor similique recusandae aliquid nihil, qui veniam
                aperiam vitae veritatis voluptatibus magni? Culpa repellendus
                possimus dicta eveniet, voluptate exercitationem. Doloremque
                aspernatur eveniet porro repellat. Fugit corrupti molestiae
                libero minima laudantium aliquid quisquam, mollitia saepe.
                Deleniti ad fugiat possimus libero voluptate eos voluptatibus,
                officiis placeat, aut commodi eum non accusantium nobis fuga. At
                deserunt vitae quo incidunt, recusandae doloribus ea tenetur
                totam nam fugiat quibusdam laudantium blanditiis, quasi
                accusamus cum sapiente voluptatem sit reiciendis iusto delectus
                hic dolore.
              </h1>
              <h1 className="pt-14">Why Do We Use It?</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Architecto sed porro dicta sunt veniam officiis eius, voluptatum
                nam incidunt distinctio illo asperiores, tenetur sint facere
                labore qui necessitatibus repellendus velit ipsa accusantium
                assumenda minus! Tempora odio vero dolor, eum laboriosam soluta
                incidunt quibusdam accusantium quos delectus iusto molestias hic
                neque.
              </p>
              <img
                className="mt-12 rounded-3xl"
                src="https://akcdn.detik.net.id/visual/2019/05/08/6824f661-c2d9-4b41-a61b-ae80e9f8d62c_169.jpeg?w=1050"
                alt=""
              />
              <h1 className="pt-14">Why Do We Use It?</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Architecto sed porro dicta sunt veniam officiis eius, voluptatum
                nam incidunt distinctio illo asperiores, tenetur sint facere
                labore qui necessitatibus repellendus velit ipsa accusantium
                assumenda minus! Tempora odio vero dolor, eum laboriosam soluta
                incidunt quibusdam accusantium quos delectus iusto molestias hic
                neque.
              </p>
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

          <div className="pt-16  grid lg:grid-cols-4 grid-cols-1 lg:gap-x-1 gap-x-4 pb-16 w-full">
            {" "}
            {loading ? (
              <>
                <DetailCardLoading />
                <DetailCardLoading />

                <DetailCardLoading />

                <DetailCardLoading />
              </>
            ) : (
              items.slice(0, 4).map((i, key) => <Card data={i} key={key} />)
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
