import React from "react";
import Link from "next/link";
import {useEffect, useState} from "react";
import NextImage from "next/image.js";
import {useRouter} from "next/router";

// import dynamic from "next/dynamic";

export default function Home() {
  const router = useRouter();
  const background = "/images/background_index.jpg";
  const Image = NextImage.default;

  // const ModelViewer = dynamic(() => import("../components/ModelViewer"), {ssr: false});
  return (
    <div className="flex items-center justify-center text-[25px] md:text-[75px] xl:text-[150px] min-h-[90vh] text-white w-full">
      <Image src={background} alt="bg" layout="fill" objectFit="cover" className="" />

      <div className="z-10">
        <div className="bg-white bg-opacity-40 rounded-xl p-4">
          <div className="text-white font-bold">
            Welcome!{" "}
            <span onClick={() => router.push("/home/example_work")} className="text-white hover:text-yellow-500 hover:cursor-pointer">
              {">"}
            </span>
          </div>
          <div></div>
        </div>
      </div>

      {/* <ModelViewer /> */}
    </div>
  );
}
