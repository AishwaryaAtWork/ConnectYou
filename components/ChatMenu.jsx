/**
 * A component that renders a menu for a chat, allowing the user to block or unblock the chat partner and delete the chat.
 * @param {Object} props - The component props.
 * @param {boolean} props.showMenu - A boolean indicating whether the menu should be displayed.
 * @param {function} props.setShowMenu - A function to update the state of the menu display.
 * @returns {JSX.Element} - The ChatMenu component.
 */
import { useAuth } from "@/context/authContext";

import { useChatContext } from "@/context/chatContext";
import { db, storage } from "@/firebase/firebase";
import { v4 as uuid } from "uuid";

import { useScreenSize } from "@/context/screenSizeContext";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import ClickAwayListener from "react-click-away-listener";
import { toast } from "react-toastify";

const ChatMenu = ({ setShowMenu, showMenu }) => {
  const { data, users, dispatch, chats, setSelectedChat } = useChatContext();
  const { currentUser } = useAuth();
  const { setOpenChatBox } = useScreenSize();

  const isUserBlocked = users[currentUser.uid]?.blockedUsers?.find(
    (u) => u === data.user.uid
  );

  const IamBlocked = users[data.user.uid]?.blockedUsers?.find(
    (u) => u === currentUser.uid
  );

  const handleClickAway = () => {
    setShowMenu(false);
  };

  const handleThemeUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          // console.error(error);
        },
        () => {
          try {
            // Display a pending toast while waiting for getDownloadURL
            const toastId = toast.promise(
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  theme: downloadURL,
                });
                // Close the toast after successful update
                toast.dismiss(toastId);
              }),
              {
                pending: "Updating theme...",
                success: "Theme updated successfully.",
                error: "Theme update failed.",
              },
              {
                autoClose: 2000,
              }
            );
          } catch (error) {
            // console.error("Error updating theme:", error);
          }
        }
      );
    }
  };

  const handleAttachmentClick = () => {
    document.getElementById("themeinput").click();
  };

  const handleBlock = async (type) => {
    if (type === "block") {
      await updateDoc(doc(db, "users", currentUser.uid), {
        blockedUsers: arrayUnion(data.user.uid),
      });
    }
    if (type === "unblock") {
      await updateDoc(doc(db, "users", currentUser.uid), {
        blockedUsers: arrayRemove(data.user.uid),
      });
    }
  };

  const handleDelete = async () => {
    try {
      const chatRef = doc(db, "chats", data.chatId);

      // Retrieve the chat document from Firestore
      const chatDoc = await getDoc(chatRef);

      // Create a new "messages" array that excludes the message with the matching ID
      const updatedMessages = chatDoc.data().messages.map((message) => {
        message.deleteChatInfo = {
          ...message.deleteChatInfo,
          [currentUser.uid]: true,
        };
        return message;
      });

      // Update the chat document in Firestore with the new "messages" array
      await updateDoc(chatRef, { messages: updatedMessages });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".chatDeleted"]: true,
      });

      const chatId = Object.keys(chats || {}).filter(
        (id) => id !== data.chatId
      );

      const filteredChats = Object.entries(chats || {})
        .filter(([id, chat]) => id !== data.chatId)
        .sort((a, b) => b[1].date - a[1].date);

      if (filteredChats.length > 0) {
        setSelectedChat(filteredChats[0][1].userInfo);
        dispatch({
          type: "CHANGE_USER",
          payload: filteredChats[0][1].userInfo,
        });
      } else {
        dispatch({ type: "EMPTY" });
      }
    } catch (err) {
      // console.error(err);
    }

    setOpenChatBox(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div
        className={`w-[200px] absolute top-[70px] right-5 bg-c0 z-10 rounded-md overflow-hidden`}
      >

        <ul className="flex flex-col py-2">
          {!IamBlocked && (
            <li
              className="flex items-center py-3 px-5 hover:bg-black cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleBlock(isUserBlocked ? "unblock" : "block");
              }}
            >
              {isUserBlocked ? "Unblock" : "Block user"}
            </li>
          )}
          <li
            className="flex items-center py-3 px-5 hover:bg-black cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
              handleDelete();
            }}
          >
            Delete chat
          </li>
          <li
            className="flex items-center py-3 px-5 hover:bg-black cursor-pointer"
            onClick={handleAttachmentClick}
          >
            <input
              type="file"
              accept="image/*"
              id="themeinput"
              className="hidden"
              onChange={handleThemeUpload}
            />
            Set Theme
          </li>

        </ul>
      </div>
    </ClickAwayListener>
  );
};

export default ChatMenu;
