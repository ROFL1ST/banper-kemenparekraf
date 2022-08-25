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
      <div className="py-24">
        <Menu />
        <div className="grid grid-cols-4 gap-3">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
      </div>
    </>
  );
}
