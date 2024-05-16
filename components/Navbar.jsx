"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/favicon.ico";
import { Link as SLink } from "react-scroll";
import { usePathname } from "next/navigation";
import { useScreenSize } from "@/context/screenSizeContext";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";

const Navbar = () => {
  const path = usePathname();
  const { isSmallScreen, openMainSidebar, setOpenMainSidebar } = useScreenSize();
  
  const [sidebarPosition, setSidebarPosition] = useState('-right-[70vw]')
  
  useEffect(()=>{
    openMainSidebar ? 
    setSidebarPosition('-right-0')
    : setSidebarPosition('-right-[70vw]')

  }, [openMainSidebar])

  return (
    <div className="fixed top-0 z-50">
      <div className="bg-c1 px-4 py-2 md:p-4 h-auto w-[100vw] flex items-center justify-between ">
        {/* Logo and name  */}
        <Link href="/">
          <div className="text-xl md:text-3xl font-bold text-white flex items-center gap-1">
            <Image src={logo} alt="ConnectYouLogo" height={42} width={42} />
            ConnectYou
          </div>
        </Link>

        {isSmallScreen ? (
          <>
            {/* For small screens  */}
            <div className="border border-c3 p-[6px] rounded-md">
              {openMainSidebar ? (
                <IoClose
                  className={`text-md font-bold text-c3`}
                  onClick={() => setOpenMainSidebar(false)}
                />
              ) : (
                <RxHamburgerMenu
                  className={`text-md font-bold text-c3`}
                  onClick={() => setOpenMainSidebar(true)}
                />
              )}
            </div>
          </>
        ) : (
          <>
            {/* Nav links  */}
            <div className="flex gap-5 text-xl text-c3 list-none">
              <Link href="/">
                <li className="hover:text-white duration-500">Home</li>
              </Link>
              <Link href="/faq">
                <li className="hover:text-white duration-500">FAQ</li>
              </Link>
              {path === "/" ? (
                <SLink to="features" smooth={true}>
                  <li className="hover:text-white duration-500 cursor-pointer">
                    Features
                  </li>
                </SLink>
              ) : (
                <Link href="/#features">
                  <li className="hover:text-white duration-500 cursor-pointer">
                    Features
                  </li>
                </Link>
              )}
            </div>

            {/* Login and Sign Up buttons */}
            <div className="flex items-center gap-4">
              {/* Login button */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-full rounded-md cursor-pointer p-[1px] transition duration-300 transform hover:scale-105">
                <Link href="/login">
                  <div className="flex items-center justify-center px-5 py-2 gap-3 text-white font-semibold bg-c1 whitespace-nowrap h-full rounded-md">
                    Log In
                  </div>
                </Link>
              </div>

              {/* Sign Up button */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-full rounded-md cursor-pointer p-[1px] transition duration-300 transform hover:scale-105">
                <Link href="/register">
                  <div className="flex items-center justify-center px-5 py-2 gap-3 text-white font-semibold bg-c1 whitespace-nowrap h-full rounded-md">
                    Sign Up
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Main sidebar for small screens  */}

        <div className={`w-[64vw] h-[90vh] bg-c1 absolute top-16 ${sidebarPosition} transition-all ease-in-out duration-500 
          rounded-l-xl shadow-lg shadow-gray-400 p-8 overflow-hidden flex flex-col justify-between`} >
          {/* Nav links  */}
          <div className="text-2xl text-c3 list-none">
            <Link href="/" onClick={()=>setOpenMainSidebar(false)}>
              <li className="hover:text-white duration-500 py-3">Home</li>
            </Link>
            <Link href="/faq" onClick={()=>setOpenMainSidebar(false)}>
              <li className="hover:text-white duration-500 py-3">FAQ</li>
            </Link>
            {path === "/" ? (
              <SLink to="features" smooth={true}>
                <li className="hover:text-white duration-500 cursor-pointer py-3" onClick={()=>setOpenMainSidebar(false)}>
                  Features
                </li>
              </SLink>
            ) : (
              <Link href="/#features" onClick={()=>setOpenMainSidebar(false)}>
                <li className="hover:text-white duration-500 cursor-pointer py-3">
                  Features
                </li>
              </Link>
            )}
          </div>

          {/* Login and Sign Up buttons */}
          <div className="flex flex-col items-center gap-4 pb-3">
            {/* Login button */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-full rounded-md cursor-pointer p-[1px] transition duration-300 transform hover:scale-105">
              <Link href="/login" onClick={()=>setOpenMainSidebar(false)}>
                <div className="flex items-center justify-center px-5 py-2 gap-3 text-white font-semibold bg-c1 whitespace-nowrap h-full rounded-md">
                  Log In
                </div>
              </Link>
            </div>

            {/* Sign Up button */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-full rounded-md cursor-pointer p-[1px] transition duration-300 transform hover:scale-105">
              <Link href="/register" onClick={()=>setOpenMainSidebar(false)}>
                <div className="flex items-center justify-center px-5 py-2 gap-3 text-white font-semibold bg-c1 whitespace-nowrap h-full rounded-md">
                  Sign Up
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>
    </div>
  );
};

export default Navbar;