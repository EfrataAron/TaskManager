

import { useEffect, useState } from "react";
import StoreLocal from "./StoreLocal";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Todo from "./components/TaskList";
import './App.css'

const LOCAL_STORAGE_KEY = "tasks";

function App() {
  const [tasks, setTasks] = StoreLocal(LOCAL_STORAGE_KEY, []);
  const [filter, setFilter] = useState("all");

  // Add Task
  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  // Toggle Task Completion
  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Remove Task
  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Filtered Task List
  const getFilteredTasks = () => {
    if (filter === "active") return tasks.filter((task) => !task.completed);
    if (filter === "completed") return tasks.filter((task) => task.completed);
    return tasks;
  };

  return (
    // task-manager
    <div className=" max-w-md mx-auto p-5 text-center bg-[#b4ecaa] rounded-lg shadow-lg">
      <h2 className="text-[#18620f] font-bold text-2xl font-['Sans-serif']">Task Manager</h2>
      <Form addTask={addTask} />
      <Filter filter={filter} setFilter={setFilter} />
      <Todo
        tasks={getFilteredTasks()}
        toggleTask={toggleTask}
        removeTask={removeTask}
      />
    </div>
  );
}

export default App;