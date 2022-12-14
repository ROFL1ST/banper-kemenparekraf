/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../components/navbar";
import { useEffect, useState, useRef } from "react";
import Menu from "./menu/menu";
import Card from "./card";
import Footer from "../components/footer";
import CardLoading from "./cardLoading";
import Modal from "../components/modal";
import { getApi } from "../api/restApi";
import { useRouter } from "next/router";

export default function Berita() {
  const [open, setOpen] = useState(false);

  const loadingLength = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cancelButtonRef = useRef(null);
  const { query } = useRouter();
  const { sort, type, sub_id } = query;
  var router = useRouter();

  const getData = async (sort) => {
    try {
      let respond = await getApi(
        `news?limit=15&${
          sub_id !== undefined && `subsektorId=${sub_id}`
        }&sort=${sort}`
      );
      setData(respond.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    getData();

    return () => {
      ac.abort();
    };
  }, [loading]);
  useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);
  useEffect(() => {
    document.title = "Berita";
  });
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <Menu data={data} getData={getData} setLoading={setLoading} />
      <div className="pb-20 xl:px-20 lg:px-20  px-10">
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 grid-cols-1 gap-3 mt-10">
          {loading
            ? loadingLength.map((i, key) => <CardLoading key={key} />)
            : data.map((i, key) => <Card data={i} key={key} />)}
        </div>
      </div>
      <Footer />
      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      ></Modal>
    </>
  );
}
