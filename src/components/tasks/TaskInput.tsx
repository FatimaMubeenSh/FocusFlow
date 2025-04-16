import React, { useState } from "react";
import { Task, TaskType } from "../../types/Task";
import { v4 as uuidv4 } from "uuid";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify"

interface TaskInputProps {
  onAdd: (task: Task) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<TaskType>("key");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warn("Please enter a task title!");
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      type,
      timestamp: new Date().toISOString(),
    };

    onAdd(newTask);
    setTitle("");
    setType("key");
  };

  return (
    <div className="card form-container">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input type="text" placeholder="Enter task title..." value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 border  border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300" />

        <div className="relative">
          <select value={type} onChange={(e) => setType(e.target.value as TaskType)} className="shrink-0 border border-gray-300 text-gray-500 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300 appearance-none pr-8">
            <option value="key">Key Task</option>
            <option value="secondary">Secondary Task</option>
          </select>
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-500" strokeWidth={2.5} />
          </div>
        </div>

        <button type="submit" className="btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default TaskInput;
