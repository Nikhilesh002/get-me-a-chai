import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDb();
  const data = await req.json();
  // return NextResponse.json({msg:"test"});
  try {
    // get user data from users table
    const dbRes = await User.findOneAndUpdate({ username:data.username },{ $set: data  });
    if(dbRes){
      return NextResponse.json(dbRes);
    }
    else{
      return NextResponse.json({message:"No user found to update"});
    }
  } catch (error) {
    console.log("My error:", error);
    return NextResponse.json(error);
  }
}