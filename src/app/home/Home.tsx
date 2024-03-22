"use client";
import { ReactElement } from "react";

const Home = (): ReactElement => {
  return (
    <div className="bg-pa-home-grey h-full w-full flex flex-col justify-center items-center">
      <div className="font-bold text-pa-home-blue text-5xl my-4 animate-fade-up animate-duration-[1500ms] animate-delay-500">
        P.A INFOTEL COMPANY LIMITED
      </div>
      <div className="text-2xl animate-fade-up animate-duration-[1000ms] animate-delay-1000">
        Web App Dashboard for Hotel Administration
      </div>
    </div>
  );
};

export default Home;
