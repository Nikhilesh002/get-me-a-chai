"use client"
import PaymentForm from '@/app/[username]/PaymentForm';
import Subscribers from '@/app/[username]/Subscribers';
import {useEffect,useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';

function Page({ params }) {
  const [data, setData]=useState(null);
  const [dataFromChild, setDataFromChild]=useState(null);
  const router=useRouter();
  const session=useSession();

  useEffect(() => {
    document.title=params?.username+" | Get Me A Chai";
    async function getData(){
      const dbRes=await axios.post(`api/get-user`,{username:params.username});
      if(dbRes.data?.message==="No user found"){
        // notFound();
        toast.error('User not found');
        router.push('/not-found');
      }
      else{
        setData(dbRes.data);
      }
    }
    getData();
  }, [params.username]);

  function handleData(x){
    setDataFromChild(x);
  }

  return (
    data===null ? <Loading/> :  <>
      <Toaster/>
      <div className="cover w-full relative">
        <img className="object-cover w-full h-[50]" src={data.coverPic} width='100%' height={75} alt="background" ></img>
        <div className="absolute -bottom-20 right-[43%] border-white border-2 rounded-xl ">
          <img className="rounded-xl" src={data.profilePic} alt="my-image" width='150px' ></img>
        </div>
      </div>

        <div className="mt-24 mb-16 flex flex-col gap-2 justify-center items-center">
          <p className="text-white text-2xl font-bold">{data.username}</p>
          <p className="text-lg text-slate-300 ">Help {data.name} to get a chai</p>
          {
            dataFromChild &&
              <p className="text-lg text-slate-300 ">{dataFromChild.length} payments . ₹{dataFromChild.reduce((sum, subscriber) => sum + subscriber.amount, 0) / 100} of funds raised</p>
          }
        </div>

      <div className="flex gap-2 w-full p-3 h-[430px]">
        <div className="bg-slate-800 w-1/2 rounded-lg px-6 py-10">
          <h1 className="font-bold text-2xl mb-2 text-white ">Suppoters</h1>
          <Subscribers data={data} sendData={handleData}/>
        </div>

        <div className="bg-slate-800 p-10 w-1/2 rounded-lg">
          {
            session?.data?.user.username!==params.username ? <>
              <h1 className="text-2xl font-bold mb-2 text-white ms-1 ">Make Payment</h1>
              <PaymentForm data={data}/>
            </> : <h1 className='text-lg font-mono leading-10 px-10 py-20 text-pretty'>You can raise funds from your fans. You can track all the payments here. Get Me A Chai is a website which make your fund raising convinent and simpler.</h1>
          }
        </div>
      </div>
    </>
  )
}

export default Page;
