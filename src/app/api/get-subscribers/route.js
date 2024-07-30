import connectDb from "@/db/connectDb"
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export async function POST(req){
  await connectDb();
  const {to_user}=await req.json();
  try {
    const dbRes=await Payment.find({to_user,done:true});
    // console.log(dbRes);
    return NextResponse.json(dbRes);
  } catch (error) {
    console.log("My error:",error);
    return NextResponse.json(error);
  }
}