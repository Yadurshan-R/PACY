import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect =  async() => {
  if (mongoose.connection.readyState === 1) {
    console.log("Already Connected to DB");
    return;
  }
  
  if (mongoose.connection.readyState === 2) {
    console.log("Connecting...");
    return;
  }

  try{
    mongoose.connect(MONGODB_URI!, {
        dbName: 'pacy',
        bufferCommands: true
    });
    console.log("Connected to DB")
  } catch (err:unknown) {
    console.log("Error: " , err);
  
  }
};

export default connect;