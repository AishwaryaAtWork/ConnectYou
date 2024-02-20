'use client'
import { useScreenSize } from '@/context/screenSizeContext'
import React from 'react'
import Chat from './Chat';

const ChatBox = ({data}) => {
    const {isSmallScreen, openChatBox} = useScreenSize();
  return (
    <div className={`bg-c2 ${isSmallScreen ? `z-40 absolute -right-${openChatBox ? "0": "[100vw]"}
                    w-full h-full transition-all duration-500 ease-in-out ` : "w-full"}`}>
                    {!data.user ? (
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="text-center">
                                <span
                                    role="img"
                                    aria-label="No chats"
                                    className="text-6xl mb-4"
                                >
                                    🤷‍♂️
                                </span>
                                <p className="text-gray-600 text-lg">
                                    There are no chats to show.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <Chat />
                    )}
                    </div>
  )
}

export default ChatBox