'use client'
import Image from "next/image";
import img from "@/public/mobileViewImg.png";
import Link from "next/link";
import { useEffect, useState } from "react";

const WelcomeAnimation = () => {

    const [imgVal, setImgVal]= useState({right: '-right-[10vw]', opacity: 'opacity-0'})
    const [textVal, setTextVal]= useState({left: '-left-[10vw]', opacity: 'opacity-0'})
    const [textVal2, setTextVal2]= useState({left: '-left-[10vw]', opacity: 'opacity-0'})

    useEffect(()=>{
        setTimeout(()=>{
            setTextVal({left: 'left-0', opacity: 'opacity-100'})
        }, 100)
        setTimeout(()=>{
            setImgVal({right: 'right-10', opacity: 'opacity-100'})
        }, 660)
        setTimeout(()=>{
            setTextVal2({left: 'left-0', opacity: 'opacity-100'})
        }, 1500)
    },[])

  return (
    <div className="h-[100vh] w-full bg-gradient-to-b from-c1 to-c2 flex flex-col-reverse md:flex-row 
    items-center justify-center mt-12">
      <div className="m-3 md:mr-2 w-10/12 md:w-5/12 lg:w-3/12 h-[56%] overflow-hidden relative">
       <div className={`absolute top-0 ${textVal.left} ${textVal.opacity} h-full w-full transition-all 
            duration-700 ease-in`}>
       <p className="text-3xl lg:text-5xl font-bold ">
          Keep in touch with your friends and family
        </p>

        <div  className={`absolute ${textVal2.left} ${textVal2.opacity} h-full w-full transition-all 
            duration-700 ease-in`}>
        <p className="text-c3 text-justify text-sm md:text-xl font-light py-5">
          Effortlessly connect with loved ones, share your world, and discover
          endless connections with our intuitive chat application—where every
          interaction sparks a new journey. Join today and unlock the power of
          meaningful connections, effortlessly.
        </p>

        <Link href='/faq' className="font-extralight text-sm md:text-lg flex gap-2">
            <div className="w-fit overflow-hidden">
            Learn More 
            <div className="w-full h-px mt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>
            </div>
            {" > "}
        </Link>

        </div>
       </div>
      </div>

      <div className="ml-2 w-8/12 md:w-5/12 lg:w-3/12 relative h-[70vh] md:h-[65vh] overflow-hidden">
        <Image src={img} alt="ConnectYou" height={260} width={260} className={`absolute top-[8%] md:top-0 ${imgVal.right} ${imgVal.opacity} transition-all 
            duration-700 ease-in rounded-xl shadow-md shadow-c3 h-[90%] lg:h-[98%] w-auto`}/>
      </div>
    </div>
  );
};

export default WelcomeAnimation;
