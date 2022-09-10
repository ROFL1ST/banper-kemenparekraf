import React from "react";
import parse from "html-react-parser";

export default function Isi({ data }) {
  const reactElement = parse(`${data}`);
//   console.log(reactElement[0]);
  return reactElement;
}
