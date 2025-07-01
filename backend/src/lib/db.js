import moongoose from "mongoose"

export const connectDB = async ()=>{
    try {
       const connect = await moongoose.connect(process.env.MONGODB_URI);
       console.log(`MongoDB connected : ${connect.connection.host}`) 
    } catch (error) {
        console.log("MongoDB connection error:",error)
    }
};
