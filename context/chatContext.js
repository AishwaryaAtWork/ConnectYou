/**
 * ChatContext provides state management for chat features like
 * selected chat, chat messages, input text, attachments etc.
 * Exports ChatContextProvider component and useChatContext hook.
 */
import { useAuth } from "@/context/authContext";
import {
    createContext,
    useContext,
    useReducer,
    useState
} from "react";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useAuth();

    const [chats, setChats] = useState({});
    const [selectedChat, setSelectedChat] = useState(null);
    const [users, setUsers] = useState(false);
    const [inputText, setInputText] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedGif, setSelectedGif] = useState(null);
    const [attachmentPreview, setAttachmentPreview] = useState(null);
    const [editMsg, setEditMsg] = useState(null);
    const [isTyping, setIsTyping] = useState(null);
    const [imageViewer, setImageViewer] = useState(null);

    const resetFooterStates = () => {
        setInputText("");
        setAttachment(null);
        setAttachmentPreview(null);
        setEditMsg(null);
        setImageViewer(null);
    };

    const INITIAL_STATE = {
        chatId: "",
        user: null,
    };

    /**
     * Reducer function for managing chat state.
     * Handles actions to change the current chat user
     * and reset the chat state.
    */
    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };
            case "EMPTY":
                return INITIAL_STATE;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider
            value={{
                chats,
                setChats,
                selectedChat,
                setSelectedChat,
                users,
                setUsers,
                inputText,
                setInputText,
                attachment,
                setAttachment,
                selectedFile,
                setSelectedFile,
                selectedGif,
                setSelectedGif,
                attachmentPreview,
                setAttachmentPreview,
                data: state,
                dispatch,
                editMsg,
                setEditMsg,
                isTyping,
                setIsTyping,
                resetFooterStates,
                imageViewer,
                setImageViewer,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => useContext(ChatContext);
