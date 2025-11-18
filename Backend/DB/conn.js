import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/NotasMax";

async function main(){
    await mongoose.connect(mongoUrl);
    console.log("Conectou mongodb");
}
main().catch((err)=>console.log(err));

export default mongoose;