/**
 * Home component that renders the main page of the application.
 * @returns {JSX.Element} The Home component.
 */
import Chat from "@/components/Chat";
import LandingPage from "@/components/LandingPage";
import LeftNav from "@/components/LeftNav";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import { useScreenSize } from "@/context/screenSizeContext";
import { isMobile } from 'react-device-detect';

const Home = () => {
    const { currentUser, isLoading } = useAuth();
    const { data } = useChatContext();
    const { isSmallScreen, openChatBox } = useScreenSize();

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
        <div className="bg-c1 flex ">
            <div className="flex w-full shrink-0 overflow-hidden relative">
                <LeftNav />
                <div className="flex bg-c2 w-full ">
                    <div className={`${isSmallScreen ? "w-full" : "md:w-7/12 xl:w-3/12"}`}>
                    <Sidebar />
                    </div>
                    <div className={`bg-c2 ${isSmallScreen ? `z-40 absolute -right-${openChatBox ? "0" : "[100vw]"} 
                    w-full h-full transition-all duration-500 ease-in-out ` : "w-full"}`}>
                    {!data.user ? (
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="text-center">
                                <span
                                    role="img"
                                    aria-label="No chats"
                                    className="text-6xl mb-4"
                                >
                                    🤷‍♂️
                                </span>
                                <p className="text-gray-600 text-lg">
                                    There are no chats to show.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <Chat />
                    )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
