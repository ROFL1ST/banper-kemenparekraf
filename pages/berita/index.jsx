import Navbar from "../components/navbar";
import { useEffect } from "react";
import Menu from "./menu";
import Card from "./card";

export default function Berita() {
  useEffect(() => {
    document.title = "Berita";
  });
  return (
    <>
      <Navbar />
      <Menu />
      <div className="pb-20 xl:px-20 px-10">
        <div className="grid xl:grid-cols-4 gap-3 mt-10">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
