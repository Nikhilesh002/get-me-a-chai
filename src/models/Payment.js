import mongoose from "mongoose";

const {Schema,model}=mongoose;

const PaymentSchema=new Schema({
  name:{type:String,required:true},
  to_user:{type:String,required:true},
  oid:{type:String,required:true},
  message:{type:String,required:true},
  amount:{type:Number,required:true},
  createdAt:{type:String,required:true},
  updatedAt:{type:String,required:true},
  done:{type:Boolean,required:true},
})

export default mongoose.models.Payment || model("Payment",PaymentSchema);