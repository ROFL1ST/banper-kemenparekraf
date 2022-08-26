import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import Menu from "./menu";
import Card from "./card";
import axios from "axios";
import Footer from "../components/footer";
import CardLoading from "./cardLoading";

export default function Berita() {
  const loadingLength = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    const url =
      "https://newsapi.org/v2/top-headlines?country=id&apiKey=3b9daef080ac4675ad714bbf3e0c148a";
    try {
      let respond = await axios.get(url);
      console.log(respond.data.articles);
      setData(respond.data.articles);
      setId(respond.data.articles.length);
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
      <Navbar />
      <Menu />
      <div className="pb-20 xl:px-20 lg:px-20  px-10">
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 grid-cols-1 gap-3 mt-10">
          {loading
            ? loadingLength.map((i, key) => <CardLoading key={key} />)
            : data.map((i, key) => <Card data={i} key={key} />)}
        </div>
      </div>
      <Footer />
    </>
  );
}
