import { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import { Task } from "../../types/Task";
import TaskSection from "./TaskSection";

const LOCAL_STORAGE_KEY = "focusflow_tasks";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isInitialized, setIsInitialized] = useState(false);

  // Load tasks once on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setTasks(JSON.parse(stored));
    }
    setIsInitialized(true);
  }, []);

  // Save tasks when changed, but ONLY after the first load
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isInitialized]);

  const handleAdd = (task: Task) => {
    setTasks([task, ...tasks]);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleClear = (type: "key" | "secondary") => {
    setTasks(tasks.filter((task) => task.type !== type));
  };

  const handleUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };    

  return (
    <div className="p-4 space-y-6">
      <TaskInput onAdd={handleAdd} />

      <TaskSection type="key" tasks={tasks} onDelete={handleDelete} onClear={handleClear} onEdit={handleUpdate} />

      <TaskSection
        type="secondary"
        tasks={tasks}
        onDelete={handleDelete}
        onClear={handleClear}
        onEdit={handleUpdate}
        className="mt-4"
      />
    </div>
  );
};

export default TaskList;
