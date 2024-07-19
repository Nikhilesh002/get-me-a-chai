// "use server"

import connectDb from "@/db/connectDb"
import Razorpay from "razorpay"

export const initiate = async (amount, to_username, paymentForm) => {
  await connectDb();
  var instance = new Razorpay({ key_id: process.env.RAZORPAY_CLIENT_ID, key_secret: process.env.RAZORPAY_CLIENT_SECRET })

  var options = {
    amount: Number.parseInt(amount),
    currency: "INR"
  }

  let x=await instance.orders.create(options);

  var rzp1 = new Razorpay(options);

}
