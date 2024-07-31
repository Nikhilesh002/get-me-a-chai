"use client"
import { useEffect,useState } from "react";
import { useSession } from "next-auth/react";
import axios from 'axios';
import { useRouter } from "next/navigation";

function Page() {
  const session=useSession();
  const router=useRouter();
  const [data,setData]=useState(null
    // {
    // name:"",
    // email:"",
    // username:"",
    // rpayID:"",
    // rpaySecret:"",
    // coverPic:"",
    // profilePic:"",
  // }
);

  // TODO: use toasts to display msgs

  useEffect(() => {
    // async function getData(){
      // const dbRes=await axios.post(`api/get-user`,{username:session?.data?.user?.username});
      // console.log(session?.data?.user?.username);
      // console.log(dbRes);
      // console.log(session);
      if(session.status==="authenticated"){
        setData(session?.data?.user);
      }
      else{
        router.push('/login');
      }
    // }
    // getData();
  }, [session]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    // console.log(data);
    // delete(data._id);
    // console.log(data);
    const dbRes=await axios.post(`api/update-user`,data);
    // console.log(dbRes);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };


  return (
    <div className="m-auto rounded-lg py-5 px-1 mt-10 bg-slate-800 w-1/2 sm:w-1/2 md:w-2/5 lg:w-1/3 ">
      <h1 className="text-center font-bold text-3xl my-6">Welcome to your Dashboard</h1>
      {
        data && <form className="px-8  flex flex-col gap-3">
        <input type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Username" disabled={true} value={data.username} name='username' onChange={handleInputChange} />
        <input type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter name" value={data.name} name='name' onChange={handleInputChange} />
        <input type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Email" value={data.email} name='email' onChange={handleInputChange}/>
        <input type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Razorpay ID" value={data.rpayID} name='rpayID' onChange={handleInputChange} />
        <input type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Razorpay SECRET KEY" value={data.rpaySecret} name='rpaySecret' onChange={handleInputChange} />
        <input type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Profile Picture" value={data.profilePic} name='profilePic' onChange={handleInputChange} />
        <input type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Cover Picture" value={data.coverPic} name='coverPic' onChange={handleInputChange} />
        <button onClick={handleFormSubmit} type="submit" className=" text-lg text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg py-2 text-center  mb-1">
          Save</button>
      </form>
      }
    </div>
  )
}

export default Page;
