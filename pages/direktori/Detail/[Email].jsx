import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { getApi } from "../../api/restApi";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import empty from "../../assets/Empty-amico.png";
export default function Detail() {
  React.useEffect(() => {
    document.title = "Detail";
  });

  const [detail, setDetail] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  var router = useRouter();

  const { Email } = router.query;
  console.log(Email);

  const getData = async () => {
    try {
      await getApi(`pengusul/${Email}`).then((result) => {
        setDetail(result.data.data[0]);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, [router.isReady]);

  const [content, setContent] = React.useState([]);
  const [load, setLoad] = React.useState(true);

  const getDetail = async () => {
    try {
      await getApi(`pengusul/news?limit=10&offset=0&email=${Email}`).then(
        (result) => {
          setContent(result.data.data);
          setLoad(false);
        }
      );
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  React.useEffect(() => {
    getDetail();
  }, [router.isReady]);

  return (
    <>
      <Navbar />

      {!loading ? (
        <>
          <div className=" px-5 py-6 mx-auto pt-28">
            <div className="bg-slate-300 py-7 flex flex-col text-center w-full rounded-lg">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 pt-10">
                {detail.NamaKomunitas ?? "Nama Tidak Tersedia"}
              </h1>
              <img
                className="h-40 w-40 rounded-full  mx-auto bg-cover "
                src="https://dummyimage.com/720x400"
              />
            </div>
          </div>
          <div className="px-5 py-24 mx-auto pt-8">
            <div className="flex flex-wrap -m-4">
              {!load ? (
                content.length != 0 ? (
                  content?.map((i, key) => <Card data={i} key={key} />)
                ) : (
                  <>
                    <div className="relative  mx-auto   items-center justify-center flex flex-col mt-20 pb-20">
                      <img
                        src={empty.src}
                        className="lg:h-96 h-72 w-auto"
                        alt=""
                      />
                      <p className="font-bold">Berita Tidak Tersedia</p>
                    </div>
                  </>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            role="status"
            className="flex justify-center items-center p-60 lg:p-96"
          >
            <svg
              aria-hidden="true"
              className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

function Card({ data }) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const viewss = async () => {
    try {
      let respond = await PutViews(`news/${data.Id}`).then((result) => result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link href={`/berita/Detail/${data.Id}`}>
        <div
          onClick={() => {
            viewss();
          }}
          draggable="true"
          className="bg-[#f5f5fa] w-full h-80 rounded-2xl"
        >
          <div
            className="w-full h-1/2 bg-cover rounded-t-2xl bg-center"
            style={{
              backgroundImage: `url(${data.foto})`,
            }}
          ></div>
          <div className="px-5 py-1">
            <small className="text-xs font-bold text-gray-500">
              {formatter.format(Date.parse(data.CreatedAt))}
            </small>
            {data.Judul.length > MAX_LENGTH ? (
              <h3 className="my-3 font-bold capitalize h-16 lg:text-sm 2xl:text-base">
                {`${data.Judul.substring(0, MAX_LENGTH)}    ...`}
              </h3>
            ) : (
              <h3 className="my-3 font-bold capitalize h-16 text-ellipsis lg:text-sm 2xl:text-base">
                {data.Judul}
              </h3>
            )}
            <small className="text-xs font-bold text-blue-900">
              {data.NamaKota}
            </small>
          </div>
        </div>
      </Link>
    </>
  );
}
