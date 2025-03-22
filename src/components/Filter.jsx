
import React from "react";
function Filter({ filter, setFilter }) {
  return (
    <div className="font-['Sans-serif'] filter-buttons">
      <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
        All
      </button>
      <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>
        Active
      </button>
      <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>
        Completed
      </button>
    </div>
  );
}

export default Filter;

