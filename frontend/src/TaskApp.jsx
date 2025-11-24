import { useState, useEffect } from "react";

export default function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [quote, setQuote] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // -------------------------------
  // Load dummy tasks
  // -------------------------------
  useEffect(() => {
    setTasks([
      { id: 1, title: "Sample task 1", completed: false },
      { id: 2, title: "Sample task 2", completed: true },
    ]);

    setQuote("Stay motivated! — Unknown");
  }, []);

  // -------------------------------
  // Add Task
  // -------------------------------
  const addTask = () => {
    if (!newTask.trim()) return;
    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    setTasks([...tasks, { id: newId, title: newTask, completed: false }]);
    setNewTask("");
  };

  // -------------------------------
  // Delete Task
  // -------------------------------
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // -------------------------------
  // Toggle Completed
  // -------------------------------
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // -------------------------------
  // Save Edited Task
  // -------------------------------
  const saveEdit = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title: editText } : t
      )
    );
    setEditing(null);
    setEditText("");
  };

  // -------------------------------
  // Filters
  // -------------------------------
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  const theme = darkMode ? darkStyles : styles;

  return (
    <div style={theme.container}>
      <button onClick={() => setDarkMode(!darkMode)} style={theme.darkToggle}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 style={theme.title}>TaskMate</h1>
      <p style={theme.quote}>{quote}</p>

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

      <div style={theme.filters}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul style={theme.list}>
        {filteredTasks.map((task) => (
          <li key={task.id} style={theme.taskItem}>
            <button
              style={{
                ...theme.completeButton,
                backgroundColor: task.completed ? "#A3D9A5" : "#FFD9D9",
              }}
              onClick={() => toggleComplete(task.id)}
            >
              {task.completed ? "✓" : "○"}
            </button>

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

            <button
              style={theme.editButton}
              onClick={() => {
                setEditing(task.id);
                setEditText(task.title);
              }}
            >
              Edit
            </button>

            <button style={theme.deleteButton} onClick={() => deleteTask(task.id)}>
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------- Light Theme ----------------
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
  title: { textAlign: "center", fontSize: "32px", color: "#6B4423", marginBottom: "10px" },
  quote: { textAlign: "center", fontStyle: "italic", color: "#8D6E63", marginBottom: "20px" },
  addSection: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #C7A49F" },
  addButton: { padding: "10px 15px", backgroundColor: "#D7A9A3", border: "none", borderRadius: "6px", cursor: "pointer" },
  filters: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" },
  list: { listStyle: "none", padding: 0 },
  taskItem: { display: "flex", alignItems: "center", padding: "10px", backgroundColor: "#FFF", borderRadius: "8px", marginBottom: "10px", gap: "10px" },
  completeButton: { border: "none", padding: "10px", borderRadius: "50%", cursor: "pointer" },
  taskText: { flex: 1, fontSize: "18px" },
  editButton: { padding: "6px", backgroundColor: "#EFD3C5", border: "none", borderRadius: "6px" },
  deleteButton: { padding: "6px", backgroundColor: "#F4AFAF", border: "none", borderRadius: "6px", cursor: "pointer" },
  editInput: { flex: 1, padding: "6px", borderRadius: "6px", border: "1px solid #CCC" },
  darkToggle: { background: "none", border: "2px solid #6B4423", padding: "8px 14px", borderRadius: "20px", cursor: "pointer", marginBottom: "15px" },
};

// ---------------- Dark Theme ----------------
const darkStyles = {
  ...styles,
  container: { ...styles.container, backgroundColor: "#2b1f1f", color: "#f8dede" },
  title: { ...styles.title, color: "#f7c6c6" },
  quote: { ...styles.quote, color: "#e3bebe" },
  input: { ...styles.input, backgroundColor: "#3b2b2b", border: "1px solid #a48787", color: "white" },
  addButton: { ...styles.addButton, backgroundColor: "#b98585" },
  taskItem: { ...styles.taskItem, backgroundColor: "#3a2a2a" },
  editButton: { ...styles.editButton, backgroundColor: "#b59090" },
  deleteButton: { ...styles.deleteButton, backgroundColor: "#c97d7d" },
  darkToggle: { ...styles.darkToggle, border: "2px solid #f8dede", color: "#f8dede" },
  taskText: { ...styles.taskText, color: "#f8dede" },
  editInput: { ...styles.editInput, backgroundColor: "#4a3a3a", color: "white", border: "1px solid #c9a5a5" },
};
