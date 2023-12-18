const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected:" +connection.host);       
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;