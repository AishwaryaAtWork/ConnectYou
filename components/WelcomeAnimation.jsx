'use client'
import Image from "next/image";
import img from "@/public/favicon.ico";
import Link from "next/link";
import { useEffect, useState } from "react";

const WelcomeAnimation = () => {

    const [imgVal, setImgVal]= useState({right: '-right-[18vw]', opacity: 'opacity-0'})
    const [textVal, setTextVal]= useState({left: '-left-[22vw]', opacity: 'opacity-0'})
    const [textVal2, setTextVal2]= useState({left: '-left-[22vw]', opacity: 'opacity-0'})

    useEffect(()=>{
        setTimeout(()=>{
            setTextVal({left: 'left-0', opacity: 'opacity-100'})
        }, 100)
        setTimeout(()=>{
            setImgVal({right: 'right-0', opacity: 'opacity-100'})
        }, 660)
        setTimeout(()=>{
            setTextVal2({left: 'left-0', opacity: 'opacity-100'})
        }, 1500)
    },[])

  return (
    <div className="h-[90vh] w-full bg-gradient-to-b from-c1 to-c2 flex items-center justify-center ">
      <div className="mr-3 w-3/12 h-[56%] overflow-hidden relative">
       <div className={`absolute top-0 ${textVal.left} ${textVal.opacity} h-full w-full transition-all 
            duration-700 ease-in`}>
       <p className="text-5xl font-bold ">
          Keep in touch with your friends and family
        </p>

        <div  className={`absolute ${textVal2.left} ${textVal2.opacity} h-full w-full transition-all 
            duration-700 ease-in`}>
        <p className="text-c3 text-justify text-xl font-light py-5">
          Effortlessly connect with loved ones, share your world, and discover
          endless connections with our intuitive chat application—where every
          interaction sparks a new journey. Join today and unlock the power of
          meaningful connections, effortlessly.
        </p>

        <Link href='/faq' className="font-extralight text-lg flex gap-2">
            <div className="w-fit overflow-hidden">
            Learn More 
            <div className="w-full h-px mt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>
            </div>
            {" > "}
        </Link>

        </div>
       </div>
      </div>

      <div className="ml-3 w-3/12 relative h-[45vh] overflow-hidden">
        <Image src={img} alt="ConnectYou" height={390} width={390} className={`absolute top-0 ${imgVal.right} ${imgVal.opacity} transition-all 
            duration-700 ease-in`}/>
      </div>
    </div>
  );
};

export default WelcomeAnimation;
