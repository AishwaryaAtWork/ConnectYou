/**
 * ChatHeader component displays the header for a chat screen.
 * Shows the chat partner's name, online status, profile picture.
 * Has controls for chat menu.
 */
import { useChatContext } from "@/context/chatContext";
import { useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { GoDeviceCameraVideo } from "react-icons/go";
import Avatar from "./Avatar";
import ChatMenu from "./ChatMenu";
import Icon from "./Icon";

const ChatHeader = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const { users, data } = useChatContext();
    const online = users[data.user.uid]?.isOnline;
    const user = users[data.user.uid];
    return (
        <div className="flex justify-between items-center pb-5 border-b border-white/[0.05]">
            {user && (
                <div className="flex items-center gap-3">
                    <Avatar size="large" user={user} />
                    <div>
                        <div className="font-medium line-clamp-1">{user.displayName}</div>
                        <p className="text-sm text-c3">
                            {online ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
            )}
            <div className="flex items-center gap-1">
                <Icon
                    size="large"
                    className={`${showMenu ? "bg-c1" : ""}`}
                    // onClick={() => }
                    icon={
                        <GoDeviceCameraVideo
                            size={23}
                            className="text-white"
                        />
                    }
                />
                <Icon
                    size="large"
                    className={`${showMenu ? "bg-c1" : ""}`}
                    // onClick={() => }
                    icon={
                        <LuPhone
                            size={19}
                            className="text-white"
                        />
                    }
                />
                <Icon
                    size="large"
                    className={`${showMenu ? "bg-c1" : ""}`}
                    onClick={() => setShowMenu(true)}
                    icon={
                        <IoEllipsisVerticalSharp
                            size={20}
                            className="text-c3"
                        />
                    }
                />
                {showMenu && (
                    <ChatMenu setShowMenu={setShowMenu} showMenu={showMenu} />
                )}
            </div>
        </div>
    );
};

export default ChatHeader;
