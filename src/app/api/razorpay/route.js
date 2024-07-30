import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";

export async function POST(req) {
  await connectDb();
  let data = await req.formData();
  data = Object.fromEntries(data);
  // console.log(data);

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
  // check if such order exists
  const dbRes = await Payment.findOne({ oid: razorpay_order_id });
  if (!dbRes) {
    return NextResponse.error("Order ID not found");
  }
  // console.log(dbRes);

  const isVerified = validatePaymentVerification({ "order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, process.env.RAZORPAY_KEY_SECRET);

  if (isVerified) {
    // findOne by order and update done to true
    const dbRes2 = await Payment.findOneAndUpdate({oid:razorpay_order_id},{done:true});
    return NextResponse.redirect(`http://localhost:3000/${dbRes.to_user}`);
  }
  else {
    return NextResponse.error("Payment failed");
  }

}