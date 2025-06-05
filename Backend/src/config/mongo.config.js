import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load .env file before using process.env
dotenv.config();

const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected`);
    } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;