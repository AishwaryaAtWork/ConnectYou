/**
 * Home component that renders the main page of the application.
 * @returns {JSX.Element} The Home component.
 */
import ChatBox from "@/components/ChatBox";
import Icon from "@/components/Icon";
import LandingPage from "@/components/LandingPage";
import LeftNav from "@/components/LeftNav";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import UsersPopup from "@/components/popup/UsersPopup";
import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import { useScreenSize } from "@/context/screenSizeContext";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const Home = () => {
  const [userPopup, setUserPopup] = useState(false);
  const { currentUser, isLoading } = useAuth();
  const { data } = useChatContext();
  const { isSmallScreen, setOpenLeftNav, setOpenSearch } = useScreenSize();

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
        {userPopup && <UsersPopup onHide={() => setUserPopup(false)} />}

        {/* <div className="w-full h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div> */}
      </>)}
      <div className="bg-c1 flex ">
        <div className="flex w-full shrink-0 overflow-hidden relative">
          {!isSmallScreen && <LeftNav />}
          <div className="flex bg-c2 w-full ">
            <div
              className={`${isSmallScreen ? "w-full" : "md:w-7/12 xl:w-3/12"}`}
            >
              <Sidebar />
              {isSmallScreen && <Icon
                size="x-large"
                className={`bg-green-500 hover:bg-green-600 absolute top-[86%] right-6 z-40`}
                icon={<FiPlus size={24} />}
                onClick={() => {
                  setUserPopup(!userPopup);
                  setOpenSearch(false);
                  setOpenLeftNav(false);
                }}
              />}
            </div>
            <ChatBox data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
