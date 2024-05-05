import Link from "next/link";
import Image from "next/image";
import logo from "@/public/favicon.ico";
import { Link as SLink } from "react-scroll";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const path = usePathname()
  
  return (
    <div className="fixed top-0 z-50">
    <div className="bg-c1 p-4 h-auto w-[100vw] flex items-center justify-between ">
        
        {/* Logo and name  */}
        <Link href="/">
        <div className="text-xl md:text-3xl font-bold text-white flex items-center gap-1">
            <Image src={logo} alt="ConnectYouLogo" height={42} width={42}/>
            ConnectYou 
          </div>
        </Link>

        {/* Nav links  */}
        <div className="flex gap-5 text-xl text-c3 list-none">
            <Link href="/">
                <li className="hover:text-white duration-500">Home</li>
            </Link>
            <Link href="/faq">
                <li className="hover:text-white duration-500">FAQ</li>
            </Link>
            {path === '/' ? 
              <SLink to="features" smooth={true}>
                <li className="hover:text-white duration-500 cursor-pointer">Features</li>
              </SLink> : 
              <Link href='/#features'>
                <li className="hover:text-white duration-500 cursor-pointer">Features</li>
              </Link>
              }
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

          {/* Spacer for mobile layout */}
          {/* <div className="w-2 h-2 md:hidden"></div> */}

          {/* Sign Up button */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-full rounded-md cursor-pointer p-[1px] transition duration-300 transform hover:scale-105">
            <Link href="/register">
            <div className="flex items-center justify-center px-5 py-2 gap-3 text-white font-semibold bg-c1 whitespace-nowrap h-full rounded-md">
                Sign Up
              </div>
            </Link>
          </div>
        </div>
    </div>
    <div className="w-full h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>
    </div>
  );
};

export default Navbar;
