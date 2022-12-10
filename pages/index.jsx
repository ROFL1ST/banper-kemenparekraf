import Router from "next/router";
import { useEffect } from "react";
import LogRocket from "logrocket";
LogRocket.init("kzccep/banper");
export default function Home() {
  useEffect(() => {
    const { pathname } = Router;
    pathname === "/" && Router.push("/home");
  });
}
