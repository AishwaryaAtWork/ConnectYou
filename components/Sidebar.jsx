/**
 * Sidebar component that displays a list of chats.
 * @returns {JSX.Element} Sidebar component UI.
 */
import React from "react";
import Chats from "./Chats";
import { useScreenSize } from "@/context/screenSizeContext";

const Sidebar = () => {
    const { isSmallScreen } = useScreenSize();
    return (
        <div className={`w-${isSmallScreen ? "full p-1" : "[400px] p-5"} h-[100vh] overflow-auto scrollbar shrink-0 border-r border-white/[0.05]`}>
            <div className="flex flex-col h-full">
                <Chats />
            </div>
        </div>
    );
};

export default Sidebar;
