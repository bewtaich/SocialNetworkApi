const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017/socialNetworkDB";

const connectionDB = async ()=> {
    try{
        await mongoose.connect(connectionString);
        console.log('Connection successful')
    } catch (error) {
        console.error('Connection failed', error)
        process.exit(1);
    }
};
module.exports = connectionDB;
