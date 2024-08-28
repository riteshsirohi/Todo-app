const mongoose = require("mongoose");
require('dotenv').config();


const connectDB = async() =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
         console.log(`connected to db ,${connection.connection.host}`)
    } catch (e) {
        console.log(`mongo connect error ${e}`);
    }
}

const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const todo = mongoose.model("todos",todoSchema);

module.exports = {
    todo,
    connectDB
}