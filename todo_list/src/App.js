// Complete solution for Module 1 Lab

import React, {useState, useEffect} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [toDoEditing, settoDoEditing] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if(loadedTodos) {
        setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);

  // Add the handlesubmit code here
  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
    } else {

        alert("Enter Valid Task");
    }
    document.getElementById('todoAdd').value = ""
  }
  
  // Add the deleteToDo code here
  function deleteToDo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTimeout(() => {setTodos(updatedTodos)}, 300); // Personal: setTimeout to kind of "fade out" the deleted task.
    // If I could, I would make a pretty transition, like swiping the task off-screen, signifying it's deleted 
  }
  
  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    setTodos(updatedTodos);
  }

  
  // Add the submitEdits code here
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
        if (todo.id === newtodo.id) {
            todo.text = document.getElementById(newtodo.id).value;
        }
        return todo;
    });
    setTodos(updatedTodos);
    settoDoEditing(null);
  }

  
return(        <div id="todo-list">
<h1>Todo List</h1>
<form onSubmit={handleSubmit}>
  <input
    type="text"
    id = 'todoAdd'
  />
  <button type="submit">Add Todo</button>
</form>
{todos.map((todo) => (

<div key={todo.id} className="todo">
  <div className="todo-text">
    {/* Add checkbox for toggle complete */}
    <input
      type="checkbox" 
      id="completed"
      checked={todo.completed}
      onChange={() => toggleComplete(todo.id)}
    />
    {/* if it is edit mode, display input box, else display text */}
    {todo.id === toDoEditing ?
      (<input
        type="text"
        id = {todo.id}
        defaultValue={todo.text}
      />) :
      (<div>{todo.text}</div>)
    }
  </div>
  <div className="todo-actions">
    {/* if it is edit mode, allow submit edit, else allow edit */}
    {todo.id === toDoEditing ?
    (
      <button onClick={() => submitEdits(todo)}>Submit Edits</button>
    ) :
    (
      <button onClick={() => settoDoEditing(todo.id)}>Edit</button>
    )}

    <button onClick={() => deleteToDo(todo.id)}>Delete</button>
   </div>
</div>
))}
</div>
);
};
export default App;
