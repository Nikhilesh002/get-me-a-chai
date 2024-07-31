import connectDb from "@/db/connectDb"
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export async function POST(req){
  await connectDb();
  const {to_user}=await req.json();
  try {
    const dbRes=await Payment.find({to_user,done:true});
    return NextResponse.json(dbRes);
  } catch (error) {
    return NextResponse.json(error);
  }
}