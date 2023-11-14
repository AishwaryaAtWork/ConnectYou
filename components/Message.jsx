/**
 * A component that renders a single message in a chat conversation.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.message - The message object to be rendered.
 * @returns {JSX.Element} - The rendered component.
 */
import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import { db } from "@/firebase/firebase";
import { DELETED_FOR_EVERYONE, DELETED_FOR_ME } from "@/utils/constants";
import { formatDate, wrapEmojisInHtmlTag } from "@/utils/helpers";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import ImageViewer from "react-simple-image-viewer";
import Avatar from "./Avatar";
import Icon from "./Icon";
import Menu from "./Menu";
import DeleteMsgPopup from "./popup/DeleteMsgPopup";

const Message = ({ message ,theme}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { users, data, setEditMsg, imageViewer, setImageViewer } =
    useChatContext();
  const { currentUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const self = message.sender === currentUser.uid;

  const ref = useRef();
  const imagePreviewUrl = useRef(message.img || null);

  const timestamp = new Timestamp(
    message.date?.seconds,
    message.date?.nanoseconds
  );
  const date = timestamp.toDate();
  console.log(message.fileUrl);
  const deleteMessage = async (action) => {
    try {
      const messageID = message.id;
      const chatRef = doc(db, "chats", data.chatId);

      // Retrieve the chat document from Firestore
      const chatDoc = await getDoc(chatRef);

      // Create a new "messages" array that excludes the message with the matching ID
      const updatedMessages = chatDoc.data().messages.map((message) => {
        if (message.id === messageID) {
          if (action === DELETED_FOR_ME) {
            message.deletedInfo = {
              [currentUser.uid]: DELETED_FOR_ME,
            };
          }

          if (action === DELETED_FOR_EVERYONE) {
            message.deletedInfo = {
              deletedForEveryone: true,
            };
          }
        }
        return message;
      });

      // Update the chat document in Firestore with the new "messages" array
      await updateDoc(chatRef, { messages: updatedMessages });
    } catch (err) {
      console.error(err);
    }
  };

  const deletePopupHandler = () => {
    setShowDeletePopup(true);
    setShowMenu(false);
  };

  return (
    <div ref={ref} className={`mb-5 max-w-[75%] ${self ? "self-end" : ""}`}>
      {showDeletePopup && (
        <DeleteMsgPopup
          onHide={() => setShowDeletePopup(false)}
          deleteMessage={deleteMessage}
          className="DeleteMsgPopup"
          noHeader={true}
          shortHeight={true}
          self={self}
        />
      )}
      <div
        className={`flex items-end gap-3 mb-1 ${
          self ? "justify-start flex-row-reverse" : ""
        }`}
      >
        <Avatar
          size="small"
          user={self ? currentUser : users[data.user.uid]}
          className="mb-4"
        />
        <div
          className={`group flex flex-col gap-4 p-4 rounded-3xl relative ${
            self ? "rounded-br-md bg-c5" : "rounded-bl-md bg-c1"
          }`}
        >
          {message.text && (
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{
                __html: wrapEmojisInHtmlTag(message.text),
              }}
            ></div>
          )}

          {/* Renders an image attachment in a message if one exists.
                    On click, opens ImageViewer modal to view full size image. */}
          {message.img && (
            <>
              <Image
                src={message.img}
                alt={`Image sent by ${message.senderName}`}
                width={250}
                height={250}
                className="rounded-3xl max-w-[250px]"
                onClick={() =>
                  setImageViewer({
                    msgId: message.id,
                    url: message.fileUrl,
                  })
                }
              />
              {imageViewer && imageViewer?.msgId === message?.id && (
                <ImageViewer
                  src={[imageViewer.url]}
                  currentIndex={0}
                  disableScroll={false}
                  closeOnClickOutside={true}
                  onClose={() => setImageViewer(null)}
                />
              )}
              <img src={[imageViewer.url]} />
            </>
          )}

          <div
            className={`${
              showMenu ? "" : "hidden"
            } group-hover:flex absolute top-2 ${
              self ? "left-2 bg-c5" : "right-2 bg-c1"
            }`}
            onClick={() => setShowMenu(!showMenu)}
          >
            <Icon
              size="medium"
              className="hover:bg-inherit rounded-none"
              icon={<GoChevronDown size={24} className="text-c3" />}
            />
            {showMenu && (
              <Menu
                self={self}
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                setShowDeletePopup={deletePopupHandler}
                editMsg={() => setEditMsg(message)}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex items-end ${
          self ? "justify-start flex-row-reverse mr-12" : "ml-12"
        }`}
      >
        <div className="text-xs text-c3">{formatDate(date)}</div>
      </div>
    </div>
  );
};

export default Message;
