/**
 * Home component that renders the main page of the application.
 * @returns {JSX.Element} The Home component.
 */
import Chat from "@/components/Chat";
import ChatBox from "@/components/ChatBox";
import LandingPage from "@/components/LandingPage";
import LeftNav from "@/components/LeftNav";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import { useScreenSize } from "@/context/screenSizeContext";
import { isMobile } from "react-device-detect";
import { RxHamburgerMenu } from "react-icons/rx";

const Home = () => {
  const { currentUser, isLoading } = useAuth();
  const { data } = useChatContext();
  const { isSmallScreen, openLeftNav, setOpenLeftNav } = useScreenSize();

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    return (
      <>
        <LandingPage />
      </>
    );
  }

  // if (isMobile) {
  //     return (
  //         <div className="h-[100vh] flex justify-center items-center bg-c1">
  //             <div className="text-center px-4">
  //                 <div className="text-2xl font-bold mb-4">
  //                     Mobile Experience Coming Soon
  //                 </div>
  //                 <p className="text-gray-600">
  //                     We are actively working on creating a mobile-friendly version of ConnectYou. Please continue to use the desktop version for the best experience.
  //                 </p>
  //             </div>
  //         </div>);
  // }

  return (
    <>
      {isSmallScreen && (<>
        <div className="w-full h-auto bg-c1 border-2 border-black z-50 px-5 py-2 flex justify-between items-center">
        <RxHamburgerMenu className="text-2xl font-bold text-c3" onClick={()=>setOpenLeftNav((prev)=>!prev)}/>
        <p className="text-bold text-lg">ConnectYou</p>
      </div>
      {/* <div className="w-full h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div> */}
      </>)}
      <div className="bg-c1 flex ">
        <div className="flex w-full shrink-0 overflow-hidden relative">
          <LeftNav />
          <div className="flex bg-c2 w-full ">
            <div
              className={`${isSmallScreen ? "w-full" : "md:w-7/12 xl:w-3/12"}`}
            >
              <Sidebar />
            </div>
            <ChatBox data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
