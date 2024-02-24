import PopupWrapper from "./PopupWrapper";

import { DELETED_FOR_ME, DELETED_FOR_EVERYONE } from "@/utils/constants";
import { useEffect, useState } from "react";

import { RiErrorWarningLine } from "react-icons/ri";

const DeleteMsgPopup = (props) => {
    const [showDelForEveryone, setShowDelForEveryone] = useState(true);
    const currTime = new Date();
    const msgTime = new Date(props.message.date.seconds * 1000 + props.message.date.nanoseconds / 1000000)

    useEffect(()=>{
        (currTime.getTime() - msgTime?.getTime()) /(1000*60) > 30 ? 
        setShowDelForEveryone(false) : setShowDelForEveryone(true)        
    },[])
    
    return (
        <PopupWrapper {...props}>
            <div className="mt-10 mb-5">
                <div className="flex items-center justify-center gap-3">
                    <RiErrorWarningLine size={24} className="text-red-500" />
                    <div className="text-lg">
                        Are you sure, you want to delete message?
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 mt-10">
                    <button
                        onClick={() => props.deleteMessage(DELETED_FOR_ME)}
                        className="border-[2px] border-red-700 py-2 px-4 text-sm rounded-md text-red-500 hover:bg-red-700 hover:text-white"
                    >
                        Delete for me
                    </button>
                    {props.self && showDelForEveryone && (
                        <button
                            onClick={() =>
                                props.deleteMessage(DELETED_FOR_EVERYONE)
                            }
                            className="border-[2px] border-red-700 py-2 px-4 text-sm rounded-md text-red-500 hover:bg-red-700 hover:text-white"
                        >
                            Delete for everyone
                        </button>
                    )}
                    <button
                        onClick={props.onHide}
                        className="border-[2px] border-white py-2 px-4 text-sm rounded-md text-white hover:bg-white hover:text-black"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default DeleteMsgPopup;
