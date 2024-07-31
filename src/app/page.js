import Image from 'next/image';
import Link from 'next/link';

function page() {
  return (
    <>
      <div className='text-white flex flex-col items-center justify-center h-[45vh] '>
        <div className='font-bold text-5xl flex gap-4 items-center mb-3 '>
          Buy me a Chai
          <span>
            <Image className='pb-2' unoptimized src='/chai.gif' width='30' height='30' alt='chai logo' />
          </span>
        </div>
        <p>A Crowd funding platform for creaters. Get your fans and followers. Start now!</p>
        <div className='mt-4 flex gap-4'>
          <Link href='/login' className="text-md text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-2 text-center me-2 mb-2">
            Start here
          </Link>
          <Link href='/about' className="text-md text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-2 text-center me-2 mb-2">
            Read More
          </Link>
        </div>
      </div>

      <div className='bg-white h-1 opacity-20 '></div>

      <div className='text-white container mx-auto pb-20 '>
        <h1 className='text-2xl font-bold text-center my-14 '>Your fans can buy you a chai</h1>
        <div className='flex gap-5 justify-around' >
          <div className='item space-y-3 flex flex-col justify-center items-center'>
            <Image className='bg-slate-500 rounded-full p-2 text-black ' unoptimized src='/man.gif' width='120' height='90' alt='man' />
            <p className='font-bold'>Fans want to help</p>
            <p className='text-center'>Your fans are available for you to help.</p>
          </div>
          <div className='item space-y-3 flex flex-col justify-center items-center'>
            <Image className='bg-slate-500 rounded-full p-2 text-black ' unoptimized src='/coin-2.gif' width='90' height='90' alt='man' />
            <p className='font-bold'>Fans want to help</p>
            <p className='text-center'>Your fans are available for you to help.</p>
          </div>
          <div className='item space-y-3 flex flex-col justify-center items-center'>
            <Image className='bg-slate-500 rounded-full p-2 text-black ' unoptimized src='/group.gif' width='120' height='90' alt='man' />
            <p className='font-bold'>Fans want to help</p>
            <p className='text-center'>Your fans are available for you to help.</p>
          </div>
        </div>
      </div>

      <div className='bg-white h-1 opacity-20 '></div>

      <div className='flex flex-col justify-center items-center text-white container mx-auto pb-20 '>
        <h1 className='text-2xl font-bold text-center my-14 '>Learn more about us</h1>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/howp3hl5Zag?si=vB3Aur8IXZ4YHZY1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  )
}

export default page;

export const metadata = {
  title: 'Home | Get Me A Chai',
}