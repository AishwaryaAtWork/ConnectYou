import { useAuth } from '@/context/authContext';
import { useChatContext } from '@/context/chatContext';
import { db } from '@/firebase/firebase';
import { Timestamp, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from "uuid";

const SendMoneyPopup = ({ setOpenPopup }) => {

  const { currentUser } = useAuth();
  const { data } = useChatContext();
  const popUpRef = useRef(null);
  const [amount, setAmount] = useState(0);
  const [userCredits, setUserCredits] = useState(0);
  const [otherUserCredits, setOtherUserCredits] = useState(0);

  useEffect(() => {

    const fetchData = async () => {

      // Fetch current user's credit from users
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      setUserCredits(userDoc?.data()?.credits);

      // Fetch other user's credit from users
      const otherUserDoc = await getDoc(doc(db, "users", data.user.uid));
      setOtherUserCredits(otherUserDoc?.data()?.credits);

    };

    fetchData();

  }, []);

  const updateUserCredit = async () => {
    if (amount > 0) {
      if (amount <= userCredits) {
        const updatedCurrUserAmount = userCredits - amount;
        const updatedOtherUserAmount = otherUserCredits + amount;

        await updateDoc(doc(db, "users", currentUser.uid), {
          credits: updatedCurrUserAmount
        });

        await updateDoc(doc(db, "users", data.user.uid), {
          credits: updatedOtherUserAmount
        });

        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: `${amount}Rs. sent.`,
            sender: currentUser.uid,
            date: Timestamp.now(),
            read: false,
          }),
        });
      }
      else {
        toast.error("Amount is more than the amount in wallet.");
      }

    } else {
      toast.info("No amount is sent.");
    }
    setOpenPopup(false);
  };

  const handleClickOutside = (event) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target)) {
      setOpenPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-800">
      <div className="bg-[#202329] p-8 rounded-md shadow-lg" ref={popUpRef}>

        <div className='flex justify-center mb-4'>
          <p className="mb-2 text-lg font-medium text-white ">SEND MONEY FROM WALLET</p>
        </div>

        <div className='flex justify-start mb-4'>
          <p className="mb-2 text-lg font-medium text-c3 px-5">Balance:</p>
          <p className="mb-2 text-lg font-medium text-c3 ">{userCredits} Rs.</p>
        </div>

        <div className='flex justify-center items-center'>
          <p className="mb-2 text-lg font-medium text-c3 px-5">Amount:</p>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 bg-transparent rounded-md text-c3"
            placeholder="Enter amount to send"
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>

        {/* Buttons */}
        {(userCredits > 0) ? (
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
        ) : (
          <p className='px-4 py-2 mt-5 text-gray-300'>No balance in wallet. Update your wallet first.</p>
        )}
      </div>
    </div>
  );
};

export default SendMoneyPopup;
