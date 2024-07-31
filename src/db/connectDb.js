const mongoose=require('mongoose');

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error("MongoDB error =>",error.message);
    process.exit(1);
  }
}

export default connectDb;
