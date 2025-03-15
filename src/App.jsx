
import { useState } from "react";
import FilterButton from "./components/Filter";
import Form from "./components/Form";
import Todo from "./components/TodoList";
import StoreLocal from "./StoreLocal";

import './App.css'

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {

  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = StoreLocal('todos', []);
  const [completedAll, setCompletedAll] = useState(false);
  const [filter, setFilter] = useState("All");
  const [currentlyEditing, setCurrentlyEditing] = useState("");

  function addTodo(todo) {
    setTodos([
      ...todos, 
      todo
    ]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function deleteAll(){
    setTodos([]);
  }

  function toggleTodo(id){
    setTodos(todos.map((todo) => (
      todo.id === id ? {
        ...todo,
        completed: !todo.completed
      } : todo
    )))
  }

  function toggleAll(){
    setTodos(todos.map((todo) => (
      {
        ...todo,
        completed: !todo.completed
      }      
    )
    ));
  }

  function updateTodo(text, id){
    console.log(text)
    setTodos(todos.map((todo) => (
      todo.id === id ? {
        ...todo,
        text: text
      } : todo 
    )))
  }

  function completeAll() {
    setTodos(todos.map((todo) => (
      { 
        ...todo,
        completed: !completedAll
      }
    )));
    setCompletedAll(!completedAll);
  }

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      name={name}
      key={name}
      isPressed={name === filter} 
      setFilter={setFilter}
    />
  ));

  return (
    <div className="w-screen app-container bg-green-100 bgcover flex h-screen">
      <div className="m-auto  white p-6 rounded-lg text-black max-w-md w-full">
        <h2 className=" text-xl font-semibold mb-4">TO DO LIST</h2>
        <Form addTodo={addTodo} 
        />
        <ul className=" todos">
          {todos.filter(FILTER_MAP[filter]).map(({ text, id, completed }) => (
            <Todo 
              text={text} 
              id={id} 
              completed={completed}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
              isEditing={id === currentlyEditing}
              setCurrentlyEditing={setCurrentlyEditing}/>
          ))}
        </ul>

        <div className="hidden">
          <button onClick={deleteAll}>Delete All</button>
          <button onClick={toggleAll}>Toggle All</button>
          <button onClick={completeAll}>Complete All</button>
        </div>
        <div className={!todos.length && 'hidden'}>
          {filterList}
        </div>
      </div>
    </div>
  );
}

export default App;