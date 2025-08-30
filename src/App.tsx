import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  return (
    <div className="container">
      <h1>Lista de tareas</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

