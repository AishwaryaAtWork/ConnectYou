import React from "react";
import Image from "next/image";
import logo from "@/public/favicon.ico";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Link as SLink } from "react-scroll";
import Link from "next/link";

const LandingFooter = () => {
  return (
    <>
      <div className="w-full h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>
      <div className="h-auto w-full bg-gradient-to-b from-c1 via-c2 to-c1 text-white flex flex-col items-center justify-between">
        <div className="w-7/12 h-[40vh] flex gap-5 justify-center items-center mt-8">
          <div className="w-[50%] h-full flex flex-col items-center justify-center gap-5">
            <div className="flex gap-1 text-4xl font-semibold items-center cursor-default">
              <Image src={logo} alt="ConnectYouLogo" height={68} width={68} />
              ConnectYou
            </div>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full cursor-pointer p-[1px] transition duration-300 transform hover:scale-105">
              <SLink to="home" smooth={true}>
                <div className="flex items-center justify-center p-3 gap-3 text-white font-semibold bg-c1 whitespace-nowrap h-full rounded-full">
                  <MdKeyboardDoubleArrowUp className="text-3xl"/>
                </div>
              </SLink>
            </div>
          </div>
          <div className="w-[50%] h-[80%] flex flex-col justify-center cursor-default">
            <p className="text-md  uppercase">Who We Are</p>
            <div className="list-none py-5 text-xl uppercase text-c3">
               <Link href='https://github.com/itsamit108' target="_blank" >
                    <li className="py-2 hover:text-white duration-500">Amit Gupta | App Developer</li>
                </Link>
                <Link href='https://github.com/Ayush40' target="_blank" >
                    <li className="py-2 hover:text-white duration-500">Ayush Aggarwal | Flutter Developer</li>
                </Link>
                <Link href='https://github.com/AishwaryaAtWork' target="_blank" >
                    <li className="py-2 hover:text-white duration-500">Aishwarya Pathak | Web Developer</li>
                </Link>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center my-5 cursor-default">
          <div className="h-[1px] w-7/12 bg-c3"></div>
          <p className="font-light p-4">
            Made by Team
            <span className="font-semibold"> ConncetYou </span> | &copy; 2024
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingFooter;
