/* eslint-disable react/prop-types */
import axios from 'axios';

export function Todos({ todos, handleComplete, setTodos }) {

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/todo/${id}`);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.log("Error deleting todo", error);
        }
    };

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo._id} className="todo-item">
                    <div>
                        <h2>{todo.title}</h2>
                        <p>{todo.description}</p>
                    </div>
                    <div className="button-container">
                        <button className="complete" onClick={() => handleComplete(todo._id)}>
                            {todo.completed ? "Completed" : "Mark as completed"}
                        </button>
                        <button className="delete" onClick={() => handleDelete(todo._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
