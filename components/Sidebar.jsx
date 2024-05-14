/**
 * Sidebar component that displays a list of chats.
 * @returns {JSX.Element} Sidebar component UI.
 */
import { useAuth } from "@/context/authContext";
import { useScreenSize } from "@/context/screenSizeContext";
import ClickAwayListener from "react-click-away-listener";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Avatar from "./Avatar";
import Chats from "./Chats";
import LeftNav from "./LeftNav";

const Sidebar = () => {
  const { isSmallScreen, openLeftNav, setOpenLeftNav, setOpenSearch } = useScreenSize();
  const { currentUser } = useAuth();
  return (
    <>
      {isSmallScreen && (
        <ClickAwayListener onClickAway={() => {
          setOpenLeftNav(false);
        }} >
          <div className="relative">
            <div
              className={`w-full h-auto bg-c1 z-50 px-3 py-4 flex justify-between items-center`}
            >
              <div className="flex gap-2 items-center">
                <div className="border border-c3 p-[6px] rounded-md">
                  {openLeftNav ? (<IoClose
                    className={`text-md font-bold text-c3`}
                    onClick={() => {
                      setOpenLeftNav(false);
                      setOpenSearch(false);
                    }}
                  />) : (
                    <RxHamburgerMenu
                      className={`text-md font-bold text-c3`}
                      onClick={() => {
                        setOpenLeftNav(true);
                        setOpenSearch(false);
                      }}
                    />
                  )}
                </div>
                <p className="text-bold text-lg">ConnectYou</p>
              </div>

              <div className="flex gap-2">
                <div className="border border-c3 px-[5px] rounded-md flex items-center">
                  <IoIosSearch
                    className={`text-lg font-bold text-c3`}
                    onClick={() => {
                      setOpenSearch((prev) => !prev);
                      setOpenLeftNav(false);
                    }}
                  />
                </div>
                <Avatar user={currentUser} size="small" />
              </div>
            </div>
            <LeftNav />
          </div>

        </ClickAwayListener>
      )}
      <div
        className={`${isSmallScreen ? "w-full h-[98vh] p-1" : "w-[400px] h-[100vh] p-5"
          }  overflow-auto scrollbar shrink-0 border-r border-white/[0.05]`}
      >
        <div className="flex flex-col h-full">
          <Chats />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
