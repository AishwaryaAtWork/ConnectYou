import img from '@/public/favicon.ico';
import Image from 'next/image';
import { IoStarSharp } from "react-icons/io5";

const Feature = () => {

  const data = [1, 2, 3, 4, 5];
  return (
    <div className='w-full h-[100vh] bg-gradient-to-b to-c1 from-c2 flex flex-col items-center justify-center pb-8 pt-20 cursor-default'
      id='features'>
      <h2 className='text-5xl font-semibold pb-5'>Features</h2>
      <div className='w-full h-auto flex justify-center gap-8 px-8'>

        {data.map((d, i) => (
          <div key={i} className='w-2/12 h-[50vh] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
        rounded-3xl p-[2px] overflow-hidden my-10 '>
            <div className='h-full w-full text-white bg-c1 rounded-3xl overflow-hidden flex flex-col items-center p-6'>
              <Image alt='featureImg' src={img} height={130} width={130} className='py-5' />
              <p className='font-bold text-center text-2xl pb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
              <IoStarSharp className='mt-3 p-1 text-4xl bg-gradient-to-br from-indigo-500 via-purple-500
             to-pink-500 animate-bounce rounded-full'/>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Feature;
