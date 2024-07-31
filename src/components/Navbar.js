"use client"
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const { data: session } = useSession();

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className='bg-gray-900 text-white flex justify-between items-center px-5 h-16'>
      <Link href='/'>
        <div className='logo font-bold text-xl flex gap-1 items-center'>
          <span>
            <Image className='pb-2' unoptimized src='/chai.gif' width='26' height='26' alt='chai logo' />
          </span>
          Get Me A Chai
        </div>
      </Link>

      <div className="">
        {
          session && <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative inline-block">
            <button id="dropdownHoverButton"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button" >
              Welcome {session.user.email}
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6" >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {isDropdownVisible && (
              <div id="dropdownHover" className="z-10 ms-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute" >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton" >
                  <li>
                    <Link href="/" className="text-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="text-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${session.user.username}`} className="text-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Your Page
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="#" className="text-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Settings
                    </Link>
                  </li> */}
                  <li className='flex justify-center items-center gap-4'>
                    <button onClick={() => signOut()} className='mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2' >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        }

        {
          (!session) && <div className='flex justify-center items-center gap-4'>
            <Link href='/login' className='mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2' >
              Sign In
            </Link>
          </div>
        }
      </div>

    </div >
  )
}

export default Navbar;
