import Router from "next/router";
import { useEffect } from "react";

export default function Home() {
  console.log("haloo");
  useEffect(() => {
    const { pathname } = Router;
    pathname === "/" && Router.push("/home");
  });
}
