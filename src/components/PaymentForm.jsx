import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from'react';

function PaymentForm({data}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

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

  const fetchOrder = async (fdata) => {
    // console.log(fdata);
    try {
      const dbRes = await axios.post('/api/create-order', { amount:fdata.amount,to_username:data.username,message:fdata.message,from_name:fdata.name,rpayID:data.rpayID,rpaySecret:data.rpaySecret });
      return dbRes.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function handlePayment(fdata) {
    setLoading(true);
    fdata.amount=Number(fdata.amount) * 100;
    // console.log(fdata);
    try {
      // load script
      await lazyRazorpayScript();
      // create order
      const order = await fetchOrder(fdata);
      console.log(order);
      // initiate payment
      const options = {
        amount: Number(order.amount_due), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        key: data.rpayID, // Enter the Key ID generated from the Dashboard
        currency: "INR",
        name: "Get Me A Chai",
        description: `Donation to ${data.username}`,
        image: `${data.profilePic}`,
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:3000/api/razorpay",
        prefill: {
          name: `${fdata.name}`,
          email: "example@example.com",
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
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(handlePayment)} className="flex flex-col gap-3">
      <input type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter name" {...register("name", { required: true })} />
      <input type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter Message" {...register("message", { required: true })} />
      <input type="number"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter Amount" pattern="[0-9]" {...register("amount", { required: true })} />
      <button type="submit" className=" text-lg text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg py-2 text-center  mb-1">
        {loading?"Loading...":"Pay"}</button>
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
  )
}

export default PaymentForm;