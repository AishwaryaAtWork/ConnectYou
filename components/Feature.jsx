import Image from 'next/image'
import React from 'react'
import img from '@/public/favicon.ico'
import { IoStarSharp } from "react-icons/io5";

const Feature = () => {

  const data = [
    {point: "User Profiles and Messaging", desc: "Easily create profiles, edit details, and send direct messages for one-on-one communication."}, 
    {point: "Connection Requests", desc: "Send and accept connection requests to expand your network within the platform."}, 
    {point: "Easy Content Sharing", desc: "Share various content types like text, media files, GIFs, emojis, links, and live location with connections."},
    {point: "Privacy and Security", desc: "Control privacy settings and benefit from security measures like data encryption and regular updates to protect user data."},
    {point: "Accessibility and Customization", desc: "Accessible via web browsers, users can customize their profile appearance and privacy settings for a personalized experience."},
      ]


  return (
    <div className='w-full min-h-[100vh] max-h-auto bg-gradient-to-b to-c1 from-c2 flex flex-col items-center justify-center pb-8 pt-20 cursor-default'
       id='features'>
      <h2 className='text-5xl font-semibold pb-12 md:pb-5'>Features</h2>
      <div className='w-full h-auto flex flex-col md:flex-row justify-center items-center md:items-stretch gap-5 md:gap-10 px-8'>

      {data.map((d,i)=>(
        <div key={i} className='w-11/12 md:w-2/12 h-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
        rounded-3xl p-[2px] overflow-hidden my-2 md:my-10 '>
          <div className='h-full w-full text-white bg-c1 rounded-3xl overflow-hidden flex flex-col items-center p-6 relative'>
            <Image alt='featureImg' src={img} height={130} width={130} className='py-5'/>
            <p className='font-bold text-center text-2xl pb-1'>{d.point}</p>
            <p className='text-c3 text-center text-sm pb-12'>{d.desc}</p>
            <IoStarSharp className=' absolute bottom-3 p-1 text-4xl bg-gradient-to-br from-indigo-500 via-purple-500
             to-pink-500 animate-bounce rounded-full'/>
          </div>
        </div>
      ))}

      </div>
    </div>
  )
}

export default Feature