import { useAuth } from '@/context/authContext';
import { db } from '@/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const AddMoneyPopup = ({ setOpenPopup }) => {

  const { currentUser } = useAuth();
  const popUpRef = useRef(null);
  const [amount, setAmount] = useState(0);
  const [prevCredits, setPrevCredits] = useState(0);

  useEffect(() => {
    const fetchCredits = async () => {

      // Fetch current user's credit from users
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      setPrevCredits(userDoc?.data()?.credits);

    };

    fetchCredits();
  }, []);

  const addCredits = () => {
    if (amount > 0) {
      toast.promise(async () => {
        const updatedCredits = prevCredits + amount;

        await updateDoc(doc(db, "users", currentUser.uid), {
          credits: updatedCredits
        });

      }, {
        pending: "Updating wallet.",
        success: "Wallet updated successfully.",
        error: "Wallet udpate failed.",
      },
        {
          autoClose: 2000,
        });
    } else {
      toast.info("No amount is added.");
    }

    setTimeout(() => {
      setOpenPopup(false);
    }, 1800);
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
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-800">
      <div className="bg-[#202329] p-8 rounded-md shadow-lg" ref={popUpRef}>

        <div className='flex justify-center mb-4'>
          <p className="mb-2 text-lg font-medium text-white ">ADD MONEY TO WALLET</p>
        </div>

        <div className='flex justify-start mb-4'>
          <p className="mb-2 text-lg font-medium text-c3 px-5">Balance:</p>
          <p className="mb-2 text-lg font-medium text-c3 ">{prevCredits} Rs.</p>
        </div>

        <div className='flex justify-center items-center'>
          <p className="mb-2 text-lg font-medium text-c3 px-5">Amount:</p>
          <input
            type="number"
            className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-c3"
            placeholder="Enter amount to add"
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center">
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-blue"
            onClick={addCredits}
          >
            Add
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

export default AddMoneyPopup;
