"use client"
// import { useSession } from "next-auth/react";
import axios from 'axios';
import Image from "next/image";
import { useForm } from "react-hook-form";

function Page({ params }) {
  // const session = useSession();
  // console.log(data.user.name);

  // if (!session) {
  //   const router = useRouter();
  //   router.push('/login');
  // }

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const lazyRazorpayScript = async () => {
    try {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    } catch (error) {
      console.log("Razorpay script load error", error);
    }
  }

  const fetchOrder = async (data) => {
    console.log(data);
    try {
      const dbRes = await axios.post('/api/create-order', { amount:data.amount,to_username:params.username,message:data.message,from_name:data.username });
      return dbRes.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function handlePayment(data) {
    console.log(data);
    data.amount=Number(data.amount) * 100;
    console.log(data);
    try {
      // load script
      await lazyRazorpayScript();
      // create order
      const order = await fetchOrder(data);
      console.log(order);
      // initiate payment
      const options = {
        amount: Number(order.amount_due), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        currency: "INR",
        name: "Get Me A Chai",
        description: "Test Transaction",
        image: "https://media.istockphoto.com/id/1297483389/photo/masala-tea-chai.jpg?s=2048x2048&w=is&k=20&c=PDKzb92QYAOUa6RWZOxT13e-vZ-cZWbIwETq9CeRSm8=",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:3000/api/razorpay",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
        },
        notes: order.notes,
        theme: {
          color: "#3399cc"
        }
      };
      console.log(options);
      const rzpInstance = new window.Razorpay(options);
      rzpInstance.open();
    } catch (error) {
      console.log("handlePayment error", error);
    }
  }

  return (
    <>
      <div className="cover w-full relative">
        <img className="object-cover w-full h-[50]" src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/603922/c99ef84036244153a1264d4c73ef597b/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/4.jpeg?token-time=1720051200&token-hash=qSgCp0jvDqT0IG8aIoOdj6GgSdViQl7cTYWjOoYWulE%3D" width='100%' height={75} alt="background" ></img>
        <div className="absolute -bottom-20 right-[43%] border-white border-2 rounded-xl ">
          <img className="rounded-xl" src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/603922/7f92ccbda4f7479db1630bfaf05c38ce/eyJoIjoxMDgwLCJ3IjoxMDgwfQ%3D%3D/2.jpeg?token-time=1720310400&token-hash=RIks7e0TeD2A9czYC3IjVPTdOVrp7PnQjWKGE8vJUmk%3D" alt="my-image" width='150px' ></img>
        </div>
      </div>

      <div className="mt-24 mb-16 flex flex-col gap-2 justify-center items-center">
        <p className="text-white text-2xl font-bold">{params.username}</p>
        <p className="text-lg text-slate-300 ">Creating educational, inspirational and fun spaceflight content</p>
        <p className="text-lg text-slate-300 ">6,338 members  .  292 posts</p>
      </div>

      <div className="flex gap-2 w-full p-3 h-[430px]">
        <div className="bg-slate-800 w-1/2 rounded-lg p-10">
          <h1 className="font-bold text-2xl mb-2 text-white ">Suppoters</h1>
          <div className="flex flex-col gap-2 overflow-y-scroll h-[300px] ">
            <div className="flex gap-1 items-center text-orange-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-white">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-orange-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-red-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-green-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-blue-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-orange-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-white">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-orange-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-white">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-orange-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-red-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-green-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-blue-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-orange-500">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
            <div className="flex gap-1 items-center text-white">
              <Image src="/avatar.png" width={30} height={30} alt="avatar" />
              <p>Vikram donated <span className="font-bold">₹100</span>. Message is &ldquo;Hi!! bro, Love you&ldquo;</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-10 w-1/2 rounded-lg">
          <h1 className="text-2xl font-bold mb-2 text-white ms-1 ">Make Payment</h1>
          <form onSubmit={handleSubmit(handlePayment)} className="flex flex-col gap-3">
            <input type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter name" {...register("username", { required: true })} />
            <input type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Message" {...register("message", { required: true })} />
            <input type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Amount" pattern="[0-9]" {...register("amount", { required: true })} />
            <button type="submit" className=" text-lg text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg py-2 text-center  mb-1">
              Pay</button>
            {/*<div className="flex gap- 2">
              <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Pay ₹5
              </button>
              <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                Pay ₹10
              </button>
              <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                Pay ₹20
              </button>
            </div>*/}
          </form>
        </div>
      </div>
    </>
  )
}

export default Page;
