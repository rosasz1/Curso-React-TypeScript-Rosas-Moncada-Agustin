import type { Task, TaskStatus } from "../features/tasks/types"; // 👈 type-only
import {TASK_STATUS_OPTIONS } from "../features/tasks/types";
import { useDispatch } from "react-redux";
import { advanceStatus, removeTask, setStatus } from "../features/tasks/taskSlice";
import type { AppDispatch } from "../store";

type Props = { task: Task };

export default function TaskItem({ task }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 8,
        border: "1px solid #e43939ff",
        borderRadius: 8,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{task.title}</div>
        <small style={{ opacity: 0.7 }}>
          Estado: <b>{task.status}</b> • Creada: {new Date(task.createdAt).toLocaleString()}
        </small>
      </div>

      <button onClick={() => dispatch(advanceStatus({ id: task.id }))}>
        Avanzar estado
      </button>

      <select
        value={task.status}
        onChange={(e) =>
          dispatch(setStatus({ id: task.id, status: e.target.value as TaskStatus }))
        }
      >
        {TASK_STATUS_OPTIONS.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <button
  className="delete"
  onClick={() => dispatch(removeTask({ id: task.id }))}
>
  Eliminar
</button>

    </li>
  );
}


