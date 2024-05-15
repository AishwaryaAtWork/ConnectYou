'use client'
import React, { useEffect, useState } from 'react'

const FAQAnimation = () => {
    const [head, setHead] = useState({top: '-top-[3vh]', opacity: 'opacity-0'}) 
    const [text, setText] = useState({bottom: '-bottom-[30vh]', opacity: 'opacity-0'})

    useEffect(()=>{
        setTimeout(()=>{
            setHead({top: 'top-0', opacity: 'opacity-100'})
        },200)
        setTimeout(()=>{
            setText({bottom: 'bottom-0', opacity: 'opacity-100'})
        },600)
    },[])
  return (
    <div className='w-10/12 md:w-8/12 h-[150vh] md:h-[80vh] overflow-hidden  flex justify-center relative'>

        {/* FAQ heading */}
        <div className={`text-center absolute ${head.top} ${head.opacity} transition-all 
            duration-700 ease-in`}>
            <div className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions 🤔
            </div>
          </div>

        <div className={`w-full max-w-screen-md px-4 absolute ${text.bottom} ${text.opacity} transition-all 
            duration-700 ease-in`}>
          {/* FAQ content */}
          <div className="mt-8 text-c3">
            {/* Question 1 */}
            <div className="mb-6">
              <p className="font-semibold">Q: What is ConnectYou?</p>
              <p className='text-justify'>
                A: ConnectYou is a social platform designed to help you connect
                and chat with friends and family in a vibrant community setting.
              </p>
            </div>

            {/* Question 2 */}
            <div className="mb-6">
              <p className="font-semibold">Q: How do I sign up?</p>
              <p className='text-justify'>
                A: To sign up, click on the &quot;Sign Up&quot; button on the
                landing page, fill in the required information, and follow the
                registration process.
              </p>
            </div>

            {/* Question 3 */}
            <div className="mb-6">
              <p className="font-semibold">Q: Is ConnectYou free to use?</p>
              <p className='text-justify'>
                A: Yes, ConnectYou is free to use for basic features. However,
                there are optional premium features available for a subscription
                fee.
              </p>
            </div>

            {/* Question 4 */}
            <div className="mb-6">
              <p className="font-semibold">Q: How can I connect with others?</p>
              <p className='text-justify'>
                A: You can connect with others by sending friend requests,
                joining communities, and participating in group chats.
              </p>
            </div>

            {/* Question 5 */}
            <div className="mb-6">
              <p className="font-semibold">Q: Can I customize my profile?</p>
              <p className='text-justify'>
                A: Yes, you can customize your profile by adding a profile
                picture, updating your bio, and sharing your interests.
              </p>
            </div>

            {/* Question 6 */}
            <div className="mb-6">
              <p className="font-semibold">
                Q: How do I report inappropriate content?
              </p>
              <p className='text-justify'>
                A: If you come across inappropriate content, use the reporting
                feature available on posts or contact our support team for
                assistance.
              </p>
            </div>

            {/* Add more questions and answers as needed */}
          </div>
        </div>
    </div>
  )
}

export default FAQAnimation