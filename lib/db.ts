import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionpOptions = {
            dbName: `gdmstorev2`
          }
        await mongoose.connect(process.env.MONGODB_URI!, connectionpOptions);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
}

export default connectDB