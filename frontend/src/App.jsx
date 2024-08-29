import { useEffect, useState } from "react"
import { CreateTodo } from "./components/CreateTodo"
import { Todos } from "./components/Todos"
import axios from "axios";
import "./App.css"


function App() {

   const [todos,setTodos] = useState([]);

   useEffect(() =>{

     const fetchtodos = async () =>{

         try {
             const response = await axios.get("http://localhost:3000/todos");
              console.log(response.data);
              setTodos(response.data);
         } catch (e) {
          console.log("Error fetching todos",e);
         }
     }
      fetchtodos()
   }, []);

   const handleComplete = async (id) =>{
     
       try{
         await axios.put(`http://localhost:3000/todos/${id}`,{
             completed : true,
         })

         setTodos((prev) => prev.map((todo) =>{
             if(todo.id === id){
                return {
                    ...todo,
                    completed : true
                }
             }
             return todo;
         }))
       }catch(e){
           console.log("Error updating todo",e);
       }
   }

  return (
    <>
      <div>
        < CreateTodo  setTodos={setTodos}/>
        < Todos todos={todos} handleComplete={handleComplete} setTodos={setTodos} />
      </div>
    </>
  )
}

export default App
   