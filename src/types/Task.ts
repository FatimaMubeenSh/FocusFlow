export type TaskType = "key" | "secondary";

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  timestamp: string;
}
