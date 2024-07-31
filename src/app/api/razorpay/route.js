import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import User from "@/models/User";

export async function POST(req) {
  await connectDb();
  let data = await req.formData();
  data = Object.fromEntries(data);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

  // check if such order exists
  const dbRes = await Payment.findOne({ oid: razorpay_order_id },{ to_user: 1, _id: 0 }).exec();
  if (!dbRes) {
    return NextResponse.error("Order ID not found");
  }

  // fetch razorpay secret key from db
  const dbRes2=await User.findOne({ username: dbRes.to_user },{ rpaySecret: 1, _id: 0 }).exec();

  const isVerified = validatePaymentVerification({ "order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, dbRes2.rpaySecret);

  if (isVerified) {
    // findOne by order and update done to true
    const dbRes3 = await Payment.findOneAndUpdate({oid:razorpay_order_id},{done:true});
    return NextResponse.redirect(`http://localhost:3000/${dbRes.to_user}`);
  }
  else {
    return NextResponse.error("Payment failed");
  }

}