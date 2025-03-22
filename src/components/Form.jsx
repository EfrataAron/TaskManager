import { useState } from "react";

function Form({ addTask }) {
  const [taskInput, setTaskInput] = useState("");
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false); // State to track if a task is being added

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") {
      setError("Task cannot be empty!"); // Set error message
      return;
    }
    setIsAdding(true); // Trigger animation
    addTask(taskInput); // Add the task
    setTaskInput(""); // Clear the input
    setError(""); // Clear the error

    // Reset animation after a short delay
    setTimeout(() => setIsAdding(false), 500); // Match animation duration
  };

  return (
    <form onSubmit={handleSubmit} className="font-['Sans-serif'] text-sm flex gap-2 mb-2">
      <input
        className="text-black font-bold flex-1 p-2 border border-[#0bf245] rounded-md focus:outline-none focus:border-green-500 transition-colors duration-200"
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Enter a task...."
      />
      <button
        type="submit"
        className={`px-3 py-2 border-none bg-[#82b7f1] text-white cursor-pointer rounded-md transition-colors duration-300 hover:bg-[#001122] ${
          isAdding ? "animate-pulse" : "" 
        }`}
      >
        Add
      </button>
      {error && (
        <p className="text-[#eae0e0] text-sm bg-[#f40303] rounded-md px-3 py-2 transition-opacity duration-300">
          {error}
        </p>
      )}
    </form>
  );
}

export default Form;