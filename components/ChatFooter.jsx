/**
 * Renders the footer of the chat window.
 * Includes input field, emoji picker, attachment button, typing indicator,
 * and other UI elements related to composing and sending messages.
 */
import { useChatContext } from "@/context/chatContext";
import { GiphyFetch } from "@giphy/js-fetch-api";
// import { Viewer } from "@react-pdf-viewer/core";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState, useRef } from "react";
import ClickAwayListener from "react-click-away-listener";
import { CgAttachment } from "react-icons/cg";
import { CiCreditCard1 } from "react-icons/ci";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdDeleteForever, MdGif } from "react-icons/md";
import { FixedSizeGrid as Grid } from "react-window";
import Composebar from "./Composebar";
import Icon from "./Icon";
import SendMoneyPopup from "./popup/SendMoneyPopup";

const gf = new GiphyFetch("2Gx7SvpPvoHFrCb0ho52ILe7S7c5487G");

const ChatFooter = () => {
  const [showImojiPicker, setShowImojiPicker] = useState(false);
  const [selectedGif, setSelectedGif] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState("");
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    inputText,
    setInputText,
    data,
    editMsg,
    setEditMsg,
    isTyping,
    setAttachment,
  } = useChatContext();

  useEffect(() => {
    setInputText(editMsg?.text || "");
  }, [editMsg]);

  const onEmojiClick = (emojiData, event) => {
    let text = inputText;
    setInputText((text += emojiData.emoji));
  };

  /**
   * Handles file change event from file input.
   * Gets the first file from the input files array.
   * Sets attachment state to the file.
   * If file exists, generates blob URL for preview.
   * Sets attachmentPreview state to the blob URL.
   */
  const onFileChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);

    if (file) {
      setSelectedFileType(file.type);
      const blobUrl = URL.createObjectURL(file);
      setSelectedFile(blobUrl);
    } else {
      setSelectedFileType("");
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    const fetchGifs = async () => {
      const { data } = await gf.trending({ limit: 50 });
      setGifs(data);
    };

    if (showGifPicker) {
      fetchGifs();
    }
  }, [showGifPicker]);

  const onGifSelected = (gif) => {
    setSelectedGif(gif.images.fixed_height_small.url);
    setShowGifPicker(false);
  };

  const fetchGifs = async (query) => {
    const { data } = await gf.search(query, { limit: 50 });
    setGifs(data);
  };

  return (
    <div className="flex items-center bg-c1/[0.5] p-2 rounded-xl relative">

      {openPopup && (
        <SendMoneyPopup setOpenPopup={setOpenPopup}/>
      )}

      {/* Renders a preview of the selected file.
            Allows deselecting the file. */}
      {selectedFile && (
        <div className="absolute w-[100px] h-[100px] bottom-16 left-0 bg-c1 p-2 rounded-md">
          {selectedFileType.startsWith("image") && (
            <img
              src={selectedFile}
              className="w-full h-full object-contain object-center"
            />
          )}
          {selectedFileType.startsWith("video") && (
            <video
              src={selectedFile}
              controls
              className="w-full h-full object-contain object-center"
            />
          )}
          {selectedFileType.startsWith("audio") && (
            <audio
              src={selectedFile}
              controls
              className="w-full h-full object-contain object-center"
            />
          )}
          {/* {selectedFileType === "application/pdf" && (
            <Viewer fileUrl={selectedFile} />
          )} */}
          <div
            className="w-6 h-6 rounded-full bg-red-500 flex justify-center items-center absolute -right-2 -top-2 cursor-pointer"
            onClick={() => {
              setAttachment(null);
              setSelectedFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
          >
            <MdDeleteForever size={14} />
          </div>
        </div>
      )}

      {/* Renders a preview of the selected GIF.
            Allows deselecting the GIF. */}
      {selectedGif && (
        <div className="absolute w-[100px] h-[100px] bottom-16 left-0 bg-c1 p-2 rounded-md">
          <img
            src={selectedGif}
            className="w-full h-full object-contain object-center"
          />
          <div
            className="w-6 h-6 rounded-full bg-red-500 flex justify-center items-center absolute -right-2 -top-2 cursor-pointer"
            onClick={() => setSelectedGif(null)}
          >
            <MdDeleteForever size={14} />
          </div>
        </div>
      )}

      {/* Renders a file upload input that allows the user to attach files,
            hidden behind a button with attachment icon.
            Triggers the onFileChange handler when a file is selected. */}
      <div className="shrink-0">
        <input
          type="file"
          id="fileUploader"
          className="hidden"
          ref={fileInputRef}
          onChange={onFileChange}
        />

        <label htmlFor="fileUploader">
          <Icon
            size="large"
            icon={<CgAttachment size={20} className="text-c3" />}
          />
        </label>
      </div>

      <div className="shrink-0 relative">
        <Icon
          size="large"
          className={`${showImojiPicker ? "bg-c1" : ""}`}
          icon={<HiOutlineEmojiHappy size={24} className="text-c3" />}
          onClick={() => setShowImojiPicker(true)}
        />
        {showImojiPicker && (
          <ClickAwayListener onClickAway={() => setShowImojiPicker(false)}>
            <div className="absolute bottom-12 left-0 shadow-lg">
              <EmojiPicker
                emojiStyle="native"
                theme="light"
                onEmojiClick={onEmojiClick}
                autoFocusSearch={false}
              />
            </div>
          </ClickAwayListener>
        )}
      </div>

      <div className="shrink-0 relative">
        <Icon
          size="large"
          className={`${showGifPicker ? "bg-c1" : ""}`}
          icon={<MdGif size={25} className="text-c3" />}
          onClick={() => setShowGifPicker(true)}
        />
        {showGifPicker && (
          <ClickAwayListener onClickAway={() => setShowGifPicker(false)}>
            <div className="absolute bottom-12 left-0 shadow-lg bg-white p-4 rounded-md">
              <input
                type="text"
                className="border-2 border-gray-300 rounded-md p-2 w-full mb-4 text-black"
                placeholder="Search for GIFs"
                onChange={(e) => fetchGifs(e.target.value)}
              />
              <Grid
                columnCount={3}
                columnWidth={100}
                height={300}
                rowCount={Math.ceil(gifs.length / 3)}
                rowHeight={100}
                width={300}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const gif = gifs[rowIndex * 3 + columnIndex];
                  return gif ? (
                    <img
                      src={gif.images.fixed_height_small.url}
                      style={style}
                      onClick={() => onGifSelected(gif)}
                      alt={gif.title}
                    />
                  ) : null;
                }}
              </Grid>
            </div>
          </ClickAwayListener>
        )}
      </div>

      <div onClick={()=> setOpenPopup(true)}>
        <Icon size="large"
            icon={<CiCreditCard1 size={23} className="text-c3" />}/>
      </div>

      {/* Conditionally renders a typing indicator
            if another user is typing in the chat.

            Shows the other user's name and a typing icon.
            Positioned absolutely to overlay the chat messages. */}
      {isTyping && (
        <div className="absolute -top-6 left-4 bg-c2 w-full h-6">
          <div className="flex gap-2 w-full h-full opacity-50 text-sm text-white">
            {`${data.user.displayName} is typing`}
            <img src="/typing.svg" />
          </div>
        </div>
      )}

      {/* Conditionally renders a cancel edit button when a message is being edited.
            Allows the user to cancel editing the message and dismiss the edit UI.

            @param {Object | null} editMsg - The message being edited.
            @param {Function} setEditMsg - Callback to set editing message to null. */}
      {editMsg && (
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-c4 flex items-center gap-2 py-2 px-4 pr-2 rounded-full text-sm font-semibold cursor-pointer shadow-lg"
          onClick={() => setEditMsg(null)}
        >
          <span>Cancel edit</span>
          <IoClose size={20} className="text-white" />
        </div>
      )}

      <Composebar selectedFileType={selectedFileType} setSelectedFile={setSelectedFile}/>
    </div>
  );
};

export default ChatFooter;
