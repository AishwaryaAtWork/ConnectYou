import { useAuth } from '@/context/authContext';
import { useChatContext } from '@/context/chatContext';
import { db } from '@/firebase/firebase';
import { Timestamp, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from "uuid";

const SendMoneyPopup = ({ setOpenPopup }) => {

    const { currentUser } = useAuth();
    const { data } = useChatContext();
    const [amount, setAmount] = useState(0);
    const [userCredits, setUserCredits] = useState(0);
    const [otherUserCredits, setOtherUserCredits] = useState(0);
    const [otherUserId, setOtherUserId] = useState('');

    useEffect(()=>{
        
        const fetchData = async () => {
            // Fetch other user's id from the messages
            const usersConvo = await getDoc(doc(db, "chats", data.chatId));
            const msgs = usersConvo?.data()?.messages;
      
            const otherUserMsg = msgs?.find(msg => msg.sender !== currentUser.uid);
            if (otherUserMsg) {
              setOtherUserId(otherUserMsg.sender);
            }
      
            // Fetch current user's credit from users
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            setUserCredits(userDoc?.data()?.credits);
      
            // Fetch other user's credit from users
            if (otherUserId) {
              const otherUserDoc = await getDoc(doc(db, "users", otherUserId));
              setOtherUserCredits(otherUserDoc?.data()?.credits);
            }
          };

        fetchData()
    
    },[])
    
    const updateUserCredit = async() =>{
        const updatedCurrUserAmount = userCredits - amount;
        const updatedOtherUserAmount = otherUserCredits + amount;
        
        await updateDoc(doc(db, "users", currentUser.uid), {
            credits: updatedCurrUserAmount
        })
        
        await updateDoc(doc(db, "users", otherUserId), {
            credits: updatedOtherUserAmount
        })

        await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: `${amount}Rs. is sent.`,
              sender: currentUser.uid,
              date: Timestamp.now(),
              read: false,
            }),
          });

          setOpenPopup(false)
    }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-800">
      <div className="bg-[#202329] p-8 rounded-md shadow-lg">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setOpenPopup(false)}
        >
          &times;
        </button>

        {/* Popup content */}
        <div className='flex justify-center items-center'>
          <p className="mb-2 text-lg font-medium text-c3 px-5">Amount:</p>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            placeholder="Enter amount"
            onChange={(e)=> setAmount(parseInt(e.target.value))}
          />
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center">
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-blue"
            onClick={updateUserCredit}
          >
            Send
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray"
            onClick={() => setOpenPopup(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyPopup;
