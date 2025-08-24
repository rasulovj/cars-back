import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongodb database ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error in Mongodb ${err}`);
  }
};
export default connectDb;
