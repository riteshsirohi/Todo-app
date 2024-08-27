const express = require("express");
const {createtodo, updatetodo} = require("./types.js")
const {todo} = require("./db.js")


const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000

app.use(express.json())

app.post("/todo", async function(req,res){
     const createPayload = req.body
     const parsedPayload = createtodo.safeparse(createPayload);
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
    const parsedPayload = updatetodo.safeparse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
           msg : "You sent the wrong inputs",
        })
        return;
    }
    await todo.update({
         _id : req.body.id
    },{
        completed : true
    })
    res.json({
        msg : "The todo is completed"
    })
})

app.delete("/todo/:id", async function (req, res) {
    const todoId = req.params.id;
    try {
        const deletedTodo = await todo.findByIdAndDelete(todoId);
        
        if (deletedTodo) {
            res.json({
                msg: "Todo deleted successfully",
                deletedTodo
            });
        } else {
            res.status(404).json({
                msg: "Todo not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: "Error deleting todo",
            error: error.message
        });
    }
});

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
})