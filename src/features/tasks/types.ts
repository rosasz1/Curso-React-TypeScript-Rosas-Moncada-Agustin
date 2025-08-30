
export const TASK_STATUS = {
  CREADA: "CREADA",
  EN_PROCESO: "EN_PROCESO",
  FINALIZADA: "FINALIZADA",
} as const;

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string; 
};

export const TASK_STATUS_OPTIONS: TaskStatus[] = Object.values(TASK_STATUS);

