import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import type { AppDispatch } from "../store";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask({ title }));
    setTitle("");
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
        style={{ flex: 1, padding: 8 }}
      />
      <button type="submit">Crear</button>
    </form>
  );
}

