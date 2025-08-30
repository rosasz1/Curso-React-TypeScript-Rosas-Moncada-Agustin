import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // 👈 type-only
import type { Task, TaskStatus } from "./types";
import { TASK_STATUS } from "./types";

type TasksState = { items: Task[] };

const initialState: TasksState = { items: [] };

type AddTaskPayload = { title: string };
type SetStatusPayload = { id: string; status: TaskStatus };
type RemoveTaskPayload = { id: string };

const nextStatus = (current: TaskStatus): TaskStatus => {
  switch (current) {
    case TASK_STATUS.CREADA:
      return TASK_STATUS.EN_PROCESO;
    case TASK_STATUS.EN_PROCESO:
      return TASK_STATUS.FINALIZADA;
    case TASK_STATUS.FINALIZADA:
      return TASK_STATUS.CREADA;
  }
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.items.unshift(action.payload);
      },
      prepare(payload: AddTaskPayload) {
        const title = payload.title.trim();
        return {
          payload: {
            id: nanoid(),
            title,
            status: TASK_STATUS.CREADA,
            createdAt: new Date().toISOString(),
          } as Task,
        };
      },
    },
    removeTask(state, action: PayloadAction<RemoveTaskPayload>) {
      state.items = state.items.filter(t => t.id !== action.payload.id);
    },
   setStatus(state, action: PayloadAction<SetStatusPayload>) {
      const t = state.items.find(x => x.id === action.payload.id);
      if (t) t.status = action.payload.status;
    },
    advanceStatus(state, action: PayloadAction<{ id: string }>) {
      const t = state.items.find(x => x.id === action.payload.id);
      if (t) t.status = nextStatus(t.status);
    },
  },
});

export const { addTask, removeTask, setStatus, advanceStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
