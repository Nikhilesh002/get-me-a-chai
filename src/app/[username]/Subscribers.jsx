"use client"
import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

function Subscribers({data,sendData}) {
  const [subscribers,setSubscribers]=useState([]);
  useEffect(()=>{
    async function getSubscribers(){
      try {
        const dbRes=await axios.post('api/get-subscribers',{to_user:data.username});
        setSubscribers(dbRes.data);
        sendData(dbRes.data);
      } catch (error) {
        toast.error('Failed to fetch subscribers');
      }
    }
    getSubscribers();
  },[data.username])
  
  return (
    <div className="flex flex-col gap-2 overflow-y-scroll h-[300px] ">
      {
        subscribers.length==0 ? <h1 className='text-lg'>No Subscribers</h1> : subscribers.map((subscriber,index)=>
          <div key={index} className="flex gap-1 items-center text-orange-500 font-mono">
            <Image src="/avatar.png" width={30} height={30} alt="avatar" />
            <p className='ms-1'>{subscriber.name} donated <span className="font-bold">₹{subscriber.amount/100}</span>. Message is {subscriber.message}</p>
          </div>
        )
      }
    </div>
  )
}

export default Subscribers;