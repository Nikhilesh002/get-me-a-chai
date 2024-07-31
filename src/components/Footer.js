"use client"
import React,{useEffect,useState} from 'react';

function Footer() {
  const [year,setYear] = useState(null);
  useEffect(() => {
  setYear(new Date().getFullYear());
  }, []);

  return (
    <div className='bg-gray-900 text-white text-center h-16 pt-5 '>
      <p>Copyrights &copy; {year} Get Me A Chai- All rights reserved</p>
    </div>
  )
}

export default Footer;
