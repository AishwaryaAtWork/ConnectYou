'use client'
import Image from "next/image";
import img from "@/public/favicon.ico";
import Link from "next/link";
import { useEffect, useState } from "react";

const WelcomeAnimation = () => {

    const [val, setVal]= useState('-right-[22vw]')

    useEffect(()=>{
        setTimeout(()=>{
            setVal("right-0")
        }, 200)
    },[])

  return (
    <div className="h-[90vh] w-full mt-10 flex items-center justify-center ">
      <div className="mr-3 w-3/12 overflow-clip relative">
       <div className="abolute top-0 left-0">
       <p className="text-5xl font-bold pb-5">
          Keep in touch with your friends and family
        </p>
        <p className="text-c3 text-justify py-3">
          Effortlessly connect with loved ones, share your world, and discover
          endless connections with our intuitive chat application—where every
          interaction sparks a new journey. Join today and unlock the power of
          meaningful connections, effortlessly.
        </p>

        <Link href='/' className="font-extralight text-md flex gap-2">
            <div className="w-fit overflow-hidden">
            Learn More 
            <div className="w-full h-px mt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>
            </div>
            {" > "}
        </Link>

       </div>
      </div>

      <div className="ml-3 w-3/12 relative h-[45vh] overflow-hidden">
        <Image src={img} alt="ConnectYou" height={380} width={380} className={`absolute top-0 ${val} transition-all duration-500 ease-in`}/>
      </div>
    </div>
  );
};

export default WelcomeAnimation;
