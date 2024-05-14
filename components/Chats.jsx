/**
 * Renders the Chats component which displays the list of chats and handles chat selection.
 * @returns {JSX.Element} The Chats component.
 */
import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import { useScreenSize } from "@/context/screenSizeContext";
import { db } from "@/firebase/firebase";
import { formatDate } from "@/utils/helpers";
import {
    Timestamp,
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import Avatar from "./Avatar";

const Chats = () => {
    const [search, setSearch] = useState("");
    const [unreadMsgs, setUnreadMsgs] = useState({});

    const isUsersFetchedRef = useRef(false);
    const isBlockExecutedRef = useRef(false);

    const { currentUser } = useAuth();
    const { isSmallScreen, setOpenChatBox, setOpenLeftNav, openSearch, setOpenSearch } = useScreenSize();
    const {
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        users,
        setUsers,
        data,
        dispatch,
        resetFooterStates,
    } = useChatContext();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const updatedUsers = {};
            snapshot.forEach((doc) => {
                updatedUsers[doc.id] = doc.data();
            });
            setUsers(updatedUsers);
            if (!isBlockExecutedRef.current) {
                isUsersFetchedRef.current = true;
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const documentIds = Object.keys(chats);
        if (documentIds.length === 0) return;
        const q = query(
            collection(db, "chats"),
            where("__name__", "in", documentIds)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let msgs = {};
            snapshot.forEach((doc) => {
                if (doc.id !== data.chatId) {
                    msgs[doc.id] = doc
                        .data()
                        .messages?.filter(
                            (m) =>
                                m?.read === false &&
                                m.sender !== currentUser.uid
                        );
                }
                Object.keys(msgs || {}).map((c) => {
                    if (msgs[c]?.length < 1) {
                        delete msgs[c];
                    }
                });
            });
            setUnreadMsgs(msgs);
        });
        return unsubscribe;
    }, [chats, selectedChat]);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(
                doc(db, "userChats", currentUser.uid),
                (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();

                        setChats(data);

                        if (data.hasOwnProperty("isTyping"))
                            delete data.isTyping;

                        if (
                            isUsersFetchedRef.current &&
                            !isBlockExecutedRef.current &&
                            users
                        ) {
                            const firstChat = Object.values(data)
                                .filter(
                                    (chat) =>
                                        !chat?.hasOwnProperty("chatDeleted")
                                )
                                .sort((a, b) => {
                                    return b.date - a.date;
                                })[0];

                            if (firstChat) {
                                const user = users[firstChat?.userInfo?.uid];
                                const chatId =
                                    currentUser.uid > user.uid
                                        ? currentUser.uid + user.uid
                                        : user.uid + currentUser.uid;

                                handleSelect(user);
                                readChat(chatId);
                            }
                            isBlockExecutedRef.current = true;
                        }
                    }
                }
            );
            return () => unsub();
        };
        currentUser.uid && getChats();
    }, [isBlockExecutedRef.current, users]);

    useEffect(() => {
        resetFooterStates();
    }, [data?.chatId]);

    const filteredChats = Object.entries(chats || {})
        .filter(([, chat]) => !chat?.hasOwnProperty("chatDeleted"))
        .filter(
            ([, chat]) =>
                chat?.userInfo?.displayName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                chat?.lastMessage?.text
                    .toLowerCase()
                    .includes(search.toLowerCase())
        )
        .sort((a, b) => b[1].date - a[1].date);

    const readChat = async (chatId) => {
        const chatRef = doc(db, "chats", chatId);
        const chatDoc = await getDoc(chatRef);
        let updatedMessages = chatDoc.data().messages.map((message) => {
            if (message?.read === false) {
                message.read = true;
            }
            return message;
        });
        await updateDoc(chatRef, { messages: updatedMessages });
    };

    const handleSelect = (user, selectedChatId) => {

        setSelectedChat(user);
        dispatch({ type: "CHANGE_USER", payload: user });

        if (unreadMsgs?.[selectedChatId]?.length > 0) {
            readChat(selectedChatId);
        }
    };


    return (
        <div className="flex flex-col h-full">
            {isSmallScreen ? (
                <div className={`shrink-0 sticky -top-[20px] z-10 flex justify-center w-full py-1 bg-c2 md:py-5 ${openSearch ? "h-auto" : "h-0 overflow-hidden opacity-0"} transition-all ease-in-out duration-500`}>
                    {/* ... (search input code) */}
                    <RiSearch2Line className="absolute top-5 md:top-9 left-5 text-c3" />
                    <input
                        type="Text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search username..."
                        className="w-[96%] h-12 rounded-xl bg-c1/[0.5] pl-11 pr-5 placeholder:text-c3 outline-none text-base"
                    />
                </div>
            ) : (
                <div className={`shrink-0 sticky -top-[20px] z-10 flex justify-center w-full bg-c2 md:py-4  `}>

                    <RiSearch2Line className="absolute top-6 md:top-9 left-5 text-c3" />
                    <input
                        type="Text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search username..."
                        className="w-[96%] h-12 rounded-xl bg-c1/[0.5] pl-11 pr-5 placeholder:text-c3 outline-none text-base"
                    />
                </div>
            )}

            {filteredChats.length === 0 ? ( // Check if there are no chats to display
                <div className="flex flex-col items-center justify-center h-[calc(100vh-220px)]">
                    <span role="img" aria-label="No chats" className="text-6xl mb-4">
                        🙁
                    </span>
                    <p className="text-c3 text-xl text-center">
                        No Conversations Yet!
                    </p>
                    <p className="text-c3 text-xl text-center">
                        Click on the + icon below to start a new chat.
                    </p>
                </div>) : (
                <ul className="flex flex-col w-full my-3 md:my-5 gap-4">
                    {Object.keys(users || {}).length > 0 &&
                        filteredChats?.map((chat) => {
                            // ... (chat rendering code)
                            const timestamp = new Timestamp(
                                chat[1].date?.seconds,
                                chat[1].date?.nanoseconds
                            );
                            const date = timestamp.toDate();
                            const user = users[chat[1].userInfo.uid];
                            const isValidDate = !isNaN(date.getTime());

                            return (
                                <li
                                    key={chat[0]}
                                    id={chat[0]}
                                    onClick={() => {
                                        handleSelect(user, chat[0]);
                                        setOpenLeftNav(false);
                                        setOpenSearch(false);
                                        if (isSmallScreen) setTimeout(() => setOpenChatBox(true), 500);
                                    }}
                                    className={`h-[80px] flex items-center gap-4 rounded-3xl hover:bg-c1 p-3 cursor-pointer mx-2 ${selectedChat?.uid === user.uid
                                        ? "bg-c1"
                                        : ""
                                        }`}
                                >
                                    <Avatar size="x-large" user={user} />
                                    <div className="flex flex-col gap-1 grow relative">
                                        <div className="text-base text-white flex  items-center justify-between">
                                            <div className="font-medium line-clamp-1 text-sm w-[50%] xl:w-auto md:text-base">
                                                {user.displayName}
                                            </div>
                                            <div className="text-xs text-c3">
                                                {isValidDate && formatDate(date)}                                            </div>
                                        </div>
                                        <p className="text-sm text-c3 line-clamp-1">
                                            {chat[1].lastMessage?.text ||
                                                (chat[1].lastMessage?.img &&
                                                    "image") ||
                                                "Send first message"}
                                        </p>

                                        {!!unreadMsgs?.[chat[0]]?.length && (
                                            <span className="absolute right-0 top-7 min-w-[20px] h-5 rounded-full bg-red-500 flex justify-center items-center text-sm">
                                                {unreadMsgs?.[chat[0]]?.length}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            )}
        </div>
    );
};

export default Chats;
