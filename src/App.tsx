import { useState } from "react";
import "./App.css";
import "./index.css"

type Status = "CREADA" | "EN PROCESO" | "FINALIZADA";

type Tarea = {
  id: string;
  titulo: string;
  status: Status;
};

const nextStatus = (s: Status): Status =>
  s === "CREADA" ? "EN PROCESO" : s === "EN PROCESO" ? "FINALIZADA" : "CREADA";

export default function App() {
  // Estado
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState("");

  // Acciones (CRUD)
  const addTarea = () => {
    const clean = titulo.trim();
    if (!clean) return;

    const newTarea: Tarea = {
      id: crypto.randomUUID(),
      titulo: clean,
      status: "CREADA",
    };

    setTareas((prev) => [newTarea, ...prev]);
    setTitulo("");
  };

  const removeTarea = (id: string) => {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  const cycleStatus = (id: string) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus(t.status) } : t))
    );
  };

  // Form
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTarea();
  };
  return (
    <div className="app">
      <h1 className="title">Lista de tareas</h1>

      <form className="form" onSubmit={onSubmit}>
        <input
          className="input"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Nueva tarea..."
          aria-label="Nueva tarea"
        />
        <button type="submit">Agregar</button>
      </form>

      {tareas.length === 0 ? (
        <p>No hay tareas. Agregá la primera ✨</p>
      ) : (
        <ul className="list">
          {tareas.map((t) => (
            <li key={t.id} className="item">
              <div className="row">
                <div>
                  <strong>{t.titulo}</strong>
                  <div className="meta">Estado: {t.status}</div>
                </div>
                <div className="actions">
                  <button onClick={() => cycleStatus(t.id)} title="Cambiar estado">
                    Cambiar estado
                  </button>
                  <button onClick={() => removeTarea(t.id)} title="Eliminar">
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


