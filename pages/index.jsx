import Router from "next/router";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const { pathname } = Router;
    pathname === "/" && Router.push("/dashboard");
  });
}
