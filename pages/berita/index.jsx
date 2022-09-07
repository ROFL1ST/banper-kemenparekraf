import Navbar from "../components/navbar";
import { useEffect, useState, useRef } from "react";
import Menu from "./menu";
import Card from "./card";
import axios from "axios";
import Footer from "../components/footer";
import CardLoading from "./cardLoading";
import Modal from "../components/modal";

export default function Berita() {
  const [open, setOpen] = useState(false);

  const loadingLength = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cancelButtonRef = useRef(null);

  const getData = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "true",
      },
    };
    const url = "http://128.199.242.242/api/news";
    try {
      let respond = await axios.get(url, config);
      console.log(respond.data.data, "hai");
      setData(respond.data.data);
      setId(respond.data.data.length);
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
  }, []);
  useEffect(() => {
    document.title = "Berita";
  });
  console.log(data);
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />

      <Menu />
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
