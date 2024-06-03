let mongoose = require('mongoose');


let connectDB = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)

        console.log(`mongodb connection to : ${connection.connection.host}`);
    }catch(err){
        console.log(`Error in connectDB:- ${err.message}`);
        process.exit(1)   //passing 1 - will exit the proccess with error
    }
}

module.exports = connectDB
//next step is created dot .env file into node_modules where giving mongodb:localhost:27017