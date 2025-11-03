import mongoose from "mongoose";

const connectDB = async () => {

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI , {
            // we can write modern mongoose auto handler most
        });

        console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
    } catch(err){
        console.error(`❌ MongoDB connection error: ${err.message}`);
        process.exit(1);
    }
}


export default connectDB;