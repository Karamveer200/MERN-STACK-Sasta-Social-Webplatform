const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () =>{
    try{
        await mongoose.connect(db, 
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("MongoDB connected");
    } catch(error){
        console.log("Error conneecting DB: "+ error.message);
        process.exit(1); //exit process with failure
    }

}

module.exports = connectDB;