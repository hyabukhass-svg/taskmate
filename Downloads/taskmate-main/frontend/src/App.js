import { useState, useEffect } from "react";
import axios from "axios";

export default function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [quote, setQuote] = useState("");
  const [darkMode, setDarkMode] = useState(false); // 🌙 DARK MODE

  // ---------------------------------------------------
  // Load tasks from backend
  // ---------------------------------------------------
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------------------------------------------
  // Fetch Motivational Quote
  // ---------------------------------------------------
  useEffect(() => {
  const fetchQuote = async () => {
    try {
      const res = await axios.get("https://quoteslate.vercel.app/api/quotes/random");

      setQuote(`${res.data.quote} — ${res.data.author || "Unknown"}`);
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };
  fetchQuote();
}, []);

  // ---------------------------------------------------
  // Add Task
  // ---------------------------------------------------
  const addTask = async () => {
    if (newTask.trim() === "") return;

    try {
      const res = await axios.post("http://localhost:4000/tasks", {
        title: newTask,
        completed: false,
      });

      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // ---------------------------------------------------
  // Delete Task
  // ---------------------------------------------------
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ---------------------------------------------------
  // Toggle Completed
  // ---------------------------------------------------
  const toggleComplete = async (task) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/tasks/${task.id}`,
        {
          title: task.title,
          completed: !task.completed,
        }
      );

      setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // ---------------------------------------------------
  // Save Edited Task
  // ---------------------------------------------------
  const saveEdit = async (id) => {
    try {
      const currentTask = tasks.find((t) => t.id === id);

      const res = await axios.put(
        `http://localhost:4000/tasks/${id}`,
        {
          title: editText,
          completed: currentTask.completed,
        }
      );

      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
      setEditing(null);
      setEditText("");
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  // ---------------------------------------------------
  // Filters
  // ---------------------------------------------------
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // ---------------------------------------------------
  // Dark Mode: apply theme
  // ---------------------------------------------------
  const theme = darkMode ? darkStyles : styles;

  return (
    <div style={theme.container}>
      
      {/* 🌙 DARK MODE TOGGLE */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={theme.darkToggle}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 style={theme.title}>TaskMate</h1>
      <p style={theme.quote}>{quote}</p>

      {/* Add Task */}
      <div style={theme.addSection}>
        <input
          style={theme.input}
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button style={theme.addButton} onClick={addTask}>
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div style={theme.filters}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {/* Task List */}
      <ul style={theme.list}>
        {filteredTasks.map((task) => (
          <li key={task.id} style={theme.taskItem}>
            
            {/* Completed */}
            <button
              style={{
                ...theme.completeButton,
                backgroundColor: task.completed ? "#A3D9A5" : "#FFD9D9",
              }}
              onClick={() => toggleComplete(task)}
            >
              {task.completed ? "✓" : "○"}
            </button>

            {/* Edit Mode */}
            {editing === task.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={theme.editInput}
                />
                <button onClick={() => saveEdit(task.id)}>Save</button>
              </>
            ) : (
              <span
                style={{
                  ...theme.taskText,
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>
            )}

            {/* Edit */}
            <button
              style={theme.editButton}
              onClick={() => {
                setEditing(task.id);
                setEditText(task.title);
              }}
            >
              Edit
            </button>

            {/* Delete */}
            <button
              style={theme.deleteButton}
              onClick={() => deleteTask(task.id)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------
   Light Theme (original) — UNCHANGED
-------------------------------------------------------- */
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#FBE9E7",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    color: "#6B4423",
    marginBottom: "10px",
  },
  quote: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#8D6E63",
    marginBottom: "20px",
  },
  addSection: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #C7A49F",
  },
  addButton: {
    padding: "10px 15px",
    backgroundColor: "#D7A9A3",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  filters: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#FFF",
    borderRadius: "8px",
    marginBottom: "10px",
    gap: "10px",
  },
  completeButton: {
    border: "none",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  taskText: {
    flex: 1,
    fontSize: "18px",
  },
  editButton: {
    padding: "6px",
    backgroundColor: "#EFD3C5",
    border: "none",
    borderRadius: "6px",
  },
  deleteButton: {
    padding: "6px",
    backgroundColor: "#F4AFAF",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editInput: {
    flex: 1,
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #CCC",
  },
  darkToggle: {
    background: "none",
    border: "2px solid #6B4423",
    padding: "8px 14px",
    borderRadius: "20px",
    cursor: "pointer",
    marginBottom: "15px",
  },
};

/* --------------------------------------------------------
   Dark Theme (NEW)
-------------------------------------------------------- */
const darkStyles = {
  ...styles, // copy light theme, then override

  container: {
    ...styles.container,
    backgroundColor: "#2b1f1f",
    color: "#f8dede",
  },

  title: {
    ...styles.title,
    color: "#f7c6c6",
  },

  quote: {
    ...styles.quote,
    color: "#e3bebe",
  },

  addSection: {
    ...styles.addSection,
  },

  input: {
    ...styles.input,
    backgroundColor: "#3b2b2b",
    border: "1px solid #a48787",
    color: "white",
  },

  addButton: {
    ...styles.addButton,
    backgroundColor: "#b98585",
  },

  taskItem: {
    ...styles.taskItem,
    backgroundColor: "#3a2a2a",
  },

  editButton: {
    ...styles.editButton,
    backgroundColor: "#b59090",
  },

  deleteButton: {
    ...styles.deleteButton,
    backgroundColor: "#c97d7d",
  },

  darkToggle: {
    background: "none",
    border: "2px solid #f8dede",
    padding: "8px 14px",
    borderRadius: "20px",
    cursor: "pointer",
    color: "#f8dede",
    marginBottom: "15px",
  },

  taskText: {
    ...styles.taskText,
    color: "#f8dede",
  },

  editInput: {
    ...styles.editInput,
    backgroundColor: "#4a3a3a",
    color: "white",
    border: "1px solid #c9a5a5",
  },
};
