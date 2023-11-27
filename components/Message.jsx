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
import ImageVideoPopup from "./popup/ImageVideoPopup";
import { FaPlay } from "react-icons/fa6";

const Message = ({ message, theme }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { users, data, setEditMsg, imageViewer, setImageViewer } =
    useChatContext();
  const { currentUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [openImgVidPopup, setOpenImgVidPopup] = useState(false);
  const [imgVidPopupUrl, setImgVidPopupUrl] = useState("");

  const self = message.sender === currentUser.uid;

  const ref = useRef();
  const imagePreviewUrl = useRef(message.img || null);

  const timestamp = new Timestamp(
    message.date?.seconds,
    message.date?.nanoseconds
  );
  const date = timestamp.toDate();

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

  const openVidImg = (url) => {
    setOpenImgVidPopup(true)
    setImgVidPopupUrl(url)
  }
  
  return (
    <div ref={ref} className={`mb-5 max-w-[75%] ${self ? "self-end" : ""}`}>
      {openImgVidPopup && (
        <ImageVideoPopup onClose={setOpenImgVidPopup} url={imgVidPopupUrl}/>
      )}

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
          {message?.fileUrl?.includes("image") && (
            <img
              src={message.fileUrl}
              alt={`Image sent by ${message.senderName}`}
              width={250}
              height={250}
              className="rounded-3xl max-w-[250px]"
              onClick={() => {
                openVidImg(message.fileUrl)
                setImageViewer({
                  msgId: message.id,
                  url: message.fileUrl,
                })
              }
              }
            />
          )}
          {message?.fileUrl?.includes("gif") && (
            <img
              src={message.fileUrl}
              alt={`Image sent by ${message.senderName}`}
              width={150}
              height={150}
              className="rounded-3xl max-w-[250px]"
              onClick={() =>
                setImageViewer({
                  msgId: message.id,
                  url: message.fileUrl,
                })
              }
            />
          )}
          {message?.fileUrl?.includes("pdf") && (
            <iframe
            src={message.fileUrl}
            width="100%"
            height="400px" // Adjust the height as needed
            frameBorder="0"
            title={`PDF sent by ${message.senderName}`}
            // sandbox="allow-downloads"
          />

          )}
          {message?.fileUrl?.includes("video") && (
             <div className="relative">
             <video
               src={message.fileUrl}
               width={250}
               height={250}
               className="object-contain object-center"
               onClick={() => openVidImg(message.fileUrl)}
             />
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              bg-gray-100 bg-opacity-80 p-2 rounded-full">
               <Icon
                 size="medium"
                 className="hover:bg-gray-100 hover:bg-opacity-80 rounded-full p-[0.1px] "
                 onClick={() => openVidImg(message.fileUrl)}
                 icon={<FaPlay size={30} className="text-black" />}
               />
             </div>
           </div>
          )}
          {message?.fileUrl?.includes("audio") && (
            <audio
              controls
              width={250}
              height={250}
              className="object-contain object-center"
              onLoadedMetadata={() => {}}
            >
              <source src={message.fileUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
          {message?.fileUrl?.includes("map") && (
          //   <iframe
          //   width="100%"
          //   height="400px"
          //   frameBorder="0"
          //   style={{ border: 0 }}
          //   src={message.fileUrl}
          //   allowFullScreen
          //   title={`Map sent by ${message.senderName}`}
          // />
          
            <>
            <p className="text-sm">{`${self ? "My" : `${data.user.displayName}'s`} geo loaction :`}</p>
              <a href={message.fileUrl} target="_blank" 
              className="cursor-pointer text-sm text-blue-400">{message.fileUrl}</a>
            
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
