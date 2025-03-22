import { useState, useEffect } from "react";
import DeleteIcon from "../assets/icons/delete.svg";

function ToDoList({ tasks, toggleTask, removeTask }) {
  // State to track tasks that are being added, toggled, or removed
  const [animatedTaskId, setAnimatedTaskId] = useState(null);

  // Trigger animation when a task is added, toggled, or removed
  useEffect(() => {
    if (animatedTaskId) {
      // Reset the animation after a short delay
      const timeout = setTimeout(() => setAnimatedTaskId(null), 500); // Match animation duration
      return () => clearTimeout(timeout);
    }
  }, [animatedTaskId]);

  // Handle task removal with animation
  const handleRemoveTask = (taskId) => {
    setAnimatedTaskId(taskId); // Trigger animation
    setTimeout(() => {
      removeTask(taskId); // Remove the task after animation
    }, 300); // Match the duration of the animation
  };

  // Handle task toggle with animation
  const handleToggleTask = (taskId) => {
    setAnimatedTaskId(taskId); // Trigger animation
    toggleTask(taskId); // Toggle the task
  };

  return (
    <ul className="list-none p-0 font-['Sans-serif']">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center p-2 mb-2 bg-green-200 rounded-lg transition-all duration-300 ease-in-out transform ${
            animatedTaskId === task.id ? "animate-bounce" : "" 
          } ${task.completed ? "opacity-60 line-through" : ""}`}
        >
          {/* Checkbox to toggle task completion */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggleTask(task.id)}
            aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
            className="mr-2 cursor-pointer w-5 h-5 rounded-full border-2 border-gray-300 checked:bg-green-500 checked:border-green-800 focus:ring-0 transition-colors duration-200"
          />
          {/* Task text */}
          <span
            className={`flex-1 mr-2 transition-all duration-300 ${
              task.completed ? "text-gray-500" : "text-gray-700"
            }`}
          >
            {task.text}
          </span>
          {/* Delete button */}
          <button
            onClick={() => handleRemoveTask(task.id)}
            aria-label="Delete task"
            className="bg-transparent border-none cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            <img src={DeleteIcon} alt="Delete" className="w-5 h-5" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;