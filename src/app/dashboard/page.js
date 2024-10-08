"use client"
import { useEffect,useState } from "react";
import { useSession } from "next-auth/react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading";

function Page() {
  const session=useSession();
  const router=useRouter();
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    document.title="Dashboard | Get Me A Chai";
    // async function getData(){
      // const dbRes=await axios.post(`api/get-user`,{username:session?.data?.user?.username});
      // if(session.status==="authenticated"){
        setData(session?.data?.user);
      // }
      // else{
      //   router.push('/login');
      // }
    // }
    // getData();
  }, [session]);

  async function handleFormSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const dbRes=await axios.post(`api/update-user`,data);
      if(dbRes.data?.message==="No user found to update"){
        toast.error("No user found to update");
      }
      else{
        toast.success("User data updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update user data");
    }
    setLoading(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    data===null ? <Loading/> : <div className="m-auto rounded-lg py-5 px-1 mt-10 bg-slate-800 w-1/2 sm:w-1/2 md:w-2/5 lg:w-1/3 ">
      <Toaster/>
      <h1 className="text-center font-bold text-3xl my-6">Welcome to your Dashboard</h1>
        <form className="px-8  flex flex-col gap-3">
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
          {loading?
          <div className='flex justify-center items-center gap-1' role="status">
            <svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
            <span className="pb-0.5 text-white ">Saving...</span>
          </div>
          :"Save"}
        </button>
      </form>
    </div>
  )
}

export default Page;
