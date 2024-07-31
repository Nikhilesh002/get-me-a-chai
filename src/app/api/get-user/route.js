import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDb();
  const { username } = await req.json();
  // return NextResponse.json({msg:"test"});
  try {
    // get user data from users table
    const dbRes = await User.findOne({ username });
    if(dbRes){
      return NextResponse.json(dbRes);
    }
    else{
      return NextResponse.json({message:"No user found"});
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}