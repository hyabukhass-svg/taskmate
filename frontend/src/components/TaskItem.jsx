function TaskItem({ task, onDelete, onToggle }) {
  return (
    <li
      style={{
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        onClick={() => onToggle(task.id, task.completed)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
