import connectDb from "@/db/connectDb"
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";
import Razorpay from "razorpay"

export async function POST(req){
  await connectDb();
  const datad=await req.json();
  // console.log(datad);
  const {amount,to_username,from_name,message}=datad;
  try {
    const instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
    const options = {
      amount: amount, // req in integer paise
      currency: "INR"
    }
    const order=await instance.orders.create(options);

    // // make payment object in db shows order is pending
    const dbRes=await Payment.create({oid:order.id,amount,to_user:to_username,name:from_name,message,createdAt:Date.now(),updatedAt:Date.now(),done:false});
    // console.log(dbRes);
    return NextResponse.json(order);
    // return NextResponse.json({msg:"test"});
  } catch (error) {
    console.log("My error:",error);
    return NextResponse.json(error);
  }
}