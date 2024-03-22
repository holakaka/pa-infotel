"use client";

import { ReactElement } from "react";
import useWindowDimensions from "@/hook/useWindowDimension";
import LeftBarMbl from "./LeftBarMbl";
import Home from "./Home";

export default function Page(): ReactElement {
  const { width } = useWindowDimensions();

  return (
    <div className="">
      {!width ? <div>Loading...</div> : width > 768 ? <Home /> : <LeftBarMbl />}
    </div>
  );
}
