const express = require("express");
const {createtodo, updatetodo} = require("./types.js")
const {todo, connectDB} = require("./db.js")


const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000

connectDB();

app.use(express.json())

app.post("/todo", async function(req,res){
     const createPayload = req.body
     const parsedPayload = createtodo.safeParse(createPayload);
     if(!parsedPayload.success){
         res.status(411).json({
            msg : "You sent the wrong inputs",
         })
         return;
     }
     // put data to mongoDB
     await todo.create({
        title : createPayload.title,
        description : createPayload.description,
        completed : false
     })
     res.json({
        msg : "todo created successfully"
     })
})

app.get("/todos", async function(req,res){
   const todos =  await todo.find({})

   res.json({
    todos
   })
})

app.put("/completed", async function(req,res){
    const updatePayload = req.body
    const parsedPayload = updatetodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
           msg : "You sent the wrong inputs",
        })
        return;
    }
    await todo.updateOne({
         _id : req.body.id
    },{
        completed : true
    })
    res.json({
        msg : "The todo is completed"
    })
})

app.delete("/todo/:id", async function(req,res){
    await todo.deleteOne({
        _id : req.params.id
    })
    res.json({
        msg : "todo deleted successfully"
    })
})



app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
})