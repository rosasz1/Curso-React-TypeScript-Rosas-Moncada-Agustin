import { useSelector } from "react-redux";
import type { RootState } from "../store";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const items = useSelector((s: RootState) => s.tasks.items);

  if (items.length === 0) {
    return <p style={{ opacity: 0.7 }}>Todavía no hay tareas. ¡Creá la primera! </p>;
    }
  return (
    <ul style={{ display: "grid", gap: 10, padding: 0, listStyle: "none" }}>
      {items.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </ul>
  );
}

