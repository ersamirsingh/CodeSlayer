import mongoose from "mongoose";

export const connectToDB = async () => {
    try{
        const uri = process.env.MONGOURI;
        if(!uri){
            throw new Error("Mongo URI missing in env");
        }
        await mongoose.connect(uri);
        console.log("DB connected");
    }catch(err){
        console.log(err);
    }
}