/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";


export function CreateTodo ({setTodos}){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddtodo = async () =>{
        if(!title || !description){
            alert("please fill both fields");
            return;
    }

    try{

        const response = await axios.post("https://todo-app-iciv.onrender.com/todo",{
            title,
            description,
            completed : false,
        });

        setTodos((prev) => [...prev, response.data]);

        setTitle("");
        setDescription("")

    }catch(e){
        console.error("Error creating todo",e)
    }
}

return <div>
    <input type="text"
    placeholder="title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
    /> <br />
    <input type="text"
    placeholder="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
     /> <br />
    <button onClick={handleAddtodo}>Add Todo</button>
</div>
}
