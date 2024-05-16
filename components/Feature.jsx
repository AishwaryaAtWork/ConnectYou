import Image from 'next/image'
import React from 'react'
import { IoStarSharp } from "react-icons/io5";

const Feature = () => {
  return (
    <div className='w-full min-h-[100vh] max-h-auto bg-gradient-to-b to-c1 from-c2 flex flex-col items-center justify-center pb-8 pt-20 cursor-default'
       id='features'>
      <h2 className='text-5xl font-semibold pb-12 md:pb-5'>Features</h2>
      <div className='w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-10 px-8 place-content-center'>

        <div className='w-full h-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
        rounded-3xl p-[2px] overflow-hidden my-2 lg:my-10 '>
          <div className='h-full w-full text-white bg-black rounded-3xl overflow-hidden flex flex-col items-center p-6 relative'>
            <Image alt='featureImg' src={`/../public/feat/1.png`} height={130} width={130} className='py-4'/>
            <p className='font-bold text-center text-2xl pb-1'>User Profiles and Messaging</p>
            <p className='text-c3 text-center text-sm pb-12'>Easily create profiles, edit details, and send direct messages for one-on-one 
              communication.</p>
            <IoStarSharp className=' absolute bottom-3 p-1 text-4xl bg-gradient-to-br from-indigo-500 via-purple-500
             to-pink-500 animate-bounce rounded-full'/>
          </div>
        </div>
        
        <div className='w-full h-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
        rounded-3xl p-[2px] overflow-hidden my-2 lg:my-10 '>
          <div className='h-full w-full text-white bg-black rounded-3xl overflow-hidden flex flex-col items-center p-6 relative'>
            <Image alt='featureImg' src={`/../public/feat/2.png`} height={200} width={200}/>
            <p className='font-bold text-center text-2xl pb-1'>Connection Requests</p>
            <p className='text-c3 text-center text-sm pb-12'>Send and accept connection requests to expand your network within the platform.</p>
            <IoStarSharp className=' absolute bottom-3 p-1 text-4xl bg-gradient-to-br from-indigo-500 via-purple-500
             to-pink-500 animate-bounce rounded-full'/>
          </div>
        </div>
        
        <div className='w-full h-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
        rounded-3xl p-[2px] overflow-hidden my-2 lg:my-10 '>
          <div className='h-full w-full text-white bg-black rounded-3xl overflow-hidden flex flex-col items-center p-6 relative'>
            <Image alt='featureImg' src={`/../public/feat/3.png`} height={220} width={220} />
          
            <p className='font-bold text-center text-2xl pb-1'>Easy Content Sharing</p>
            <p className='text-c3 text-center text-sm pb-12'>Share various content types like text, media files, GIFs, emojis, links, and live location with connections.</p>
            <IoStarSharp className=' absolute bottom-3 p-1 text-4xl bg-gradient-to-br from-indigo-500 via-purple-500
             to-pink-500 animate-bounce rounded-full'/>
          </div>
        </div>
        
        <div className='w-full h-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
        rounded-3xl p-[2px] overflow-hidden my-2 lg:my-10 '>
          <div className='h-full w-full text-white bg-black rounded-3xl overflow-hidden flex flex-col items-center p-6 relative'>
            <Image alt='featureImg' src={`/../public/feat/4.png`} height={140} width={140} className='py-4'/>
            <p className='font-bold text-center text-2xl pb-1'>Privacy and Security</p>
            <p className='text-c3 text-center text-sm pb-12'>Control privacy settings and benefit from security measures like data encryption and regular updates to protect user data.</p>
            <IoStarSharp className=' absolute bottom-3 p-1 text-4xl bg-gradient-to-br from-indigo-500 via-purple-500
             to-pink-500 animate-bounce rounded-full'/>
          </div>
        </div>
        
        <div className='w-full h-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
        rounded-3xl p-[2px] overflow-hidden my-2 lg:my-10 '>
          <div className='h-full w-full text-white bg-black rounded-3xl overflow-hidden flex flex-col items-center p-6 relative'>
            <Image alt='featureImg' src={`/../public/feat/5.png`} height={260} width={260} className='py-4 h-[42%] w-[66%]'/>
            <p className='font-bold text-center text-2xl pt-4 pb-1'>Accessibility and Customization</p>
            <p className='text-c3 text-center text-sm pb-12'>Accessible via web browsers, users can customize their profile appearance and privacy settings for a personalized experience.</p>
            <IoStarSharp className=' absolute bottom-3 p-1 text-4xl bg-gradient-to-br from-indigo-500 via-purple-500
             to-pink-500 animate-bounce rounded-full'/>
            </div>
          </div>
        </div>

      </div>
  );
};

export default Feature;
