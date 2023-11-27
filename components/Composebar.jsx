/**
 * Composebar React component that handles sending messages and attachments in a chat.
 *
 * Allows user to type text messages, upload attachments, and send messages.
 * Handles sending message data to Firestore.
 * Provides UI for editing messages.
 * Shows typing indicators.
 */
import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import { db, storage } from "@/firebase/firebase";
import {
  Timestamp,
  arrayUnion,
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { TbSend } from "react-icons/tb";
import { IoMicOutline } from "react-icons/io5";
import { v4 as uuid } from "uuid";
import Icon from "./Icon";
import { useRef } from "react";

let typingTimeout = null;

const Composebar = ({ selectedFileType, setSelectedFile, setSelectedGif, selectedGif }) => {
  const { currentUser } = useAuth();
  const {
    inputText,
    setInputText,
    attachment,
    setAttachment,
    setAttachmentPreview,
    data,
    editMsg,
    setEditMsg,
  } = useChatContext();

  const recognitionRef = useRef(null);

  const handleSpeechRecognition = () => {
    try {
      if (!recognitionRef.current) {
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.onresult = (event) => {
          const transcript = event?.results[0]?.[0]?.transcript;
          const capitalizedTranscript = transcript
            ? transcript.charAt(0).toUpperCase() + transcript.slice(1)
            : '';

          setInputText(capitalizedTranscript);
        };
      }

      if (recognitionRef.current.continuous) {
        recognitionRef.current.stop();
        recognitionRef.current.continuous = false;

      } else {
        recognitionRef.current.start();
        recognitionRef.current.continuous = true;
      }
    } catch (error) {
      console.error('Speech recognition error:', error);
    }
  };




  /**
   * Handles sending a new chat message.
   *
   * Uploads attachment if provided.
   * Writes message data to Firestore.
   * Updates lastMessage fields.
   * Clears input fields on success.
   */
  const handleSend = async () => {
    if (attachment) {
      const storageRef = ref(storage, `${uuid()}/${selectedFileType}`);
      const uploadTask = uploadBytesResumable(storageRef, attachment);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: inputText,
                sender: currentUser.uid,
                date: Timestamp.now(),
                fileUrl: downloadURL, // changed 'img' to 'fileUrl'
                read: false,
              }),
            });
          });
        }
      );
    }
    else if (selectedGif) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: inputText,
          sender: currentUser.uid,
          date: Timestamp.now(),
          fileUrl: selectedGif, // changed 'img' to 'fileUrl'
          read: false,
        }),
      });
    }
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: inputText,
          sender: currentUser.uid,
          date: Timestamp.now(),
          read: false,
        }),
      });
    }

    let msg = { text: inputText };
    if (attachment) {
      msg.file = true; // changed 'img' to 'file'
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: msg,
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: msg,
      [data.chatId + ".date"]: serverTimestamp(),
      [data.chatId + ".chatDeleted"]: deleteField(),
    });

    setInputText("");
    setAttachment(null);
    setAttachmentPreview(null);
  };

  const handleEdit = async () => {
    try {
      const messageID = editMsg.id;
      const chatRef = doc(db, "chats", data.chatId);

      const chatDoc = await getDoc(chatRef);

      if (attachment) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, attachment);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case "paused":
                break;
              case "running":
                break;
            }
          },
          (error) => {
            console.error(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                let updatedMessages = chatDoc.data().messages.map((message) => {
                  if (message.id === messageID) {
                    message.text = inputText;
                    message.fileUrl = downloadURL; // changed 'img' to 'fileUrl'
                  }
                  return message;
                });

                await updateDoc(chatRef, {
                  messages: updatedMessages,
                });
              }
            );
          }
        );
      } else {
        let updatedMessages = chatDoc.data().messages.map((message) => {
          if (message.id === messageID) {
            message.text = inputText;
          }
          return message;
        });
        await updateDoc(chatRef, { messages: updatedMessages });
      }

      setInputText("");
      setAttachment(null);
      setAttachmentPreview(null);
      setEditMsg(null);
    } catch (err) {
      console.error(err);
    }
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter" && (inputText || attachment)) {
      !editMsg ? handleSend() : handleEdit();
    }
  };

  const handleTyping = async (event) => {
    // const newText = event.target.value || transcript;
    setInputText(event.target.value);

    await updateDoc(doc(db, "chats", data.chatId), {
      [`typing.${currentUser.uid}`]: true,
    });

    // If the user was previously typing, clear the timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout for 1.5 seconds after the last keystroke
    typingTimeout = setTimeout(async () => {
      // Send a typing indicator to other users indicating that this user has stopped typing

      await updateDoc(doc(db, "chats", data.chatId), {
        [`typing.${currentUser.uid}`]: false,
      });

      // Reset the timeout
      typingTimeout = null;
    }, 500);
  };

  const closepreview = () => {
    setAttachment(null);
    setSelectedFile(null);
    setSelectedGif(null);
  };

  return (
    <div className="flex items-center gap-2 grow">
      <input
        type="text"
        className="grow w-full outline-0 px-2 py-2 text-white bg-transparent placeholder:text-c3 outline-none text-base"
        placeholder="Type a message"
        value={inputText}
        onChange={handleTyping}
        onKeyUp={onKeyUp}
      />
      <div >
        <Icon size="large" onClick={handleSpeechRecognition}
          icon={<IoMicOutline size={31} className="text-white" />} />
      </div>
      <button
        onClick={!editMsg ? handleSend : handleEdit}
        className={`h-10 w-10 rounded-xl shrink-0 flex justify-center items-center ${(inputText.trim().length > 0 || attachment || selectedGif) ? "bg-c4" : "bg-gray-400"
          }`}
        disabled={inputText.trim().length === 0 && !attachment && !selectedGif}
      >
        <TbSend size={20} className="text-white" onClick={closepreview} />
      </button>
    </div>
  );
};

export default Composebar;
