import Link from "next/link";
import { useEffect, useState } from "react";
import Background from "../components/background";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Section from "../components/section";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getApi, login } from "../api/restApi";
import Router from "next/router";
import Loading from "../components/Loading";
export default function Daftar() {
  useEffect(() => {
    document.title = "Daftar";
  });

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [erros, setError] = useState("");

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await login("register", values).then((result) => {
        setLoading(false);

        console.log(result.data);
        if (result.data.message == "Success") {
          Router.push(`/auth/Verification/${getValues("Email")}`);
          sessionStorage.setItem("emailState", getValues("Email"));
        } else {
          alert(result.data.display_message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [load, setLoad] = useState(true);

  //   kategori
  const [kategori, setKategori] = useState([]);
  const getKateg = async () => {
    try {
      await getApi("master/kategori").then((result) => {
        setKategori(result.data.data);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   sub
  const [sub, setSub] = useState([]);
  const getSub = async () => {
    try {
      await getApi("master/subsektor").then((result) => {
        setSub(result.data.data);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // kota
  const [kota, setKota] = useState([]);
  const getKota = async () => {
    try {
      await getApi("master/kota").then((result) => {
        setKota(result.data.data);
        setLoad(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKateg();
    getSub();
    getKota();
  }, []);
  console.log(getValues("Email"));
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2017/05/19/06/22/desk-2325627_960_720.jpg)",
        }}
        className="bg-gray-200 w-full h-full  bg-cover rounded-b-3xl"
      >
        <div className="bg-white w-full h-full bg-opacity-90 lg:pt-32 lg:p-0 p-60 px-9  rounded-b-3xl">
          <Section text={"Daftar"} />
          <form className="mb-20" onSubmit={handleSubmit(onSubmit)}>
           
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
