import React from 'react'
import { useRef } from 'react';
import { useChatContext } from '@/context/chatContext';
import Image from 'next/image';
import mapImage from '@/public/map.png';

const MapPopup = ({ mapURL, setOpenMapPopup, shareLocation }) => {
    const popUpRef = useRef(null);
    const { data } = useChatContext();
    const onShare = () => {
        shareLocation();
        setOpenMapPopup(false);
    }
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-800">
            <div className="bg-[#202329] p-8 rounded-md shadow-lg" ref={popUpRef}>
                <div className="flex justify-center mb-6">
                    <Image src={mapImage} width={100} height={80} alt="Map" />

                </div>
                <div className='flex justify-center mb-4 w-[20rem] text-center'>
                    <p className="text-lg font-medium text-white">Are you sure you want to share your current location with <span>{data.user.displayName}</span>?</p>


                </div>


                <div className="mt-8 flex justify-center gap-4">
                    <button
                        className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={onShare}

                    >
                        Share
                    </button>

                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray"
                        onClick={() => setOpenMapPopup(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    )
}

export default MapPopup
